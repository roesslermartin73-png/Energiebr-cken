# Energiebrücken – V2.1 Release Notes
Datum: 07.11.2026

## Implementiert
- Schematische Deutschlandkarte: 16 Bundesländer, Auswahl per Karte und Dropdown
- Thementypen Wärme, Gebäude, Strom, Industrie, Digitalisierung als illustrative Filter
- Auswahl der Region für lokale Profile und Kreativwerkstatt
- Externe JS-/CSS-Kartenerweiterung ohne neue Inline-Skripte
- Offline-Cache V2.1, inklusive Icons und Kartenmodule
- Netlify-Publish-Verzeichnis dist/; Entwicklungs- und Testdateien werden nicht veröffentlicht
- Automatische Codeprüfungen über GitHub Actions

## Tests
8 Sicherheits-/Quellcodeprüfungen und 2 dist-Buildprüfungen lokal bestanden (Node 22).
Browser-/iPhone-/Live-Deployment-Tests müssen separat durchgeführt werden.

## Grenzen
Karte ist nicht georeferenziert; die Themen sind Vorschläge und keine realen Daten.
Fachkräfte-Matching ist weiterhin eine Demo mit fiktiven Profilen.
Die ältere standalone.html bleibt unverändert.

## Rückkehr zur Vorversion
GitHub: vorherigen Commit auf main wiederherstellen und den Netlify-Deploy prüfen.
Netlify: über Deploys einen früheren funktionierenden Deploy erneut veröffentlichen.
