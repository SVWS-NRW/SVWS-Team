<script setup lang="ts">
import { onMounted } from 'vue'
import { withBase } from 'vitepress'
const props = defineProps<{ to: string }>()
onMounted(() => {
  const target = new URL(withBase(props.to), window.location.origin)
  if (!target.hash) target.hash = window.location.hash
  target.search = window.location.search
  window.location.replace(target.href)
})
</script>

<template>
  <p>Der Inhalt wurde zusammengeführt.
    <a :href="withBase(to)">Zum passenden Kapitel</a>.
  </p>
</template>
