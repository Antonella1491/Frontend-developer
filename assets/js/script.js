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
    initPrezziPage();
    initModalFocusManagement();
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
    const emailInput = document.getElementById('contact-email');
    const emailError = document.getElementById('email-error');
    // ── Validazione email on-blur ─────────────────────────────
    emailInput.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !isValidEmail(val)) {
            emailInput.classList.add('is-invalid');
            emailError.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i>Inserisci un indirizzo email valido (es. nome@dominio.it)';
            emailError.style.display = 'block';
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
            emailError.style.display = 'none';
        }
        updateSubmitBtn();
    });

    // Rimuovi errore appena l'utente riprende a scrivere
    emailInput.addEventListener('input', function () {
        if (emailInput.classList.contains('is-invalid')) {
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
            emailError.style.display = 'none';
        }
        updateSubmitBtn();
    });

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

// ── Pagina Prezzi: modale preventivo, addon, gateway, sticky bar ──
function initPrezziPage() {
    if (!document.getElementById('quoteRequestModal')) return; // non siamo in prezzi.html

    const modal = new bootstrap.Modal(document.getElementById('quoteRequestModal'));
    const selectedAddons = new Map(); // name → { price, priceNum, iconCls }
    let lastPlanData = null;

    // ── Leggo le addon-card una volta sola ─────────────────────────
    const allAddons = [];
    document.querySelectorAll('.addon-card').forEach(card => {
        const btn      = card.querySelector('.btn-addon');
        const name     = card.querySelector('h5').textContent.trim();
        const priceEl  = card.querySelector('.addon-card__price');
        const iconEl   = card.querySelector('.addon-card__icon i');
        const priceNum = priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g, '')) || 0 : 0;
        const priceStr = priceEl ? priceEl.textContent.trim() : '';
        const iconCls  = iconEl  ? [...iconEl.classList].find(c => c.startsWith('bi-')) || '' : '';
        allAddons.push({ name, priceNum, priceStr, iconCls, card, btn });
    });

    // ── Sincronizza stato visivo card esterna ───────────────────────
    function syncCardState(name, selected) {
        const entry = allAddons.find(a => a.name === name);
        if (!entry) return;
        entry.card.classList.toggle('addon-card--selected', selected);
        entry.btn.classList.toggle('btn-addon--selected', selected);
        entry.btn.innerHTML = selected
            ? '<i class="bi bi-check2 me-1"></i>Selezionato'
            : 'Aggiungi';
    }

    // ── Gateway modale ───────────────────────────────────────────────
    const gatewayModal = new bootstrap.Modal(document.getElementById('addonGatewayModal'));
    let pendingAddon   = null;

    document.getElementById('agw-yes-btn').addEventListener('click', function () {
        document.getElementById('agw-choice-panel').style.display = 'none';
        document.getElementById('agw-yes-panel').style.display    = 'block';
        document.getElementById('agw-project-name').focus();
    });

    document.getElementById('agw-back-btn').addEventListener('click', function () {
        document.getElementById('agw-yes-panel').style.display    = 'none';
        document.getElementById('agw-choice-panel').style.display = 'block';
    });

    document.getElementById('agw-no-btn').addEventListener('click', function () {
        // Prevent the modal focus-restoration from sending focus back to the addon "Aggiungi" button
        const gatewayModalEl = document.getElementById('addonGatewayModal');
        if (gatewayModalEl) gatewayModalEl._triggerElement = null;

        gatewayModal.hide();
        document.getElementById('pricing-plans').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.querySelectorAll('.pricing-card').forEach(c => {
                c.classList.add('pricing-card--pulse');
                setTimeout(() => c.classList.remove('pricing-card--pulse'), 2600);
            });
            const firstRequestQuoteButton = document.querySelector('.btn-request-quote');
            if (firstRequestQuoteButton) {
                try { firstRequestQuoteButton.focus(); } catch (e) {}
            }
        }, 700);
    });

    document.getElementById('agw-confirm-btn').addEventListener('click', function () {
        const projectName = document.getElementById('agw-project-name').value.trim();
        if (!projectName) {
            document.getElementById('agw-project-name').focus();
            return;
        }
        if (pendingAddon) {
            selectedAddons.set(pendingAddon.name, {
                price: pendingAddon.priceStr,
                priceNum: pendingAddon.priceNum,
                iconCls: pendingAddon.iconCls
            });
            syncCardState(pendingAddon.name, true);
            updateStickyBar();
        }
        gatewayModal.hide();
        openModal(null, projectName);
    });

    // ── Combobox pacchetti nel gateway ───────────────────────────────
    const PLANS = [
        { label: 'One-page',            icon: 'bi-file-earmark' },
        { label: 'Base Multipagina',    icon: 'bi-files' },
        { label: 'Pro Multipagina',     icon: 'bi-layers' },
        { label: 'Premium Multipagina', icon: 'bi-stars' },
    ];

    const comboInput = document.getElementById('agw-project-name');
    const comboList  = document.getElementById('agw-combo-list');
    let comboOpen    = false;
    let activeIdx    = -1;

    function renderCombo(filter) {
        const q = (filter || '').toLowerCase();
        const results = PLANS.filter(p => p.label.toLowerCase().includes(q));
        comboList.innerHTML = results.length
            ? results.map((p) => `
                <li class="agw-combo__item" role="option" data-label="${p.label}" tabindex="-1" aria-selected="false">
                    <i class="bi ${p.icon}" aria-hidden="true"></i>
                    <span>${highlight(p.label, q)}</span>
                </li>`).join('')
            : `<li class="agw-combo__item agw-combo__item--empty" role="option" aria-disabled="true">
                    <i class="bi bi-slash-circle" aria-hidden="true"></i><span>Nessun pacchetto trovato</span>
               </li>`;
        comboList.querySelectorAll('.agw-combo__item:not(.agw-combo__item--empty)').forEach(li => {
            li.addEventListener('mousedown', function (e) {
                e.preventDefault();
                selectPlan(this.dataset.label);
            });
        });
        activeIdx = -1;
    }

    function highlight(text, q) {
        if (!q) return text;
        return text.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
    }

    function selectPlan(label) {
        comboInput.value = label;
        closeCombo();
        comboInput.focus();
    }

    function openCombo() {
        renderCombo(comboInput.value);
        comboList.classList.add('agw-combo__list--open');
        comboInput.setAttribute('aria-expanded', 'true');
        comboOpen = true;
    }

    function closeCombo() {
        comboList.classList.remove('agw-combo__list--open');
        comboInput.setAttribute('aria-expanded', 'false');
        comboOpen = false;
        activeIdx = -1;
    }

    comboInput.addEventListener('focus', () => openCombo());
    comboInput.addEventListener('input', () => {
        if (!comboOpen) openCombo();
        else renderCombo(comboInput.value);
    });
    comboInput.addEventListener('blur', () => setTimeout(closeCombo, 150));
    comboInput.addEventListener('keydown', function (e) {
        const items = [...comboList.querySelectorAll('.agw-combo__item:not(.agw-combo__item--empty)')];
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIdx = Math.min(activeIdx + 1, items.length - 1);
            items.forEach((el, i) => el.classList.toggle('agw-combo__item--active', i === activeIdx));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIdx = Math.max(activeIdx - 1, 0);
            items.forEach((el, i) => el.classList.toggle('agw-combo__item--active', i === activeIdx));
        } else if (e.key === 'Enter' && activeIdx >= 0) {
            e.preventDefault();
            selectPlan(items[activeIdx].dataset.label);
        } else if (e.key === 'Escape') {
            closeCombo();
        }
    });

    // Reset combobox alla chiusura del gateway
    document.getElementById('addonGatewayModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('agw-yes-panel').style.display    = 'none';
        document.getElementById('agw-choice-panel').style.display = 'block';
        document.getElementById('agw-project-name').value         = '';
        pendingAddon = null;
    });

    // ── Toggle addon dalle card esterne ─────────────────────────────
    allAddons.forEach(({ name, priceNum, priceStr, iconCls, btn }) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const wasSelected = selectedAddons.has(name);
            if (wasSelected) {
                selectedAddons.delete(name);
                syncCardState(name, false);
                updateStickyBar();
                if (document.getElementById('quoteRequestModal').classList.contains('show')) {
                    refreshInlineAddons();
                    refreshAddonSummary();
                }
                return;
            }
            if (document.getElementById('quoteRequestModal').classList.contains('show')) {
                selectedAddons.set(name, { price: priceStr, priceNum, iconCls });
                syncCardState(name, true);
                updateStickyBar();
                refreshInlineAddons();
                refreshAddonSummary();
                return;
            }
            pendingAddon = { name, priceNum, priceStr, iconCls };
            document.getElementById('agw-addon-name').textContent = '"' + name + '"';
            const gatewayModalEl = document.getElementById('addonGatewayModal');
            gatewayModalEl._triggerElement = btn;
            gatewayModal.show();
        });
    });

    // ── Sticky bar ──────────────────────────────────────────────────
    const stickyBar   = document.getElementById('addon-sticky-bar');
    const stickyCount = document.getElementById('addon-sticky-count');
    const stickyTotal = document.getElementById('addon-sticky-total');

    function updateStickyBar() {
        const count = selectedAddons.size;
        stickyBar.classList.toggle('is-visible', count > 0);
        const stickyButton = document.getElementById('addon-sticky-btn');
        if (count > 0) {
            stickyCount.textContent = count;
            const total = [...selectedAddons.values()].reduce((s, a) => s + a.priceNum, 0);
            stickyTotal.textContent = '+€' + total + ' di servizi aggiuntivi';
            stickyButton.removeAttribute('tabindex'); // Make button focusable
        } else {
            stickyButton.setAttribute('tabindex', '-1'); // Make button unfocusable
        }
    }

    // Ensure sticky bar is only visible when explicitly triggered
    const addAddonButtons = document.querySelectorAll('.add-addon-btn'); // Assuming buttons to add addons have this class

    addAddonButtons.forEach(button => {
        button.addEventListener('click', function () {
            const count = selectedAddons.size;
            if (count > 0) {
                stickyBar.classList.add('is-visible');
                document.getElementById('addon-sticky-btn').removeAttribute('tabindex');
            }
        });
    });

    // Hide sticky bar by default
    stickyBar.classList.remove('is-visible');
    document.getElementById('addon-sticky-btn').setAttribute('tabindex', '-1');

    document.getElementById('addon-sticky-btn').addEventListener('click', function () {
        document.getElementById('quoteRequestModal')._triggerElement = this;
        openModal(lastPlanData);
    });

    // ── Chip inline dentro la modale ────────────────────────────────
    function refreshInlineAddons() {
        const container = document.getElementById('qrm-inline-addon-list');
        container.innerHTML = allAddons.map(a => {
            const sel = selectedAddons.has(a.name);
            return `
                <div class="qrm-inline-addon-item${sel ? ' qrm-inline-addon-item--selected' : ''}" data-name="${a.name}">
                    <div class="qrm-inline-addon-info">
                        <i class="bi ${a.iconCls}" aria-hidden="true"></i>
                        <span>${a.name}</span>
                    </div>
                    <div class="qrm-inline-addon-right">
                        <span class="qrm-inline-addon-price">${a.priceStr}</span>
                        <button type="button" class="qrm-inline-addon-btn${sel ? ' qrm-inline-addon-btn--sel' : ''}" aria-pressed="${sel}">
                            ${sel ? '<i class="bi bi-check2"></i>' : '<i class="bi bi-plus-lg"></i>'}
                        </button>
                    </div>
                </div>`;
        }).join('');
        container.querySelectorAll('.qrm-inline-addon-item').forEach(item => {
            item.querySelector('.qrm-inline-addon-btn').addEventListener('click', function () {
                const name = item.dataset.name;
                const addonData = allAddons.find(a => a.name === name);
                if (selectedAddons.has(name)) {
                    selectedAddons.delete(name);
                    syncCardState(name, false);
                } else {
                    selectedAddons.set(name, { price: addonData.priceStr, priceNum: addonData.priceNum, iconCls: addonData.iconCls });
                    syncCardState(name, true);
                }
                updateStickyBar();
                refreshInlineAddons();
                refreshAddonSummary();
            });
        });
    }

    // ── Riepilogo addon ─────────────────────────────────────────────
    function refreshAddonSummary() {
        const wrap = document.getElementById('qrm-addons');
        if (selectedAddons.size > 0) {
            const total = [...selectedAddons.values()].reduce((s, a) => s + a.priceNum, 0);
            document.getElementById('qrm-addons-list').innerHTML =
                [...selectedAddons.entries()].map(([n, a]) =>
                    `<div class="qrm-addon-item"><span><i class="bi bi-plus-circle me-1"></i>${n}</span><span>${a.price}</span></div>`
                ).join('');
            document.getElementById('qrm-addons-total').innerHTML =
                `<span>Totale aggiuntivi</span><span>+€${total}</span>`;
            wrap.style.display = 'block';
        } else {
            wrap.style.display = 'none';
        }
    }

    // ── Apertura modale ─────────────────────────────────────────────
    let addonOnlyProject = '';

    function openModal(data, projectContext) {
        lastPlanData = data;
        addonOnlyProject = projectContext || '';
        const addonOnly = !data;
        document.getElementById('qrm-icon').className = 'bi ' + (addonOnly ? 'bi-plus-square' : data.icon);
        document.getElementById('qrm-badge').textContent = addonOnly ? 'Servizi extra' : 'Preventivo gratuito';
        document.getElementById('qrm-title-text').textContent = addonOnly ? 'Aggiungi servizi extra' : 'Hai scelto il pacchetto';
        document.getElementById('qrm-plan-name').textContent = addonOnly
            ? (addonOnlyProject ? 'Progetto: ' + addonOnlyProject : '')
            : data.plan;
        document.getElementById('qrm-desc').textContent = addonOnly
            ? (addonOnlyProject
                ? 'Aggiungo i servizi selezionati al tuo progetto "' + addonOnlyProject + '" e ti preparo un preventivo personalizzato.'
                : 'Hai già un sito o un pacchetto? Scegli i servizi extra e ti contatto per un preventivo.')
            : 'Ottima scelta! Puoi aggiungere servizi extra qui sotto, poi ti rispondo entro 24h.';
        const summaryEl = document.getElementById('qrm-summary');
        if (!addonOnly) {
            document.getElementById('qrm-price').textContent    = data.price + ' una tantum';
            document.getElementById('qrm-delivery').textContent = data.delivery;
            summaryEl.style.display = '';
        } else {
            summaryEl.style.display = 'none';
        }
        refreshInlineAddons();
        refreshAddonSummary();
        // _triggerElement può essere già impostato dal chiamante; non sovrascrivere
        modal.show();
    }

    // ── Parliamone ──────────────────────────────────────────────────
    document.getElementById('qrm-go-contact').addEventListener('click', function (e) {
        e.preventDefault();
        let subject;
        if (lastPlanData) {
            subject = 'Preventivo pacchetto: ' + lastPlanData.plan;
            if (selectedAddons.size > 0)
                subject += ' + ' + [...selectedAddons.keys()].join(', ');
        } else if (selectedAddons.size > 0) {
            subject = addonOnlyProject
                ? 'Servizi extra per "' + addonOnlyProject + '": ' + [...selectedAddons.keys()].join(', ')
                : 'Servizi extra: ' + [...selectedAddons.keys()].join(', ');
        } else {
            subject = 'Richiesta informazioni';
        }
        sessionStorage.setItem('quoteSubject', subject);
        // Ask home page to focus the contact form first input after navigation
        sessionStorage.setItem('focusContact', '1');
        window.location.href = 'home.html#contact';
    });

    // ── Bottoni "Richiedi Preventivo" sulle card piano ──────────────
    document.querySelectorAll('.btn-request-quote').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('quoteRequestModal')._triggerElement = this;
            openModal({
                plan:     this.dataset.plan,
                price:    this.dataset.price,
                icon:     this.dataset.icon,
                delivery: this.dataset.delivery
            });
        });
    });
}

