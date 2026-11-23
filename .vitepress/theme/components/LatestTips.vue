<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <table class="latest-tips" v-if="frontmatter.latestTips?.length">
    <thead><tr><th>Veröffentlicht</th><th>Hinweis</th></tr></thead>
    <tbody>
      <tr v-for="tip in frontmatter.latestTips" :key="tip.link">
        <td><span class="tip-date">{{ tip.date }}</span><span class="tip-product">{{ tip.product }}</span></td>
        <td><a :href="withBase(tip.link)">{{ tip.title }}</a></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.tip-date { white-space: nowrap; }
.tip-product { display: block; font-size: 0.85em; color: var(--vp-c-text-2); }
</style>
