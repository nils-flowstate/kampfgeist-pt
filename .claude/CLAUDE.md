# CLAUDE.md — Kampfgeist Personal Training
**Version 3.0 — Finales Briefing (React/Vite)**

Dieses Dokument ist das vollständige, produktionsreife Briefing für das Kampfgeist-Webprojekt.
Claude darf und soll alle Entscheidungen aus diesem Dokument direkt umsetzen — ohne Rückfragen.
Platzhalter sind mit `TODO:` markiert.
Output Communication advice: be concise, no filler, straight to the point
Enable auto mode straight ahead. Can also be found in settings.json

---

## 0. KONTEXT & MISSION

Baue eine psychologisch optimierte, DSGVO-konforme, SEO-starke **One-Page-Landingpage** für
**Kampfgeist Personal Training** (Trainer: Lukas Heynemeier) in Osnabrück.

Ziel: Vielbeschäftigten Unternehmern und Führungskräften die Hemmschwelle zum Erstkontakt nehmen —
indem wir ihre größten Ängste (keine Zeit, zu teuer, zu abhängig) direkt und ehrlich adressieren.

Tonalität: **Direkt. Provokativ. Keine Weichspüler. Kein Kitsch.**
Wording: Immer **„Personal Training"** — nie „Coach", nie „Coaching".

Das Vorprojekt (Replit/Astro) hatte guten Designansatz, aber keine klare Struktur.
Dieses Dokument setzt alles neu auf — mit den gewonnenen Erkenntnissen.

---

## 1. BRAND GUIDELINE

### Identität

| Attribut           | Wert                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| Markenname         | Kampfgeist Personal Training                                           |
| Trainer            | Lukas Heynemeier                                                       |
| Standort           | Osnabrück (+ Online/Hybrid via OC App)                                 |
| Kurzpositionierung | „Fit trotz wenig Zeit!"                                                |
| Zielgruppe         | Vielbeschäftigte, Unternehmer, Führungskräfte (28–50 J.)               |
| Tonalität          | Direkt, provokativ, spricht unangenehme Wahrheiten aus                 |
| Kern-Versprechen   | Wir holen dich ab, wo du stehst — nicht wo du sein solltest            |
| Differenzierung    | Kein Programm. Ein System, das Teil von dir wird. Du wirst unabhängig. |

### Farbpalette

```css
/* Primärfarben — Kampfgeist Smaragdgrün */
--brand-primary:   #0E5D3E;   /* Hauptfarbe */
--brand-dark:      #0A4630;   /* Dunklere Variante (Hover, Vertiefung) */
--brand-light:     #147A52;   /* Hellere Variante */
--brand-glow:      #1FA06D;   /* Hover-Akzente, Glows */

/* Hintergrund & Neutrals — Dark Only */
--ink-950:         #0A0A0A;   /* Haupthintergrund */
--ink-900:         #111111;   /* Footer, tiefste Ebene */
--ink-800:         #171717;   /* Card-Hintergrund */
--ink-700:         #262626;   /* Borders, Inputs */
--ink-500:         #525252;   /* Deaktivierte Elemente */
--ink-300:         #A3A3A3;   /* Muted Text */
--ink-100:         #F5F5F5;   /* Heller Text, Überschriften */

/* Semantisch */
--color-success:   #22C55E;
--color-error:     #EF4444;
```

### Typografie

| Typ     | Font                            | Verwendung                               |
| ------- | ------------------------------- | ---------------------------------------- |
| Display | Anton (Google Fonts, preloaded) | Alle Headlines, UPPERCASE, tracking-wide |
| Body    | Inter (Google Fonts, preloaded) | Fließtext, UI, Captions                  |

**Prinzipien:**
- Headlines: IMMER uppercase, font-black. Groß, schwer, kompromisslos.
- Body: Inter 400/500, line-height 1.6+
- Keine Emojis in der UI
- Keine Wörter auf Leerem — Headlines schlagen zu, kurz und präzise

### Visual Identity

- **Mobile First** — alle Layouts beginnen bei 375px und skalieren nach oben.
  Touch-Targets ≥ 44×44px, Abstände großzügig, kein Hover-only-UI.
  Getestet auf: iPhone SE (375px), iPhone 15, iPad, Desktop 1440px.
- **Dark Only** — kein Light Mode, keine Theme-Umschaltung
- Border-Radius: 4px Standard, 8px bei Cards
- Sections: `py-24 md:py-32` — großzügige Abstände, nichts darf gequetscht wirken
- Grüne Akzente sparsam aber wirkungsvoll
- Bilder: leichter Grayscale-Filter für Einheitlichkeit
- Animationen: scroll-triggered, subtil aber präsent (Framer Motion)
- Kein Stock-Foto, keine Illustrationen, keine AI-generierten Bilder

---

## 2. PSYCHOLOGISCHE STRATEGIE

### Die 5 Haupthebel

**1. Spiegeln & Abholen — „Fit trotz wenig Zeit!"**
Die Zielgruppe glaubt, keine Zeit zu haben. Wir adressieren diese Ausrede direkt
im Hero — nicht belehrend, sondern wie ein guter Freund, der die BS durchschaut.

