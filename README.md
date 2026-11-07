# Energiebrücken PWA – Release V2.1 (07.11.2026)

**Live-Projekt:** https://friendly-entremet-a1988d.netlify.app/

## Was ist neu?
- Schematische Deutschlandkarte mit **allen 16 Bundesländern** (anklick- und tastaturbedienbar)
- Bundesland-Auswahl, Themenfilter und illustrative Projektideen
- Rhein-Main/Hessen als Startpunkt; Auswahl kann ins lokale Profil oder in die Kreativwerkstatt übernommen werden
- Sichtbarer Versionshinweis V2.1
- Aktualisierter PWA-Offline-Cache, inklusive Kartenmodul und Icons
- Ein sicherer Veröffentlichungsschritt: Netlify baut `dist/` aus `scripts/build.mjs`
- Automatische GitHub-Qualitätschecks mit Node.js 22

## Struktur
Die GitHub-Hauptdateien sind Quell-Dateien. `scripts/build.mjs` erstellt daraus **dist/**.
Nur `dist/` wird von Netlify veröffentlicht. Die separat mitgelieferte Netlify-ZIP enthält genau diese statischen Website-Dateien im ZIP-Hauptverzeichnis inklusive `icons/`.

## Lokal testen
`node --test security.test.mjs tests/release.test.mjs && node scripts/build.mjs && node --test tests/dist.test.mjs`
Danach `python3 -m http.server 8000 -d dist` und http://localhost:8000 öffnen.

## Veröffentlichung
Der Commit auf `main` löst bei korrekt verknüpftem Repository automatisch einen Netlify-Build aus. In Netlify unter **Deploys** prüfen, ob der neue Commit den Status **Published** hat. Für eine manuelle Wiederherstellung `Energiebruecken_V2.1_Netlify.zip` per Netlify Drop verwenden.

## Grenzen
Alle 16 Punkte sind schematische Konzeptregionen, keine georeferenzierten Verwaltungsgrenzen. Es gibt keine echten Mitgliederdaten, regionale Kennzahlen oder gesicherte Projekte. Fachkräfte-Matching nutzt fiktive Profile, keine echte Datenbank. Lokal eingegebene Profile bleiben im jeweiligen Browser und sollten keine sensiblen personenbezogenen Daten enthalten. `standalone.html` bleibt die unveränderte ältere Offline-Einzeldatei; die neue Kartenfunktion steht in `index.html` der gebauten PWA zur Verfügung.
