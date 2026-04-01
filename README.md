# Frontend Developer Portfolio

Un portfolio moderno e responsive per frontend developer, realizzato con HTML5, Bootstrap 5, SCSS e JavaScript vanilla.

## 🚀 Caratteristiche

- ✨ Design moderno e pulito
- 📱 Completamente responsive
- 🎨 Animazioni CSS fluide
- ⚡ Performance ottimizzate
- 🔧 Facilmente personalizzabile
- 🎯 SEO friendly

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Markup semantico
- **CSS3/SCSS** - Styling avanzato con preprocessore
- **Bootstrap 5** - Framework CSS responsive
- **JavaScript ES6+** - Interattività e animazioni
- **Bootstrap Icons** - Set di icone moderne
- **Google Fonts** - Typography (Poppins)

## 📁 Struttura del Progetto

```
frontend-portfolio/
├── index.html              # Pagina principale
├── package.json            # Configurazione NPM
├── README.md               # Documentazione
└── assets/
    ├── css/
    │   └── style.css       # CSS compilato
    ├── scss/
    │   └── style.scss      # File SCSS sorgente
    ├── js/
    │   └── script.js       # JavaScript principale
    └── images/             # Cartella per immagini
```

## 🎨 Sezioni Incluse

1. **Hero Section** - Intro con effetto typing e animazioni
2. **About** - Presentazione personale e competenze
3. **Skills** - Barre di progresso animate per le competenze tecniche
4. **Portfolio** - Griglia di progetti con overlay hover
5. **Contact** - Form di contatto funzionale
6. **Footer** - Link social e copyright

## 🚀 Come Iniziare

### 1. Clona o Scarica il Progetto

```bash
# Se hai git installato
git clone [url-del-tuo-repo]

# Oppure scarica e estrai lo ZIP
```

### 2. Installa le Dipendenze (Opzionale)

Se vuoi utilizzare gli script NPM per SCSS:

```bash
npm install
```

### 3. Personalizza il Contenuto

Modifica il file `index.html` per personalizzare:
- Nome e informazioni personali
- Competenze e percentuali
- Progetti del portfolio
- Informazioni di contatto
- Link social

### 4. Personalizza lo Stile

Modifica il file `assets/scss/style.scss` per:
- Cambiare colori (variabili all'inizio del file)
- Modificare font e dimensioni
- Aggiungere nuove animazioni
- Personalizzare responsive breakpoints

Ricompila il CSS con:

```bash
npm run sass:build
```

### 5. Visualizza il Sito

Apri semplicemente `index.html` nel browser oppure usa un server locale:

```bash
# Con NPM (se installato)
npm run serve

# Con Python
python -m http.server 8080

# Con Node.js
npx http-server
```

## 🎯 Personalizzazione Rapida

### Cambiare i Colori

Nel file `assets/scss/style.scss`, modifica le variabili all'inizio:

```scss
$primary-color: #007bff;    // Colore principale
$secondary-color: #6c757d;  // Colore secondario
$dark-color: #212529;       // Colore scuro
```

### Modificare le Competenze

Nel file `index.html`, sezione skills, cambia:
- Nomi delle competenze
- Icone Bootstrap
- Percentuali (data-width)

```html
<div class="skill-card">
    <div class="skill-icon">
        <i class="bi bi-filetype-html"></i>
    </div>
    <h5>HTML5</h5>
    <div class="progress mb-2">
        <div class="progress-bar" data-width="95">95%</div>
    </div>
</div>
```

### Aggiungere Progetti

Copia e modifica la struttura del portfolio:

```html
<div class="col-lg-4 col-md-6 mb-4">
    <div class="portfolio-item">
        <div class="portfolio-image">
            <div class="placeholder-project">
                <i class="bi bi-laptop"></i>
                <div class="overlay">
                    <a href="#" class="btn btn-light btn-sm">
                        <i class="bi bi-eye"></i> Visualizza
                    </a>
                </div>
            </div>
        </div>
        <div class="portfolio-info">
            <h5>Nome Progetto</h5>
            <p class="text-muted">Tecnologie utilizzate</p>
        </div>
    </div>
</div>
```

## 📱 Responsive Design

Il sito è ottimizzato per tutti i dispositivi:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)  
- **Mobile** (576px - 767px)
- **Small Mobile** (<576px)

## ⚡ Ottimizzazioni

- **Performance**: CSS e JS minificati per produzione
- **SEO**: Meta tags ottimizzati
- **Accessibilità**: Markup semantico e attributi ARIA
- **Cross-browser**: Compatibile con tutti i browser moderni

## 🔧 Scripts NPM Disponibili

```bash
# Osserva modifiche SCSS e compila automaticamente
npm run sass:watch

# Compila SCSS una volta (versione compressa)
npm run sass:build

# Avvia server locale
npm run serve

# Sviluppo: compila SCSS + server locale
npm run dev
```

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Puoi utilizzarlo liberamente per progetti personali e commerciali.

## 🤝 Contributi

Se hai suggerimenti per miglioramenti:

1. Fai un fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/NuovaFeature`)
3. Commit le modifiche (`git commit -m 'Aggiunge NuovaFeature'`)
4. Push al branch (`git push origin feature/NuovaFeature`)
5. Apri una Pull Request

## 📞 Supporto

Se hai domande o problemi:
- Apri un issue su GitHub
- Contattami via email
- Controlla la documentazione

---

Buona fortuna con il tuo nuovo portfolio! 🚀