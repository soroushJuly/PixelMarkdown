<template>
  <div class="border-sm text-secondary rounded px-4">
    <div class="py-2">
      headerd
    </div>
    <v-divider />
    <div class="text-placeholder pb-4">
      <v-container class="pa-0 text-primary" fluid>
        <v-textarea
          v-model="markdownContent"
          placeholder="Placeholder"
          variant="plain"
          rows="28"
          style="style"
          @update:model-value="handleChange"
        />
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import sampleMarkdown from '~/public/default-markdown';

const emit = defineEmits(['newMarkdown'])

const markdownContent = ref(sampleMarkdown)

const handleChange = ((event) => {
  emit('newMarkdown', event)
})

// Render the sample on setup (initialization)
handleChange(markdownContent.value)
</script>

