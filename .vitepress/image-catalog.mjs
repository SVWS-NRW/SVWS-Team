import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, posix, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import project from './project.json' with { type: 'json' }

const root = fileURLToPath(new URL('../', import.meta.url))
const images = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i
const asUrl = path => '/' + path.split('/').map(encodeURIComponent).join('/')
const asPath = path => path.replaceAll('\\', '/')

function walk(dir) {
  const folder = join(root, dir)
  if (!existsSync(folder)) return []
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = posix.join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : entry.isFile() ? [path] : []
  })
}

function imageSource(url, article) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return null
  const file = decodeURIComponent(url.split(/[?#]/, 1)[0])
  if (!images.test(file)) return null
  const local = file.startsWith('/') ? file.slice(1) : posix.join(posix.dirname(article), file)
  if (walkRoots.has(local.split('/')[0]) && existsSync(join(root, local))) return local
  if (local.startsWith('bilder/bestand/')) {
    const original = local.slice('bilder/bestand/'.length)
    if (project.articleRoots.includes(original.split('/')[0]) && existsSync(join(root, original))) return original
  }
  if (local.startsWith('bilder/') && existsSync(join(root, 'public', local))) return 'public/' + local
  return null
}

const walkRoots = new Set(['public', ...project.articleRoots])
function publicImage(source) {
  return source.startsWith('public/') ? source.slice(7) : 'bilder/bestand/' + source
}

export function printImageUrl(url, article) {
  const source = imageSource(url, article)
  return source ? asUrl(publicImage(source)) : url
}

export function prepareImageCatalog() {
  const articleFiles = project.articleRoots.flatMap(walk).filter(path => path.endsWith('.md'))
  const referenced = new Map()
  for (const article of articleFiles) {
    const markdown = readFileSync(join(root, article), 'utf8')
    const title = (markdown.match(/^title:\s*(.+)$/m)?.[1] || markdown.match(/^#\s+(.+)$/m)?.[1] || basename(article, '.md')).replace(/^[\"']|[\"']$/g, '')
    const link = asUrl(article.replace(/index\.md$/, '').replace(/\.md$/, '.html'))
    const uses = [
      ...[...markdown.matchAll(/!\[([^\]]*)\]\(\s*<?([^)>]+)>?(?:\s+\"[^\"]*\")?\)/g)].map(match => [match[1], match[2]]),
      ...[...markdown.matchAll(/<img\b[^>]*?\bsrc=[\"']([^\"']+)[\"'][^>]*>/g)].map(match => [match[0].match(/\balt=[\"']([^\"']*)[\"']/)?.[1], match[1]])
    ]
    for (const [caption, raw] of uses) {
      const source = imageSource(raw.trim().replace(/\s+\"[^\"]*\"$/, ''), article)
      if (!source) continue
      const item = referenced.get(source) || { captions: new Set(), articles: new Map() }
      if (caption) item.captions.add(caption)
      item.articles.set(link, {title, link})
      referenced.set(source, item)
    }
  }
  const sources = new Set([...referenced.keys(), ...project.articleRoots.flatMap(walk).filter(path => images.test(path)), ...walk('public/bilder').filter(path => !path.startsWith('public/bilder/bestand/') && images.test(path))])
  // Existing article assets keep their source paths. The catalog and combined
  // print view need stable static URLs because both render links dynamically.
  const catalog = [...sources].sort((a,b)=>a.localeCompare(b,'de')).map(source => {
    const destination = publicImage(source)
    if (!source.startsWith('public/')) {
      const original = join(root, source)
      const target = join(root, 'public', destination)
      mkdirSync(dirname(target), {recursive:true})
      if (!existsSync(target) || statSync(original).mtimeMs > statSync(target).mtimeMs || statSync(original).size !== statSync(target).size) copyFileSync(original,target)
    }
    const uses = referenced.get(source)
    return {path:asUrl(destination), folder:asPath(relative('bilder',dirname(destination))).replace(/^bestand\//,''), original:basename(source), title:basename(source), captions:[...uses?.captions ?? []], articles:[...uses?.articles.values() ?? []]}
  })
  writeFileSync(join(root, '.vitepress/image-catalog.json'),JSON.stringify(catalog))
}
