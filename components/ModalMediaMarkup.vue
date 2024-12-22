<template>
  <v-dialog
    v-model="localShow"
    width="80%"
    min-width="250"
  >
    <v-card
      title="Select and upload the content"
    >
      <v-card-item>
        List of available options:
      </v-card-item>
      <v-card-text>
        <FileHandler @update:content="AddMarkup" />
      </v-card-text>
      <template #actions>
        <v-btn
          class="ms-auto"
          text="Close"
          @click="closeModal"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['update:show', 'update:content'])

const AddMarkup = (markup) => {
  emit('update:content', markup)
  closeModal()
}

// Local copy of show prop
const localShow = ref(props.show)

// Watch the `show` prop and update the local state
watch(() => props.show, (newValue) => {
  localShow.value = newValue
})

// Emit an update on show change
watch(localShow, (newValue) => {
  emit('update:show', newValue)
})

function closeModal() {
  localShow.value = false
}
</script>
