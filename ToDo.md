8. Scroll-Progress-Indikator — dezenter grüner Balken oben, der beim Lesen wächst. Hält Menschen auf der Seite, weil der Abschluss des Fortschritts ein kleiner psychologischer Zwang ist ("ich bin schon bei 70%").

9. Zertifikate / Qualifikationen — falls Lukas Trainerlizenzen, IHK-Abschlüsse oder ähnliches hat, diese als kleine Badges unter dem Coach-Bild. Glaub-würdigkeit vor allem bei Führungskräften wichtig.

Testing: 3. Exit-Intent Popup — Desktop: wenn die Maus zur Browserleiste bewegt wird, erscheint das Popup sofort (statt 60s zu warten). Mobile: schnelles Zurück-Wischen triggert es. Menschen, die gehen wollen, sind die wichtigste Zielgruppe.




Projektstatus: Kampfgeist PT
Was fertig ist ✓
Alle 13 Sections gebaut (Hero → FinalCTA, EGYM auskommentiert)
Tech Stack vollständig: React 19, Vite 7, Tailwind 4, Framer Motion, i18n DE/EN, Wouter, CSV-Loading
Build sauber — kein TypeScript-Fehler, kein Produktions-Build-Fehler
Alle Shared Components: SwipeCard, CalDialog, WhatsApp Sticky, CookieConsent, TimedPopup (A/B), ScrollProgress
CSV-Dateien vorhanden (/public/data/) — mit Platzhalter-Daten befüllt
Was noch fehlt — nach Priorität
Kritisch (Site läuft, aber leer/broken ohne das):

#	Was	Wer
1	.env Datei anlegen (Kopie von .env.example)	Du/Nils
2	VITE_WHATSAPP_NUMBER — echte +49-Nummer	Lukas
3	VITE_GOOGLE_MAPS_URL — Google Maps Link	Lukas
4	hero.mp4 + hero-poster.webp → public/videos/	Lukas (Video)
5	coach-lukas.webp → public/images/	Lukas (Foto)
Wichtig (funktioniert mit Fallback, aber fehlt für die echte Wirkung):

#	Was	Wer
6	VITE_GOOGLE_PLACES_ID — für Live-Sternebewertung im Hero	Lukas
7	VITE_CAL_PHONE_LINK + VITE_CAL_VIDEO_LINK — cal.com Profile	Lukas
8	og-image.jpg → public/images/ (1200×630)	Lukas
9	Echte CSV-Daten (reviews, testimonials, transformations)	Lukas
10	Vor/Nachher Bilder → src/assets/images/transformations/	Lukas
Optional (für spätere Aktivierung):

#	Was
11	VITE_GA4_ID + VITE_META_PIXEL_ID — Analytics
12	VITE_BEHOLD_WIDGET_ID — Instagram Feed
13	Bio-Text von Lukas in de.json + en.json
14	EGYM-Section aktivieren (wenn Studio bereit)
Nächster konkreter Schritt für dich jetzt
.env anlegen — ich mache das direkt, sobald du sagst welche Werte du schon hast. Willst du anfangen mit den Credentials die du kennst?