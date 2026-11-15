# SVWS Team-Hub

Dokumentation für Fachberatung und Moderation rund um SchILD-NRW und SVWS.

- [Repository](https://github.com/SVWS-NRW/SVWS-Team)
- [Mitarbeiten](./CONTRIBUTING.md)
- [Redaktions- und Veröffentlichungsworkflow](./WORKFLOW.md)
- [Lizenz (CC0 1.0)](./LICENSE.md)

## Lokal starten

Verwende Node.js 22 wie in GitHub Actions. In PowerShell startest Du die Vorschau so:

```powershell
npm.cmd ci
npm.cmd run docs:dev
```

Der Server nennt die Adresse, standardmäßig http://localhost:5173/. Mit Strg+C beendest Du ihn.

## Prüfen und veröffentlichen

Starte npm test, npm run docs:build und anschließend npm run docs:check. Die Browserprüfung folgt nach npx playwright install chromium --only-shell mit npm run docs:check-browser. Redaktionelle Pull Requests gehen von einem Arbeitsbranch gegen dev. Der Veröffentlichungsworkflow baut mit DOCS_BASE=/ und zusätzlich mit dem GitHub-Pages-Pfad, falls nötig. GitHub Pages veröffentlicht den Stand von master.

## Ordner

- .github/workflows/ enthält die Dokumentations-, Browser- und Veröffentlichungsworkflows.
- .vitepress/ enthält die VitePress-Konfiguration, Navigation, gemeinsame Komponenten und Projektfarben.
- hilfe/, bilder/ und druck/ enthalten Redaktionshilfen, Bilderkatalog und Rubrikdruck.
- public/bilder/ und public/dateien/ sind die vorgesehenen Ablageorte für neue öffentliche Bilder und Downloads. Bestehende Artikel behalten ihre Medienpfade.
- scripts/ enthält die Prüfskripte.

Die Fachinhalte stammen aus [FBM](https://github.com/Raffenberg/SVWS_FBM/tree/4a8c4c16bb45805c9339e5bf497bb3412d10fe85). Technische Grundlage ist die [SchILD-NRW-3-Dokumentation](https://github.com/SVWS-NRW/SchILD-NRW-3-Dokumentation/tree/6435db4bbbb05da9d2000610e9ad64ccaaae9d66).
