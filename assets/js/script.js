// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavbar();
    initTypedText();
    initProgressBars();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initProjectRequestModal();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                const navToggler = document.querySelector('.navbar-toggler');
                navToggler.click();
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typed text effect
function initTypedText() {
    const typedText = document.querySelector('.typed-text');
    const words = ['Frontend Developer', 'Creative Coder', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine typing speed
        let typeSpeed = isDeleting ? 50 : 100;

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typedText) {
        typeEffect();
    }
}

// Animated progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if progress bar is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                bar.style.width = targetWidth + '%';
                bar.textContent = targetWidth + '%';
            }
        });
    };

    // Initial check
    animateProgressBars();

    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitBtn  = document.getElementById('submit-btn');
    const phoneInput = document.getElementById('contact-phone');
    const phoneError = document.getElementById('phone-error');

    // Regex telefono: accetta formati italiani e internazionali
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,5}$/;

    // ── Validazione telefono on-blur ──────────────────────────
    phoneInput.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !phoneRegex.test(val)) {
            phoneInput.classList.add('is-invalid');
            phoneError.style.display = 'block';
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneError.style.display = 'none';
        }
        updateSubmitBtn();
    });

    // Rimuovi errore appena l'utente riprende a scrivere
    phoneInput.addEventListener('input', function () {
        if (phoneInput.classList.contains('is-invalid')) {
            phoneInput.classList.remove('is-invalid');
            phoneError.style.display = 'none';
        }
        updateSubmitBtn();
    });

    // ── Abilita/disabilita submit al cambio di qualsiasi campo ─
    const fields = contactForm.querySelectorAll('input, textarea');
    fields.forEach(f => f.addEventListener('input', updateSubmitBtn));

    function updateSubmitBtn() {
        const name    = document.getElementById('contact-name').value.trim();
        const email   = document.getElementById('contact-email').value.trim();
        const phone   = phoneInput.value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        const phoneOk = phoneRegex.test(phone);

        submitBtn.disabled = !(name && email && phone && phoneOk && subject && message);
    }

    // ── Submit ────────────────────────────────────────────────
    let pendingData = {};

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('contact-name').value.trim();
        const email   = document.getElementById('contact-email').value.trim();
        const phone   = phoneInput.value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!isValidEmail(email)) {
            showNotification('Inserisci un indirizzo email valido!', 'error');
            return;
        }

        pendingData = { name, email, phone, subject, message };

        const recapList = document.getElementById('confirm-recap-list');
        recapList.innerHTML = `
            <li><span class="recap-label"><i class="bi bi-person me-2"></i>Nome</span><span class="recap-value">${escapeHtml(name)}</span></li>
            <li><span class="recap-label"><i class="bi bi-envelope me-2"></i>Email</span><span class="recap-value">${escapeHtml(email)}</span></li>
            <li><span class="recap-label"><i class="bi bi-telephone me-2"></i>Telefono</span><span class="recap-value">${escapeHtml(phone)}</span></li>
            <li><span class="recap-label"><i class="bi bi-chat-text me-2"></i>Oggetto</span><span class="recap-value">${escapeHtml(subject)}</span></li>
            <li class="recap-message-item"><span class="recap-label"><i class="bi bi-text-paragraph me-2"></i>Messaggio</span><span class="recap-value recap-message-value">${escapeHtml(message)}</span></li>
        `;

        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        confirmModal.show();
    });

    // ── Conferma e Invia ──────────────────────────────────────
    document.getElementById('confirm-send-btn').addEventListener('click', function () {
        const { name, email, phone, subject, message } = pendingData;
        const confirmSendBtn = this;

        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();

        confirmSendBtn.disabled = true;
        confirmSendBtn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Invio in corso...';

        emailjs.send('service_1cq2f3k', 'template_iadvjet', {
            from_name:  name,
            from_email: email,
            phone:      phone,
            subject:    subject,
            message:    message
        })
        .then(() => {
            const now     = new Date();
            const dateStr = now.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

            document.getElementById('recap-card').innerHTML = `
                <div class="recap-field">
                    <span class="recap-field__label"><i class="bi bi-person-fill me-2" aria-hidden="true"></i>Nome</span>
                    <span class="recap-field__value">${escapeHtml(name)}</span>
                </div>
                <div class="recap-field">
                    <span class="recap-field__label"><i class="bi bi-envelope-fill me-2" aria-hidden="true"></i>Email</span>
                    <span class="recap-field__value">${escapeHtml(email)}</span>
                </div>
                <div class="recap-field">
                    <span class="recap-field__label"><i class="bi bi-telephone-fill me-2" aria-hidden="true"></i>Telefono</span>
                    <span class="recap-field__value">${escapeHtml(phone)}</span>
                </div>
                <div class="recap-field">
                    <span class="recap-field__label"><i class="bi bi-chat-text-fill me-2" aria-hidden="true"></i>Oggetto</span>
                    <span class="recap-field__value">${escapeHtml(subject)}</span>
                </div>
                <div class="recap-field recap-field--message">
                    <span class="recap-field__label"><i class="bi bi-text-paragraph me-2" aria-hidden="true"></i>Messaggio</span>
                    <span class="recap-field__value">${escapeHtml(message)}</span>
                </div>
                <div class="recap-field recap-field--timestamp">
                    <span class="recap-field__label"><i class="bi bi-clock me-2" aria-hidden="true"></i>Inviato il</span>
                    <span class="recap-field__value">${dateStr} alle ${timeStr}</span>
                </div>
            `;

            const recapModal = new bootstrap.Modal(document.getElementById('recapModal'));
            recapModal.show();
            contactForm.reset();
            submitBtn.disabled = true; // re-disabilita dopo reset
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            showNotification('Errore durante l\'invio. Riprova o contattami su WhatsApp.', 'error');
        })
        .finally(() => {
            confirmSendBtn.disabled = false;
            confirmSendBtn.innerHTML = '<i class="bi bi-send me-1"></i>Conferma e Invia';
        });
    });
}

