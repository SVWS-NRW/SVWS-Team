# SVWS Team-Hub – Dokumentation

Arbeitsunterlagen für Fachberatung und Moderation rund um SchILD-NRW und SVWS. Hier findest Du auch Testdaten, Hinweise zur Einrichtung und Fortbildungsmaterial.

- [Offizielles Repository](https://github.com/SVWS-NRW/SVWS-Team)
- [Dokumentation auf GitHub Pages](https://svws-nrw.github.io/SVWS-Team/)

## Lokal ansehen

Du benötigst Node.js 22. Führe im Repository diese Befehle aus:

```sh
npm ci
npm run docs:dev
```

Öffne die Adresse aus dem Terminal, standardmäßig `http://localhost:5173/`. In Windows PowerShell kannst Du `npm.cmd` verwenden. Für die im Repository gespeicherten SQLite-Dateien benötigst Du außerdem Git LFS. Mit `git lfs pull` kannst Du die Dateien für Deinen ausgecheckten Stand abrufen.

## Artikel bearbeiten

Bearbeite die Markdown-Dateien auf einem eigenen Arbeitsbranch und reiche Deine Änderung als Pull Request gegen `dev` ein. Den Merge übernimmt die zuständige Redaktion.

In der Rubrik **Hilfe** findest Du [Artikel schreiben und bearbeiten](./hilfe/artikel-schreiben.md) und [Markdown und Gestaltung](./hilfe/markdown-und-gestaltung.md). Die Anleitung zur [Mitarbeit](./CONTRIBUTING.md) erklärt auch, wie Du Artikel über GitHub oder VS Code im Browser öffnest. Der [Redaktions- und Veröffentlichungsworkflow](./WORKFLOW.md) beschreibt die Prüfungen und Freigaben.

## Prüfen

Führe vor einem Pull Request die folgenden Befehle aus:

```sh
npm run docs:check-structure
npm test
npm run docs:build
npm run docs:check
```

Die Strukturprüfung kontrolliert Menüziele und Paketstand. Die Tests decken unter anderem Markdown und den Rubrikdruck ab. Nach dem Build prüft `docs:check` die internen Links samt Sprungmarken und die Bilder der erzeugten Website.

Führe nach Änderungen an der Bedienung oder Darstellung zusätzlich die Browserprüfung aus:

```sh
npx playwright install chromium --only-shell
npm run docs:check-browser
```

Sie prüft unter anderem Kopfmenü, Bearbeitungsschaltflächen, Artikelindex, Bilderkatalog, Fußzeile und Druckansichten. Die GitHub-Workflows **Dokumentation prüfen** und **Bedienung prüfen** laufen bei PRs gegen `dev` oder `master` und lassen sich auch manuell starten. Prüfskripte und Tests liegen unter `scripts/`, lokale Fehlerbilder unter `test-results/`.

## Technischer Paketstand

Die Doku verwendet **VitePress 1.6.4**, **markdown-it-container 4.0.0** und **Playwright 1.56.1**. Die Vite-Abhängigkeit von VitePress ist in `package.json` auf **Vite 6.4.5** festgelegt. GitHub Actions baut mit Node.js 22. Nach einer Paketänderung installierst Du den im Lockfile festgelegten Stand mit `npm ci` neu.

## Veröffentlichen

Für eine lokale Vorschau des fertigen Builds:

```sh
npm run docs:build
npm run docs:preview
```

Die statische Website liegt in `.vitepress/dist`. Standardbuild und Vorschau verwenden den Basispfad `/`. Für einen Unterpfad setzt Du `DOCS_BASE` vor dem Build, zum Beispiel auf `/SVWS-Team/`.

Bei einem Merge nach `master` baut und prüft der [Veröffentlichungsworkflow](./.github/workflows/deploy.yml) die Doku für GitHub Pages. In den Pages-Einstellungen muss dafür **GitHub Actions** als Quelle gewählt sein. Der Workflow erzeugt auch das Artefakt `svws-team-domain` für Hosting direkt am Domainstamm. Nach der Veröffentlichung prüfst Du Startseite, Artikellinks, Suche, Bilder und Mobilmenü auf der Zieladresse. Die Lizenz steht in [LICENSE.md](./LICENSE.md).

## Wartung

- Konfiguration, Menüs und Theme liegen unter `.vitepress/`. Redaktionshilfen, Bilderkatalog und Rubrikdruck liegen unter `hilfe/`, `bilder/` und `druck/`.
- Neue öffentliche Bilder legst Du unter `public/bilder/` ab, neue Downloads unter `public/dateien/`. Bestehende Artikel verwenden zum Teil Medien in ihren eigenen Verzeichnissen.
- Prüfe Paketupdates mit `npm audit`, Build, Linkprüfung und bei Änderungen an der Werkzeugkette auch im Browser. Lokale Ausgaben liegen unter `test-results/` und `.vitepress/`.

Die Fachinhalte wurden aus [FBM](https://github.com/Raffenberg/SVWS_FBM/tree/4a8c4c16bb45805c9339e5bf497bb3412d10fe85) übernommen. Die technische Vorlage ist die [SchILD-NRW-3-Dokumentation](https://github.com/SVWS-NRW/SchILD-NRW-3-Dokumentation).