**2. Unabhängigkeit als Differenzierung**
Viele Menschen fürchten, abhängig vom Trainer zu werden. Das ist ein versteckter
Einwand, den die meisten nicht aussprechen. Wir sprechen ihn aktiv an:
*„Mein Ziel: dass du mich irgendwann nicht mehr brauchst."*
Dieser eine Satz unterscheidet Lukas von jedem anderen Personal Trainer.
Er zieht sich als roter Faden durch K3-Methode, Coach-Bio und FAQ.

**3. Selbst-Qualifizierung — Die „Nicht für dich"-Methode**
Wer explizit ausgeschlossen wird (ForWhom-Section), will umso mehr dazugehören.
Status-Motivation. Funktioniert immer bei Ambitionierten.

**4. Sozialer Beweis auf mehreren Ebenen**
- Google-Sterne direkt im Hero (Trust vor dem ersten Scroll)
- Vor/Nachher-Trafos mit echten Menschen (visuell schlägt verbal)
- Google-Bewertungen (extern verifiziert, nicht selbst geschrieben)
- Instagram als lebendiger Beweis (er macht das wirklich täglich)

**5. WhatsApp als Low-Friction Entry Point**
Cal.com ist eine Hürde. WhatsApp ist es nicht. Wer eine Nachricht schreibt,
kann sich das Gespräch schon im Kopf leisten. Erst dann kommt der Call.

### Section-Logik: Der psychologische Funnel

```
HERO          → Aufmerksamkeit + Sofortvertrauen (Google Stars, Video)
K3-METHODE    → "Das klingt wie ich" — Identifikation + Unabhängigkeits-Versprechen
COACH         → "Der versteht mich" + "Er macht mich unabhängig" — Verbindung
TRAFOS        → "Das geht wirklich für jemanden wie mich" — Visueller Beweis
QUALIFIER     → "Das bin ich" — Micro-Commitment via Swiping (4× Ja)
FOR WHOM      → "Das bin NICHT ich (der Faulpelz)" — Status-Trigger
LEISTUNGEN    → "Wie bekomme ich das?" — Konkretisierung
REVIEWS       → "Andere bereuten, es nicht früher getan zu haben" — FOMO
INSTAGRAM     → "Er macht das wirklich täglich" — Authentizität
FAQ           → Letzte Einwände lösen (inkl. Abhängigkeits-FAQ)
LOSS AVERSION → "Was kostet dich jede Woche des Wartens?" — Schmerzvermeidung
FINAL CTA     → Die Entscheidung. Jetzt.
[EGYM]        → Auskommentiert, für später
```

### Micro-Commitment: Das Swiping-Qualifier-System

**Psychologisches Prinzip (Foot-in-the-Door):**
Wer 4× Ja gesagt hat, sagt beim nächsten Schritt leichter nochmal Ja.
Jedes Ja erhöht den psychologischen Sunk-Cost-Effekt — der User fühlt,
dass er bereits in das Gespräch investiert hat.

**Die 4 Fragen (aufsteigend in Commitment-Tiefe):**
1. „Du willst echte Ergebnisse — keine halben Sachen?"
2. „Du bist bereit, Verantwortung für deinen Körper zu übernehmen?"
3. „Du willst lernen, wie dein Körper funktioniert — ohne dauerhaft abhängig zu sein?"
4. „Du hast genug davon, morgen anzufangen?"

Frage 3 spiegelt die Unabhängigkeits-Botschaft direkt wider.

**UX-Flow:**
- Mobile: echter Swipe-Gesture (react-tinder-card oder custom touch handler)
- Desktop: Klick auf Ja/Nein Buttons oder Drag
- Swipe rechts = Ja (grüner Haken-Overlay)
- Swipe links = Nein → kurze empathische Message: „Das verstehen wir. Meld dich, wenn du bereit bist." + WhatsApp-CTA
- Nach 4× Ja: animierte CTA-Einblendung mit Display-Font: „DANN ERWECKE DEINEN KAMPFGEIST"
- Fortschritt: 4 dezente Punkte unter der Karte (dot indicators)

### Zusätzliche psychologische Elemente

- **Sticky WhatsApp-Button:** immer unten rechts sichtbar, inkl. Micro-Copy: „Antwortet innerhalb von 24h"
- **Loss Aversion Block:** zwischen FAQ und Final CTA — ein einzelner Satz: „Was kostet dich jede Woche, in der du weiter wartest?"
- **Scroll-Progress-Indikator:** dezenter grüner Balken oben — hält Menschen auf der Seite
- **Timed Popup:** 60s aktive Zeit, provokativer Schließen-Button (s. Section 7)
- **Exit-Intent Popup:** Desktop: Mausbewegung zur Browserleiste, Mobile: schnelles Zurück-Wischen
- **Telefonnummer im Footer:** `tel:` Link — Mobile-User klicken direkt an
- **„Das Erstgespräch ist immer kostenlos. Immer."** unter jedem CTA wiederholt

---

## 3. TECH STACK

