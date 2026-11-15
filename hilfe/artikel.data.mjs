import { createContentLoader } from 'vitepress'
import project from '../.vitepress/project.json' with { type: 'json' }

const patterns = ['index.md', ...project.articleRoots.map(path => path + '/**/*.md')]
const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true })
export default createContentLoader(patterns, {
  includeSrc: true,
  transform(pages) {
    return pages.filter(page => !page.frontmatter.redirect && page.frontmatter.search !== false && !page.url.endsWith('/notes.html')).map(page => ({
      title: String(page.frontmatter.title || page.src?.match(/^#\s+(.+)$/m)?.[1] || page.frontmatter.hero?.name || 'Startseite').replace(/[*`]/g, ''),
      url: page.url
    })).sort((a, b) => collator.compare(a.title, b.title) || collator.compare(a.url, b.url))
  }
})
