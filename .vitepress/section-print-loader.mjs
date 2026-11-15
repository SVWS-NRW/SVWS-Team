import { createContentLoader } from 'vitepress'
import navigation from './navigation.json' with { type: 'json' }
import { sectionPrintEntries, canonicalArticle } from './section-print.mjs'
import { printImageUrl } from './image-catalog.mjs'
import { overviewRows } from './overview.mjs'

export function printNavigation() {
  return { sidebar: Object.fromEntries(Object.entries(navigation.sections).map(([key, items]) =>
    [key, [{ text: navigation.sectionLabels[key], items }]])) }
}
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const normalize = html => html.replace(/&amp;/g,'&')
function renderOverview(_match, url) {
  const rows = overviewRows(navigation, url)
  return '<table><thead><tr><th>Thema</th><th>Kurzüberblick</th></tr></thead><tbody>' + rows.map(row =>
    '<tr><td>' + (row.link ? '<a href="' + escape(row.link) + '">' + escape(row.text) + '</a>' : escape(row.text)) +
    '</td><td>' + escape(row.description) + '</td></tr>').join('') + '</tbody></table>'
}
export function createSectionPrintLoader(section) {
  const menus = printNavigation()
  const entries = sectionPrintEntries(menus, section)
  const title = menus.sidebar[section][0].text
  const loader = createContentLoader(entries.map(entry => entry.path), {
    render: true,
    async transform(pages) {
      const byKey = new Map(pages.map(page => [canonicalArticle(page.url), page]))
      const articles = []
      for (const entry of entries) {
        const page = byKey.get(entry.key)
        if (!page?.html) throw new Error('Druckartikel fehlt: ' + entry.path)
        const title = page.frontmatter.title || page.html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<a\b[^>]*class="header-anchor"[\s\S]*?<\/a>/, '').replace(/<[^>]+>/g, '').trim() || entry.label
        let html = page.html.replace(/<img\b[^>]*?\bsrc="([^"]+)"/g, (all, src) => all.replace('src="' + src + '"', 'src="' + escape(printImageUrl(normalize(src),entry.path)) + '"'))
          .replace(/<NavigationOverview\b[^>]*\bpath="([^"]+)"[^>]*\/>/g, renderOverview)
          .replace(/<ImageCatalog\s*\/>/g, '<p>Die Bildsuche steht im <a href="/bilder/">Bilderkatalog</a> zur Verfügung.</p>')
        if (entry.key === '/hilfe/alle-artikel') {
          const { default: articleIndex } = await import('../hilfe/artikel.data.mjs')
          const index = await articleIndex.load()
          html = html.replace(/<p>\{\{ articles.length \}\}[\s\S]*?<\/p>/, '<p>'+index.length+' Seiten</p>')
            .replace(/<ol class="article-index">[\s\S]*?<\/ol>/, '<ol>'+index.map(article=>'<li><a href="'+escape(article.url)+'">'+escape(article.title)+'</a></li>').join('')+'</ol>')
        }
        articles.push({ ...entry, title, html })
      }
      return { title, articles }
    }
  })
  return { ...loader, watch: [...loader.watch, '.vitepress/navigation.json'], load() { return loader.load() } }
}