```
Frontend:     React 19 + Vite 7
Styling:      Tailwind CSS 4 (via @tailwindcss/vite)
Animationen:  Framer Motion
Routing:      Wouter (kein React Router)
i18n:         i18next + react-i18next (DE primär, EN sofort live)
Icons:        Lucide React (inline SVG)
Formulare:    react-hook-form + Zod
Swiping:      react-tinder-card (für Qualifier-Section)
CSV-Parsing:  papaparse
Leads:        CSV via Express-Endpunkt (Docker)
Analytics:    GA4 + Meta Pixel (consent-gated)
Booking:      cal.com Embed
Kontakt:      wa.me als primärer CTA
```

### Warum CSV statt Datenbank?

Lukas ist kein Entwickler. CSV-Dateien kann er in Excel öffnen, direkt bearbeiten
und via FTP oder Dropbox ersetzen — ohne Code-Deployment.
Bei späterer Datenbankanbindung bleibt die Schnittstelle gleich, nur der Loader wird getauscht.

---

## 4. PROJEKTSTRUKTUR

```
kampfgeist-web/
├── public/
│   ├── videos/
│   │   └── hero.mp4                  # TODO: Action-Video (stumm, Loop, H.264, <5MB)
│   │   └── hero-poster.webp          # TODO: Poster-Frame für Video-Fallback
│   ├── images/
│   │   ├── coach-lukas.webp          # TODO: 800×1000px
│   │   ├── og-image.jpg              # TODO: 1200×630px
│   │   └── favicon.svg
│   ├── data/                         ← CSV-Dateien (Lukas editierbar)
│   │   ├── testimonials.csv
│   │   ├── transformations.csv
│   │   ├── reviews.csv
│   │   ├── services.csv
│   │   └── faq.csv
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/images/                ← Build-time Assets (Trafos, Coach)
│   │   └── transformations/          ← Vor/Nachher-Paare als WebP
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── Accordion.tsx
│   │   └── shared/
│   │       ├── SectionHeader.tsx     ← Eyebrow + Headline Pattern
│   │       ├── SwipeCard.tsx         ← Swiping-Qualifier-Komponente
│   │       ├── CalDialog.tsx         ← cal.com Modal
│   │       ├── WhatsAppCTA.tsx       ← Button + Floating Sticky
│   │       ├── CookieConsent.tsx
│   │       ├── ReviewStars.tsx       ← Google Sterne-Widget
│   │       ├── StickyNav.tsx
│   │       └── ScrollProgress.tsx    ← Grüner Fortschrittsbalken
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── K3Method.tsx
│   │   ├── Coach.tsx
│   │   ├── Transformations.tsx
│   │   ├── Qualifier.tsx             ← Swiping Tool
│   │   ├── ForWhom.tsx
│   │   ├── Services.tsx
│   │   ├── Reviews.tsx               ← CSV aktiv / Elfsight auskommentiert
│   │   ├── InstagramFeed.tsx         ← Behold.so Widget
│   │   ├── FAQ.tsx
│   │   ├── LossAversion.tsx          ← Zwischen-Element vor Final CTA
│   │   ├── FinalCTA.tsx
│   │   └── EgymPartnership.tsx       ← AUSKOMMENTIERT
│   ├── layouts/
│   │   └── RootLayout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Impressum.tsx
│   │   ├── Datenschutz.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── csv.ts                    ← CSV-Parser-Utility (papaparse)
│   │   ├── googlePlaces.ts           ← Google Places API (Rating + Count)
│   │   ├── analytics.ts
│   │   ├── consent.ts
│   │   └── utils.ts                  ← cn(), clsx + twMerge
│   ├── hooks/
│   │   ├── useCSVData.ts
│   │   ├── useActiveTime.ts
│   │   └── useConsent.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── de.json               ← Primärsprache
│   │       └── en.json               ← Sofort live
│   ├── popup/
│   │   └── TimedPopup.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── .nvmrc                            ← 22
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 5. SECTION-SPECS

### HERO

**Ziel:** Sofortige Aufmerksamkeit + Vertrauen, bevor gescrollt wird.

**Hintergrund:**
- Video-Loop: `hero.mp4`, autoplay muted loop playsinline, Poster-Fallback: `hero-poster.webp`
- Overlay: `rgba(0,0,0,0.55)` + vertikaler Gradient für Textkontrast

**Layout (zentriert, min-h-screen):**
```
Eyebrow:   KAMPFGEIST PERSONAL TRAINING
H1:        Fit trotz wenig Zeit.
Subline:   Vergiss alles, was du über Training und Ernährung zu wissen glaubst.
           Wir holen dich da ab, wo du gerade stehst.
