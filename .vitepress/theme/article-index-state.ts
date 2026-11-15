import { ref } from 'vue'

export const articleIndexSelection = ref(false)

export function updateArticleIndexSelection(href: string) {
  articleIndexSelection.value = new URL(href, 'https://local.invalid').searchParams.get('artikel') === 'az'
}
