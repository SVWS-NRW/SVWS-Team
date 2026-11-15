import { defineAsyncComponent } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { updateArticleIndexSelection } from './article-index-state';
import { installPrintLayout } from './print.mjs';
import SectionCards from './components/SectionCards.vue';
import NavigationOverview from './components/NavigationOverview.vue';
import DatabaseRedirect from './components/DatabaseRedirect.vue';
import LatestTips from './components/LatestTips.vue';
import type { Theme } from 'vitepress';
import './print.css';
import './style.css';
import './accents.css';
import './palette.css';
import './project.css';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('SectionPrintBook', defineAsyncComponent(() => import('./SectionPrintBook.vue')))
    app.component('ImageCatalog', defineAsyncComponent(() => import('./ImageCatalog.vue')))
    app.component('SectionCards', SectionCards)
    app.component('NavigationOverview', NavigationOverview)
    app.component('LatestTips', LatestTips)
    app.component('DatabaseRedirect', DatabaseRedirect)
    if (typeof window === 'undefined') return
    const disposePrintLayout = installPrintLayout()
    import.meta.hot?.dispose(disposePrintLayout)
    updateArticleIndexSelection(window.location.href)
    const previous = router.onAfterRouteChanged
    router.onAfterRouteChanged = async (to) => {
      await previous?.(to)
      updateArticleIndexSelection(to)
    }
  }
} satisfies Theme