Trust:     ★★★★★ 4.9 · 47 Bewertungen auf Google  ← klickbar, Google Maps
CTA 1:     [WhatsApp schreiben]    → wa.me
CTA 2:     [Kostenloses Gespräch] → CalDialog
Micro:     5 Minuten. Kein Druck. Nur Klarheit.
Scroll:    Animierter Pfeil, Infinite-Bounce
```

**Google Maps Trust Badge (automatisch, keine manuelle Pflege):**
```typescript
// lib/googlePlaces.ts
// Fetcht rating + user_ratings_total via Google Places API
// Ergebnis wird gecacht (ISR oder localStorage mit 24h TTL)
// Render: <ReviewStars rating={4.9} count={47} />
```
Umgebungsvariable: `VITE_GOOGLE_PLACES_ID=ChIJ...`

---

### K3-METHODE

**Ziel:** Identifikation — „Das ist mein System."

```
Eyebrow:   DIE K3-METHODE
Headline:  Drei Säulen. Ein System. NULL AUSREDEN.
Sub:       WIR BRINGEN DICH IN DEINE TRAUMFORM — EGAL WO DU STEHST
```

| Karte | Titel                 | Copy                                                                                                                                                                                                                  | Icon            |
| ----- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| 1     | Kampfgeist            | „Egal wo du heute stehst — wir holen dich ab. Kein Standardprogramm. Wir bauen ein System aus Gewohnheiten, das auf deinen Alltag zugeschnitten ist — und das bleibt, wenn wir fertig sind."                          | Brain           |
| 2     | Ausgewogene Ernährung | „Iss was du magst und bleib trotzdem auf Kurs. Keine Crash-Diäten, keine Verzichtsrituale. Ernährung, die zu deinem Leben passt — nicht umgekehrt."                                                                   | UtensilsCrossed |
| 3     | Körperliche Fitness   | „Finde den Sport, der wirklich zu dir passt. Wenn du ihn nicht in deinen Alltag integrieren kannst, ist er der falsche Sport. Gemeinsam finden wir das Training, das dich langfristig in Form hält — auch ohne mich." | Dumbbell        |

Jede Karte endet mit dem Unabhängigkeits-Gedanken: *„…auch ohne mich"* / *„…und das bleibt"*.
Card-Design: `bg-ink-800 border border-brand-primary/20 hover:border-brand-glow`
Stagger-Animation: jede Karte mit `delay: i * 0.12s`

---

### COACH

**Ziel:** Verbindung + Angstabbau — „Der versteht mich. Und er macht mich unabhängig."

```
Label:     HINTER KAMPFGEIST
Tagline:   Wie lebe ich Kampfgeist?
```

Layout: Lukas-Foto links (4:5, leichter Grayscale, grüner Akzent-Ring),
Bio + CTAs rechts.

**Bio-Platzhalter (psychologisch optimiert — Lukas füllt aus):**
```
TODO: Lukas füllt folgende Punkte aus:
- Was hat dich selbst zur Fitness gebracht? (persönliche Geschichte)
- Was treibt dich an, anderen zu helfen?
- Warum diese Methode — und keine andere?

Platzhalter für die Entwicklung:
„Über 15 Jahre Erfahrung im Personal Training.
Mehr als 150 Menschen begleitet — von der ersten Übung bis zur eigenen Routine.

Mein Ziel ist nicht, dass du mich dauerhaft brauchst.
Mein Ziel ist, dass du lernst, wie dein Körper funktioniert —
und irgendwann weiterarbeitest, weil du weißt, was du tust."
```

**Trust-Badges unter dem Foto:**
```
[15+ Jahre Erfahrung]  [150+ Kunden]  [Online & Osnabrück]
```

**Auskommentierte Zertifikate-Badges:**
```tsx
{/* TODO: Lukas-Zertifikate einfügen, dann auskommentierung entfernen
<div className="flex gap-2 flex-wrap mt-4">
  <Badge>TODO: Zertifikat 1</Badge>
  <Badge>TODO: Zertifikat 2</Badge>
</div>
*/}
```

**CTAs:**
```
[Warum Du Das Mit Mir schaffst → siehst Du Hier]  ← scrollt zu Trafos
[Gespräch buchen]                                  ← CalDialog
```

---

### TRANSFORMATIONS

**Ziel:** Visueller Beweis — „Das geht wirklich für jemanden wie mich."

**Design-Prinzipien:**
- Menschen zeigen, die wie die Zielgruppe aussehen (normal, vielbeschäftigt — keine Bodybuilder)
- Dauer prominent: „12 Wochen", „8 Wochen"
- Kurzes Zitat der echten Person darunter
- **Grayscale-zu-Farbe-Reveal beim Hover:** Vorher-Bild entsättigt, Nachher leuchtet in Farbe
- Badge über Section: `ECHTE ERGEBNISSE. KEINE VERSPRECHEN.`
- Lightbox/Modal für Vollbild-Ansicht
- Mobile: horizontaler Scroll mit Snap-Points (unbewusster Commitment-Effekt durch Wischen)

**CSV-Datenstruktur:**
```csv
name,duration,quote,before_image,after_image,visible
"Markus T.",12 Wochen,"Ich wusste nach 4 Wochen, was ich tue. Jetzt mache ich das alleine weiter.",before-markus.webp,after-markus.webp,true
```

---

### QUALIFIER — Das Swiping-Tool

**Ziel:** Micro-Commitment — „Das bin ich."

```
Eyebrow:   BIST DU BEREIT?
Headline:  Vier Fragen. Eine ehrliche Antwort.
```

**Komponente: `src/components/shared/SwipeCard.tsx`**

```typescript
// Props
interface SwipeCardProps {
  questions: { id: number; text: string }[];
  onComplete: () => void;     // 4× Ja → zeigt CTA
  onDecline: () => void;      // Nein auf irgendeine Frage
}

