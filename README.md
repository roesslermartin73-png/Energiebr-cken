# Energiebrücken – Netlify-PWA + Standalone + V2-Matching

## Inhalte
- `site/index.html`: installierbare Netzwerk-PWA (Konzept V1, Offline-App-Shell)
- `site/standalone.html`: eigenständige HTML-Datei, ohne Server direkt öffnbar
- `site/matching.html`: statische V2-Matching-Demo mit fiktiven Daten, ohne Backend
- `site/manifest.webmanifest`, `site/sw.js`, `site/icons/`: PWA-Installation und begrenzter Offline-Cache
- `site/_headers`: Netlify-Sicherheitsheader, einschließlich CSP
- `netlify.toml`: Netlify-Publish-Verzeichnis

## Lokal testen
Im Projektverzeichnis: `python3 -m http.server 8000 -d site`, danach http://localhost:8000 öffnen. Alternativ `site/standalone.html` per Doppelklick öffnen. PWA-Installation benötigt HTTPS oder localhost.

## Netlify – Drag & Drop
Den **Inhalt des Ordners `site/`** als ZIP hochladen oder den Ordner selbst auf Netlify Drop ziehen. Bei GitHub-Verbindung das **gesamte Projekt** in ein Repository laden: Netlify erkennt `netlify.toml` und veröffentlicht `site/` (kein Build-Befehl).

## Sicherheit und Grenzen
Nur fiktive Demo-Profile verwenden. Es gibt keine Anmeldung, Datenbank, serverseitige Zugriffskontrolle, reale Kontaktvermittlung oder synchronisierte Mitglieder. Lokal angelegte Profile der V1 werden unverschlüsselt im Browser gespeichert. Nicht für echte Kontaktdaten oder öffentlichen Produktivbetrieb verwenden. Die Matching-Demo verarbeitet nur lokale, fest hinterlegte Testdaten. CSP erlaubt für den bestehenden Legacy-HTML-Code Inline-CSS; vor Produktivbetrieb modernisieren. Externe KI wird nicht verwendet; KI-Datenfreigabe ist noch nicht entschieden.
Netlify-Synchronisationstest V2 – 07.11.2026
