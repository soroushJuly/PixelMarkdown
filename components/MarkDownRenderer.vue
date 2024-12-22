<template>
  <div>
    <h3 class="text-h6	text-primary pb-5">
      Rendered HTML
    </h3>
    <div v-html="renderedMarkdown" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import markdownit from 'markdown-it'
import markdownItConfig from '~/public/tools/markdown-it-config';

const props = defineProps(['content'])
const md = markdownit(markdownItConfig)

const renderedMarkdown = computed(() => {
  return md.render(props.content)
})
</script>