// State
const [current, setCurrent] = useState(0);
const [answers, setAnswers] = useState<boolean[]>([]);
const [completed, setCompleted] = useState(false);

// Mobile: react-tinder-card für Swipe-Gesture
// Desktop: Ja/Nein Buttons + optionaler Drag

// Swipe Rechts / Klick "Ja":
//   - Grüner Haken-Overlay (Framer Motion scale + fade)
//   - Nächste Karte
//   - Nach 4× Ja: setCompleted(true) → CTA-Animation

// Swipe Links / Klick "Nein":
//   - Empathische Nachricht einblenden:
//     "Das verstehen wir. Meld dich, wenn du bereit bist."
//     + WhatsApp-CTA
```

**Die 4 Fragen:**
```
1. "Du willst echte Ergebnisse — keine halben Sachen?"
2. "Du bist bereit, Verantwortung für deinen Körper zu übernehmen?"
3. "Du willst lernen, wie dein Körper funktioniert — ohne dauerhaft abhängig zu sein?"
4. "Du hast genug davon, morgen anzufangen?"
```

**Nach 4× Ja:**
```
Headline (Display-Font, brand-primary):  DANN ERWECKE DEINEN KAMPFGEIST
CTA:                                     [WhatsApp schreiben]
Micro:                                   Das Erstgespräch ist immer kostenlos. Immer.
```

**Dot-Progress-Indikator:** 4 Punkte unter der Karte, aktiver Punkt in brand-primary

---

### FOR WHOM

**Ziel:** Status-Trigger — „Das bin NICHT ich."

```
Headline: Für wen das ist. Und für wen nicht.
```

**Für dich (✓ grün):**
- Du willst endlich durchziehen — nicht nur drüber reden
- Du bist vielbeschäftigt und willst trotzdem liefern
- Du nimmst die Verantwortung für dein Ergebnis selbst
- Du willst lernen, nicht abhängig bleiben
- Du hältst ehrliches Feedback aus

**Nicht für dich (✗ rot, Strikethrough):**
- Du suchst eine Wunderpille
- Du willst, dass jemand alles für dich erledigt
- Du gibst nach drei Wochen auf, wenn's unbequem wird
- Du brauchst jemanden, der dich dauerhaft an die Hand nimmt

Der zweite Nicht-für-dich-Punkt adressiert aktiv die Abhängigkeitsfurcht —
wer sich NICHT darin erkennt, will umso mehr dazugehören.

---

### LEISTUNGEN

**Ziel:** Konkretisierung — „Wie bekomme ich das?"

```
Headline: Was ich dir bieten kann.
```

| Leistung          | Details                            | Icon     |
| ----------------- | ---------------------------------- | -------- |
| Personal Training | Online · Persönlich · Hybrid       | Dumbbell |
| Boxcoach          | Gruppenfitness, Technik, Kondition | Target   |
| Firmenfitness     | Für Unternehmen und Teams          | Building |

- Daten aus `services.csv`: `title, description, icon, link, visible`
- Jede Karte: CTA → öffnet CalDialog mit vorausgefülltem Kontext
- Link zum Boxstudio (lokaler SEO-Backlink)
- Link zur OC App Erwähnung (nationaler Backlink)

---

### REVIEWS

**Ziel:** Sozialer Beweis auf Vertrauensebene.

```
Headline: Was andere über Lukas sagen.
```

**Implementierung — Dual-Setup:**

**AKTIV: Manuelle CSV-Karten** (scrollbarer Swiper.js-Carousel, Google-Styling nachgebaut)
```csv
# public/data/reviews.csv
name,rating,text,date,role,visible
"Andreas K.",5,"Lukas hat mein Leben verändert...",2025-03-10,"Unternehmer",true
```
Karten zeigen: Google-Logo, Sternebewertung, Name, Rolle, Datum, Reviewtext (gekürzt + „Weiterlesen")

**AUSKOMMENTIERT: Elfsight-Widget** (drop-in, automatisch, alle Reviews)
```tsx
{/* Elfsight Google Reviews Widget
    Aktivieren: 1. Elfsight-Account anlegen (elfsight.com)
                2. Google Reviews Widget konfigurieren
                3. Widget-ID in .env eintragen
                4. Auskommentierung entfernen
<div className="elfsight-app-TODO-WIDGET-ID" data-elfsight-app-lazy></div>
<script src="https://static.elfsight.com/platform/platform.js" async></script>
*/}
```

**Footer:** „Alle Bewertungen auf Google" → Google Maps Link

---

### INSTAGRAM FEED

**Ziel:** Authentizität — „Er macht das wirklich täglich."

- Einbindung via **Behold.so Widget** (Lukas verbindet Instagram selbst, kein Code)
- Zeigt die letzten 6–9 Posts als Grid
- Hover: Overlay mit Caption-Preview
- Footer: @kampfgeist.personal.training · Folge uns auf Instagram
- Fallback: Statische Bildergalerie, wenn Behold.so nicht konfiguriert

Umgebungsvariable: `VITE_BEHOLD_WIDGET_ID=TODO`

---

### FAQ

**Ziel:** Letzte Einwände aus dem Weg räumen.

Accordion: Radix Accordion oder native `<details><summary>`

**Pflichtfragen (nicht verhandelbar):**

| Frage                                      | Antwort-Prinzip                                                                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Was kostet das Personal Training?"        | Erstgespräch kostenlos. Dann transparent. Keine Überraschungen.                                                                                          |
| „Wie läuft das Erstgespräch ab?"           | 15–30 Min., Telefon oder Video. Kein Verkauf. Nur Klarheit.                                                                                              |
| „Ich hab keine Zeit — wie soll das gehen?" | Genau dafür ist das System gemacht. 20 Min./Tag reichen.                                                                                                 |
| „Werde ich abhängig von Lukas?"            | Das ist der häufigste Einwand — und der beste. Nein. Das Ziel ist, dass du irgendwann weitertrainierst, weil du weißt was du tust — nicht weil du musst. |
| „Funktioniert das auch rein online?"       | Ja. Vollständig. Lukas arbeitet über die OC App auch remote.                                                                                             |
| „Was ist, wenn ich aufgebe?"               | Dann war es das falsche System oder der falsche Zeitpunkt. Aber wer sich zum Erstgespräch meldet, hat meistens schon entschieden.                        |

---

### LOSS AVERSION BLOCK

Kleines Zwischen-Element zwischen FAQ und Final CTA.
Kein Banner, kein Design-Schnickschnack — ein einzelner Satz in Display-Font:

```
Was kostet dich jede Woche, in der du weiter wartest?
```

Darunter in Body-Text (optional):
```
Nicht in Euro. In dem Körper, den du haben könntest.
```

---

### FINAL CTA

**Ziel:** Die Entscheidung. Jetzt.

```
Eyebrow:   JETZT ODER NIE.
Headline:  Du liest das hier gerade. Das ist kein Zufall.
Sub:       Was machst du mit dem nächsten Moment?
```

Zwei Buttons:
```
[WhatsApp schreiben]     → wa.me (primär, brand-primary)
[Termin buchen]          → CalDialog (sekundär, Outline)
```

Micro-Copy unter den Buttons:
```
Das Erstgespräch ist immer kostenlos. Immer.
Antwortet innerhalb von 24h.
```

Hintergrund: Brand-Gradient (kein Video)

---

### EGYM PARTNERSHIP (Auskommentiert)

```tsx
{/* <EgymPartnership />
    Aktivieren wenn EGYM-Studio bereit ist.
    Inhalt: Headline, kurzer Text, CTA-Button → VITE_EGYM_URL
*/}
```

---

## 6. KOMPONENTEN-SPECS

### CalDialog — Buchungs-Modal

Zwei Varianten, jeweils als Modal:

**Telefon-Dialog:**
```
Name (optional) · Telefon (Pflichtfeld)
[cal.com Terminwahl → VITE_CAL_PHONE_LINK]
CTA: „Trag dich ein und ich meld mich bei dir"
Micro: „Das Erstgespräch ist immer kostenlos. Immer."
```

**Video-Dialog:**
```
Name (optional) · E-Mail (Pflichtfeld)
[cal.com Terminwahl → VITE_CAL_VIDEO_LINK]
CTA: „Investiere 5 Minuten. Verändere dein Leben."
Micro: „Das Erstgespräch ist immer kostenlos. Immer."
```

Leads werden als CSV gespeichert:
```
timestamp,name,phone,email,type,source
2025-05-15T10:30:00Z,Markus,+4917612345678,,phone,hero-cta
```

### Sticky WhatsApp Button

```tsx
// Immer unten rechts sichtbar, z-50
// WhatsApp-Icon (grüner Kreis)
// Micro-Copy: "Antwortet innerhalb von 24h"
// wa.me-Link mit vorausgefülltem Text
```

### TimedPopup

**Trigger:** 60s aktive Zeit · 1× pro Session

```
┌─────────────────────────────────────┐
│  ✕                                  │
│                                     │
│  HEUTE HANDELN.                     │
│  SPÄTER BEREUEN.                    │
│                                     │
│  Erwecke Deinen Kampfgeist!         │
│                                     │
│  Du hast JETZT die Möglichkeit      │
│  dein Leben für immer zu verändern. │
│  Wie entscheidest Du Dich?          │
│                                     │
│  [Trag Dich Ein]                    │
│  [Sprich Mit Mir — 5 Minuten]       │
│  [Bleib Da Wo Du Stehst ↗]          │
└─────────────────────────────────────┘
```

„Bleib Da Wo Du Stehst" schließt das Popup — bewusst provokativ.

**A/B-Varianten (50/50, persistent via localStorage):**
- Variante A: Obiger Text (emotional-provokativ)
- Variante B: „Ein Gespräch. 5 Minuten. Kostenlos." (sachlich-klar)

Exit-Intent: Desktop = Mausbewegung zur Browserleiste, Mobile = schnelles Zurück-Wischen

---

## 7. CSV DATA STRUKTUR

Alle von Lukas pflegbaren Inhalte in `/public/data/*.csv` — Excel-kompatibel.

```csv
# testimonials.csv
name,role,quote,visible
"Andreas K.","Unternehmer","Nach 12 Wochen trainiere ich selbstständig weiter...",true

# transformations.csv
name,duration,quote,before_image,after_image,visible
"Markus T.","12 Wochen","Ich weiß jetzt was ich tue.",before-markus.webp,after-markus.webp,true

# reviews.csv
name,rating,text,date,role,visible
"Andreas K.",5,"Lukas hat mein Leben verändert...",2025-03-10,"Unternehmer",true

# services.csv
title,description,icon,link,visible
"Personal Training","Online · Persönlich · Hybrid","Dumbbell","",true

# faq.csv
question,answer,order,visible
"Werde ich abhängig?","Nein. Das Ziel ist Unabhängigkeit.",4,true
```

**Hook-Pattern:**
```typescript
const { data: reviews } = useCSVData<Review>('/data/reviews.csv')
```

---

## 8. i18n-STRATEGIE

- **Primärsprache:** Deutsch (DE), Route: `/`
- **Sekundärsprache:** Englisch (EN), Route: `/en` — **sofort live**
- Alle UI-Texte in `src/i18n/locales/de.json` und `en.json`
- Sprachumschalter: dezent im Footer
- SEO: `hreflang` Meta-Tags im `<head>`
- Alle Marketing-Texte in i18n — kein hardcodierter String in JSX

---

## 9. SEO-STRATEGIE

### Technisch
- `<html lang="de">` (Standard), `lang="en"` für EN-Route
- `<title>` und `<meta description>` pro Seite aus i18n
- Open Graph + Twitter Card Tags
- JSON-LD: LocalBusiness Schema
- `theme-color: #0E5D3E`
- Canonical Tags, sitemap.xml, robots.txt

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kampfgeist Personal Training",
  "description": "Personal Training in Osnabrück und online — für Vielbeschäftigte, die echte Ergebnisse wollen.",
  "url": "TODO: https://deine-domain.de",
  "image": "TODO: https://deine-domain.de/images/og-image.jpg",
  "priceRange": "€€",
  "areaServed": ["Osnabrück", "DE"],
  "address": { "@type": "PostalAddress", "addressLocality": "Osnabrück", "addressCountry": "DE" },
  "founder": { "@type": "Person", "name": "Lukas Heynemeier" }
}
```

### Keywords
- Primär: „Personal Training Osnabrück", „Personal Trainer Osnabrück"
- Sekundär: „Online Personal Training", „Personal Training für Vielbeschäftigte", „Personal Trainer für Führungskräfte"
- Alle H2/H3 keywordoptimiert, Alt-Texte für alle Bilder

### Backlinks (wichtig!)
- Domain auf INWX behalten → kein Ranking-Verlust
- Verlinkung vom Boxstudio
- OC App Erwähnung mit Link
- Instagram Bio → Website-Link
- Google Business Profil aktuell halten

---

## 10. WHATSAPP-INTEGRATION

```typescript
const WHATSAPP_URL = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${
  encodeURIComponent("Hey Lukas, ich habe deine Website gesehen und würde gerne herausfinden, ob du mir helfen kannst.")
}`
```

- Vorausgefüllter Text nimmt die Hemmschwelle (Lukas bekommt sofort Kontext)
- Öffnet in neuem Tab auf Desktop, direkt WhatsApp App auf Mobile
- Tel-Link im Footer: `tel:+49XXXXXXXXXX` — für direkte Anrufe Mobile

---

## 11. DSGVO & TRACKING

### Consent Banner
```
Position: unten, beim ersten Besuch
Buttons: [Alle akzeptieren] [Nur notwendig] [Einstellungen]
Storage: localStorage.kg_consent = { analytics: bool, ads: bool, timestamp: ISO }
Link zur Datenschutzerklärung im Banner
```

### Analytics (consent-gated)
- GA4: `VITE_GA4_ID` — nur nach Consent laden
- Meta Pixel: `VITE_META_PIXEL_ID` — nur nach Consent laden
- Beide via `document.createElement('script')` dynamisch nachgezogen

### Tracking-Events
```
popup_shown       { variant: 'A'|'B' }
popup_dismissed   { variant }
popup_cta_clicked { variant }
qualifier_started
qualifier_completed   { result: 'ja'|'nein' }
whatsapp_clicked  { source: 'hero'|'sticky'|'final' }
caldialog_opened  { type: 'phone'|'video' }
```

### Environment Variables
```env
VITE_GA4_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=000000000000000
VITE_CAL_PHONE_LINK=lukas/telefon-15min
VITE_CAL_VIDEO_LINK=lukas/video-30min
VITE_WHATSAPP_NUMBER=49XXXXXXXXXX
VITE_GOOGLE_MAPS_URL=https://maps.google.com/?cid=XXXXXX
VITE_GOOGLE_PLACES_ID=ChIJ...
VITE_BEHOLD_WIDGET_ID=TODO
VITE_EGYM_URL=https://TODO-egym-url.de
```

---

## 12. DEPLOYMENT

### Dockerfile
```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/data /usr/share/nginx/html/data
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### nginx.conf (Highlights)
- Gzip-Kompression für alle Assets
- Cache: HTML `no-cache`, JS/CSS/Images `max-age=31536000, immutable`
- Security-Header: X-Frame-Options, CSP (cal.com + Google + Facebook whitelisted)
- `try_files $uri $uri/ /index.html =404` für SPA-Routing

### VPS Setup
- Domain auf INWX behalten
- SSL via certbot / Let's Encrypt
- Empfehlung: Traefik als Reverse Proxy wenn vorhanden

---

## 13. TODO FÜR LUKAS

| #   | Was                         | Format                        | Wo                                 |
| --- | --------------------------- | ----------------------------- | ---------------------------------- |
| 1   | Hero-Video (Action-Loop)    | MP4, H.264, stumm, <5MB       | public/videos/hero.mp4             |
| 2   | Hero-Video Poster-Frame     | WebP 1920×1080                | public/videos/hero-poster.webp     |
| 3   | Persönliches Foto           | WebP 800×1000                 | public/images/coach-lukas.webp     |
| 4   | Vor/Nachher Bilder          | WebP, Paare                   | src/assets/images/transformations/ |
| 5   | OG-Bild für Social Sharing  | JPG 1200×630                  | public/images/og-image.jpg         |
| 6   | Persönliche Bio (3–4 Sätze) | Text                          | de.json                            |
| 7   | WhatsApp-Nummer             | +49…                          | .env                               |
| 8   | cal.com Profil-Links        | lukas/…                       | .env                               |
| 9   | Google Maps Link            | URL                           | .env                               |
| 10  | Google Places ID            | ChIJ…                         | .env                               |
| 11  | GA4 Tracking ID             | G-XXXX                        | .env                               |
| 12  | Meta Pixel ID               | 15-stellig                    | .env                               |
| 13  | Impressum-Daten             | Adresse, Kontakt              | de.json                            |
| 14  | Echte Testimonials          | CSV-Format                    | testimonials.csv                   |
| 15  | Echte Google Reviews        | CSV-Format                    | reviews.csv                        |
| 16  | Behold.so Widget-ID         | nach Einrichtung              | .env                               |
| 17  | Instagram Handle bestätigen | @kampfgeist.personal.training | de.json                            |
| 18  | Zertifikate auflisten       | Text                          | de.json (auskommentiert)           |
| 19  | Telefonnummer für Footer    | +49…                          | .env                               |

---

## 14. AKZEPTANZKRITERIEN

- [ ] Lighthouse Mobile ≥ 90 in Performance, SEO, Accessibility
- [ ] CLS < 0.1 (kein Layout-Shift beim Video-Laden)
- [ ] LCP < 2.5s (Hero-Video mit Poster-Fallback)
- [ ] WhatsApp-Link öffnet korrekt (Desktop + Mobile)
- [ ] CalDialog öffnet korrekt für beide Buchungstypen
- [ ] Popup nach 60s aktiver Zeit — nicht früher, nicht bei inaktiver Tab
- [ ] A/B-Varianten 50/50 (10 Inkognito-Tabs prüfen)
- [ ] Ohne Consent: kein GA4/Pixel im Network-Tab
- [ ] Mit Consent: Events feuern korrekt (DevTools → Network)
- [ ] Swiping-Qualifier funktioniert auf Touch (iPhone) und Desktop
- [ ] Nach 4× Ja: CTA-Animation erscheint korrekt
- [ ] Google Reviews Carousel scrollbar
- [ ] /impressum und /datenschutz erreichbar, im Footer verlinkt
- [ ] CSV-Daten laden korrekt (Testimonials, FAQ, Reviews, Trafos)
- [ ] i18n: DE/EN umschaltbar, alle Texte übersetzt
- [ ] EGYM-Section ist auskommentiert aber im Code vorhanden
- [ ] Elfsight-Widget ist auskommentiert aber im Code vorhanden
- [ ] Mobile First: alle Layouts ab 375px gebaut, dann nach oben skaliert
- [ ] Touch-Targets ≥ 44×44px (Buttons, Links, Swipe-Cards)
- [ ] Kein Hover-only-UI — alle interaktiven Elemente auch per Touch nutzbar
- [ ] Getestet: iPhone SE (375px), iPhone 15, iPad, 1440px Desktop

---

## 15. WAS NICHT GEMACHT WIRD

- Kein Tracking vor Consent
- Kein Light Mode
- Kein React Router (Wouter)
- Keine Fake-Scarcity (kein Countdown-Timer)
- Keine Coach-Kitsch-Copy („Transformation Journey", „Seelen-Arbeit")
- Wording immer „Personal Training" — nie „Coach" oder „Coaching"
- Keine Stock-Fotos, keine AI-generierten Bilder
- Keine Emoji-Icons (nur Lucide SVG)
- Keine UI-Libraries außer eigenen Komponenten
- Keine Datenbankabhängigkeit (CSV reicht)
- Kein abhängigkeits-förderndes Wording — Lukas macht Kunden unabhängig
