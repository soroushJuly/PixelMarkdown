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
        <v-list>
          <v-list-item
            v-for="(type, i) in uploadTypes"
            :key="'file type-'+i"
          >
            <p>
              Add {{ type.name }}:
            </p>
            <v-file-input
              multiple
              :label="`${type.name} Upload`"
              :accept="type.inputFromat"
              @update:model-value="handleFile"
            />
            <v-btn @click="AddMarkup(type.markup(selectedFile))">
              Add
            </v-btn>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item
            v-for="(item, i) in fileList"
            :key="'file-'+i"
          >
            {{ item.name }}
          </v-list-item>
        </v-list>
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
import { defineProps, defineEmits, watch, ref, reactive } from 'vue'

const uploadTypes = [
  { name: 'image', inputFromat: 'image/*', markup: url => `\n[img="${url}"]` },
  { name: 'video', inputFromat: '', markup: url => `\n[video="${url}"]` },
  { name: 'file', inputFromat: '', markup: url => `\n[file="${url}"]` },
]

// TODO: will be used to implement adding with URL of the files
const selectedFile = ref('')
const fileList = reactive([])

// Uploading simulation
const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    // Emulate server upload
    setTimeout(() => {
      resolve({
        url: `https://examplar.com/${file.name}`,
        type: file.type,
        size: file.size,
        name: file.name,
      })
    }, 2000)
  },
  )
}

const handleFile = async (params) => {
  for (let i = 0; i < params.length; i++) {
    const file = await uploadFile(params[i])
    fileList.push(file)
  }
}

const AddMarkup = (markup) => {
  emit('update:content', markup)
  closeModal()
}

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['update:show', 'update:content'])

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
