---
title: Aktuelles – Druckansicht
search: false
outline: false
prev: false
next: false
---

<script setup>
import { data } from './wissen-links.data.mjs'
</script>

# Aktuelles – Druckansicht

<SectionPrintBook :articles="data.articles" :title="data.title" />