// Project Request Modal
function initProjectRequestModal() {
    if (!document.getElementById('projectRequestModal')) return;

    const modal = new bootstrap.Modal(document.getElementById('projectRequestModal'));
    const modalEl = document.getElementById('projectRequestModal');

    document.querySelectorAll('.btn-request-project').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            modalEl._triggerElement = this;

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

// ── Gestione focus modale: focus sulla × all'apertura, ritorno al trigger alla chiusura ──
function initModalFocusManagement() {
    // _triggerElement viene impostato PRIMA di ogni modal.show() nel codice chiamante.
    // Il fallback è document.activeElement al momento dell'evento show.bs.modal.

    document.querySelectorAll('.modal').forEach(modalEl => {

        modalEl.addEventListener('show.bs.modal', function () {
            // Usa il trigger impostato esternamente; se manca, usa l'elemento attivo ora
            if (!modalEl._triggerElement) {
                modalEl._triggerElement = document.activeElement;
            }
        });

        // Focus sulla X (o primo elemento) all'apertura, dopo il focus-trap di Bootstrap
        modalEl.addEventListener('shown.bs.modal', function () {
            setTimeout(() => {
                const closeBtn = modalEl.querySelector('.btn-close, .project-request-close');
                if (closeBtn) { closeBtn.focus(); return; }
                const first = modalEl.querySelector(
                    'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (first) first.focus();
            }, 150);
        });

        // Alla chiusura (X, ESC, "Forse più tardi") ripristina focus sul trigger
        modalEl.addEventListener('hidden.bs.modal', function () {
            if (document.querySelector('.modal.show')) return; // altra modale ancora aperta
            const trigger = modalEl._triggerElement;
            modalEl._triggerElement = null;
            if (trigger && document.body.contains(trigger)) {
                setTimeout(() => { try { trigger.focus(); } catch (e) {} }, 150);
            }
        });
    });
}

// Initialize back to top button
initBackToTop();