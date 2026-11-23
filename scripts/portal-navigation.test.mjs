import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import navigation from '../.vitepress/navigation.json' with { type: 'json' }
import { flatten, sectionFor, sidebarFor } from '../.vitepress/navigation.mjs'

test('Jeder Menüartikel bleibt in seiner Rubrik und öffnet seinen Themenzweig', () => {
  for (const [section, groups] of Object.entries(navigation.sections)) {
    for (const item of flatten(groups)) {
      if (!item.link) continue
      assert.equal(sectionFor(navigation, item.link), section, item.link)
      const sidebar = sidebarFor(navigation, item.link)
      assert.equal(sidebar[0].text, navigation.sectionLabels[section])
      if (item.items?.length) {
        assert.equal(flatten(sidebar).find(entry => entry.link === item.link).collapsed, false, item.link)
      }
    }
  }
})

test('Zusammengeführte Einstiege zeigen auf einen vorhandenen Artikel ohne Weiterleitungskette', () => {
  for (const file of ['beratung/arbeitsplatz.md', 'umgebungen/index.md', 'umgebungen/auswahl.md', 'beratung/probleme.md', 'moderation/durchfuehren.md', 'moderation/nachbereiten.md']) {
    const source = readFileSync(new URL('../' + file, import.meta.url), 'utf8')
    const target = source.match(/^redirect: (.+)$/m)?.[1]
    assert(target, file)
    const targetPath = target.split('#')[0]
    const targetFile = targetPath.endsWith('/') ? targetPath + 'index.md' : targetPath + '.md'
    const destination = readFileSync(new URL('..' + targetFile, import.meta.url), 'utf8')
    assert(!/^redirect:/m.test(destination), target)
    assert.match(source, /search: false/)
  }
})
