<template>
  <div class="border-sm text-secondary rounded px-4 py-2">
    <ModalMediaMarkup
      v-model:show="isModalVisible"
      @update:content="AppendContent"
    />
    <v-btn
      v-for="(control, i) in controlsList"
      :key="'control-'+i"
      variant="text"
      class="pr-4 pb-2"
      @click="handleControl(control.action)"
    >
      {{ control.name }}
    </v-btn>
    <v-divider />
    <v-container
      class="pa-0 text-primary"
      fluid
    >
      <v-textarea
        v-model="markdownContent"
        placeholder="Placeholder"
        variant="plain"
        rows="28"
        @update:model-value="handleChange"
      />
    </v-container>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import sampleMarkdown from '~/public/default-markdown'
import CreateSpecialTags from '~/public/tools/create-special-tags'

const emit = defineEmits(['newMarkdown'])
const markdownContent = ref(sampleMarkdown)
const isModalVisible = ref(false)

// Notify when editor centent has changed
const handleChange = (event) => {
  const specializedMarkdown = CreateSpecialTags(event)
  emit('newMarkdown', specializedMarkdown)
}

// Add new content at the end of the markdown content
const AppendContent = (content) => {
  markdownContent.value += content
  handleChange(markdownContent.value)
}

// Render the sample on setup (initialization)
handleChange(markdownContent.value)
// Handle controls based on the action defined for them
const handleControl = (action) => {
  if (action) action()
}

const openModal = () => {
  isModalVisible.value = true
}
const controlsList = [
  { name: 'Image', action: () => { openModal() } },
  { name: 'Video', action: () => { openModal() } },
  { name: 'Link', action: () => '' },
  { name: 'File', action: () => { openModal() } },
  { name: '2 columns', action: () => '' },
  { name: 'Table', action: () => '' },
  { name: 'Table Row', action: () => '' },
]
</script>
