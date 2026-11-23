---
title: Aktuelles – Druckansicht
search: false
outline: false
prev: false
next: false
---

<script setup>
import { data } from './aktuelles.data.mjs'
</script>

# Aktuelles – Druckansicht

<SectionPrintBook :articles="data.articles" :title="data.title" />