// Escape HTML per sicurezza
function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
    `;

    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe skill cards, portfolio items, and other animated elements
    const animatedElements = document.querySelectorAll('.hero-badge, .hero-tech-stack, .hero-metric, .skill-card, .portfolio-item, .about-content, .contact-info');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .skill-card {
        transition-delay: calc(var(--index, 0) * 0.1s);
    }
    
    .portfolio-item {
        transition-delay: calc(var(--index, 0) * 0.15s);
    }
`;
document.head.appendChild(style);

// Add index CSS variables to staggered elements
document.addEventListener('DOMContentLoaded', function () {
    const skillCards = document.querySelectorAll('.skill-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    skillCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    portfolioItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll performance optimization
window.addEventListener('scroll', debounce(() => {
    // Throttled scroll events
}, 10));

// Preloader (optional)
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Back to top button (optional)
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.className = 'back-to-top btn btn-primary';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 10px 24px rgba(102, 126, 234, 0.35)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });

    backToTop.addEventListener('focus', () => {
        backToTop.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 0 0 0.25rem rgba(102, 126, 234, 0.25), 0 10px 24px rgba(102, 126, 234, 0.35)';
    });

    backToTop.addEventListener('blur', () => {
        backToTop.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Request Modal
function initProjectRequestModal() {
    const modal = new bootstrap.Modal(document.getElementById('projectRequestModal'));

    document.querySelectorAll('.btn-request-project').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const project = this.dataset.project;
            const stack = this.dataset.stack;
            const icon = this.dataset.icon;

            // Popola il modal
            document.getElementById('prm-project-name').textContent = project;
            document.getElementById('prm-icon').className = `bi ${icon}`;

            // Genera chip stack
            const chipsEl = document.getElementById('prm-stack-chips');
            chipsEl.innerHTML = stack.split(',').map(s =>
                `<span class="prm-chip">${s.trim()}</span>`
            ).join('');

            // Pre-compila l'oggetto e chiude la modale al click
            document.getElementById('prm-go-contact').addEventListener('click', function (e) {
                e.preventDefault();
                const subjectInput = document.getElementById('contact-subject');
                if (subjectInput) {
                    subjectInput.value = `Richiesta progetto: ${project}`;
                    subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
                    subjectInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
                modal.hide();
                // Aspetta che la modale sia chiusa prima di scrollare
                const modalEl = document.getElementById('projectRequestModal');
                modalEl.addEventListener('hidden.bs.modal', function scrollOnClose() {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    modalEl.removeEventListener('hidden.bs.modal', scrollOnClose);
                });
            }, { once: true });

            modal.show();
        });
    });
}

// Initialize back to top button
initBackToTop();