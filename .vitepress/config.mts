import { defineConfig } from 'vitepress';
import { siteBase } from './site-base.mjs';
import { compactSiteData, verifyBuiltHtml } from './site-data.mjs';
import { prepareImageCatalog } from './image-catalog.mjs';
import type { DefaultTheme, UserConfig } from 'vitepress';
import sidebar from './sidebar.mjs';
import navigation from './navigation.json';
import { readFileSync } from 'node:fs';
import { recentTips } from './recent.mjs';
import { footerFor } from './navigation.mjs';
import { configureMarkdown, containerLabels } from './markdown.mjs';

const extraExtensions = [process.env.VITE_EXTRA_EXTENSIONS, 'ods', 'xlsx'].filter(Boolean).join(',');
process.env.VITE_EXTRA_EXTENSIONS = extraExtensions;
prepareImageCatalog();

export default defineConfig({
        lang: 'de-DE',
        base: siteBase,
        vite: { define: { 'import.meta.env.VITE_EXTRA_EXTENSIONS': JSON.stringify(extraExtensions) } },
        transformHtml: compactSiteData,
        buildEnd: verifyBuiltHtml,
        title: 'SVWS Team-Hub',
        description: 'Wissen, Schulungsmaterial und Austausch für Fachberatung und Moderation rund um SchILD-NRW und den SVWS-Server.',
        lastUpdated: true,
        transformPageData(pageData) {
            if (['index.md', 'wissen/aktuelles.md'].includes(pageData.relativePath)) {
                pageData.frontmatter.latestTips = recentTips([
                    { product: 'SchILD', source: readFileSync('wissen/schild-tipps.md', 'utf8') },
                    { product: 'SVWS', source: readFileSync('wissen/svws-tipps.md', 'utf8') },
                ]);
            }
            if (pageData.frontmatter.layout === 'home') pageData.frontmatter.pageClass = 'schild-home';
            if (pageData.frontmatter.layout !== 'home' && !pageData.relativePath.startsWith('druck/')) {
                Object.assign(pageData.frontmatter, footerFor(navigation, '/' + pageData.relativePath));
            }
        },
        srcExclude: ['README.md', 'CONTRIBUTING.md', 'WORKFLOW.md', 'scripts/**', 'node_modules/**', 'tmp/**', 'test-results/**', 'PORTAL-REDAKTION.md', 'ARTIKELSTANDARD.md', 'markdown-examples.md', 'api-examples.md', 'HARMONISIERUNG.md', 'tests/**', '**/notes.md'],
        markdown: {
            container: containerLabels,
            image: { lazyLoading: true },
            config: md => configureMarkdown(md, siteBase),
        },
        themeConfig: {
            outline: { label: 'Auf dieser Seite', level: [2, 3] },
            docFooter: { next: 'Nächstes Thema', prev: 'Vorheriges Thema' },
            lastUpdated: { text: 'Zuletzt bearbeitet', formatOptions: { dateStyle: 'long' } },
            darkModeSwitchLabel: 'Darstellung',
            lightModeSwitchTitle: 'Zum hellen Erscheinungsbild wechseln',
            darkModeSwitchTitle: 'Zum dunklen Erscheinungsbild wechseln',
            sidebarMenuLabel: 'Themen',
            returnToTopLabel: 'Nach oben',
            search: { provider: 'local', options: { translations: {
                button: { buttonText: 'Suchen', buttonAriaLabel: 'Dokumentation durchsuchen' },
                modal: { displayDetails: 'Detaillierte Treffer anzeigen', resetButtonTitle: 'Suche zurücksetzen', backButtonTitle: 'Suche schließen', noResultsText: 'Keine Ergebnisse für', footer: { selectText: 'auswählen', selectKeyAriaLabel: 'Eingabetaste', navigateText: 'navigieren', navigateUpKeyAriaLabel: 'Pfeil nach oben', navigateDownKeyAriaLabel: 'Pfeil nach unten', closeText: 'schließen', closeKeyAriaLabel: 'Escape' } },
            } } },
            nav: navigation.nav,
            socialLinks: [{ icon: 'github', link: 'https://github.com/SVWS-NRW/SVWS-Team' }],
            sidebar,
        },
    } satisfies UserConfig<DefaultTheme.Config>);
