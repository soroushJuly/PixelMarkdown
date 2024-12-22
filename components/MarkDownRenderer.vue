<template>
    <div>
        <h3 class="text-h6	text-primary pb-5">Rendered HTML</h3>
        <div v-html="markdown.render(props.content)" />
    </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { defineProps } from 'vue';

const props = defineProps(['content'])
const markdown = new MarkdownIt()

</script>
