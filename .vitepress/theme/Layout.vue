<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { dataSymbol } from 'vitepress/dist/client/app/data.js'
import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'
import ArticlePrintIcon from './ArticlePrintIcon.vue'
import SiteFooter from './SiteFooter.vue'
import { articleIndexSelection } from './article-index-state'
import { data as articles } from '../../hilfe/artikel.data.mjs'
import { articleIndexLink } from '../article-index.mjs'

const data = useData()
const { page, theme, frontmatter } = data
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const indexMode = computed(() => page.value.relativePath === 'hilfe/alle-artikel.md' || (mounted.value && articleIndexSelection.value))
const indexHome = computed(() => indexMode.value && frontmatter.value.layout === 'home')
const helpSidebar = computed(() => theme.value.sidebar['/hilfe/'].map(group => ({
  ...group,
  items: group.items.map(item => item.link === '/hilfe/alle-artikel'
    ? { ...item, collapsed: false, items: articles.map(article => ({
      text: article.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      link: articleIndexLink(article.url)
    })) }
    : item)
})))
const position = computed(() => articles.findIndex(article =>
  decodeURI(article.url) === '/' + page.value.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '.html')
))
function adjacent(offset: number) {
  const article = position.value < 0 ? undefined : articles[position.value + offset]
  return article ? { text: article.title, link: articleIndexLink(article.url) } : false
}
const contextualNav = computed(() => theme.value.nav.map(item => ({
  ...item,
  activeMatch: indexMode.value ? (item.link === '/hilfe/' ? '^' : '(?!)') : item.activeMatch || '^' + item.link
})))
provide(dataSymbol, {
  ...data,
  theme: computed(() => ({
    ...theme.value,
    nav: contextualNav.value,
    ...(indexMode.value ? { sidebar: helpSidebar.value } : {})
  })),
  frontmatter: computed(() => indexMode.value ? {
    ...frontmatter.value,
    ...(indexHome.value ? { layout: 'doc', aside: false } : {}),
    prev: adjacent(-1), next: adjacent(1)
  } : frontmatter.value)
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <VPHome v-if="indexHome" />
      <ArticlePrintIcon v-if="!page.relativePath.startsWith('druck/')" :key="page.relativePath" />
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>
