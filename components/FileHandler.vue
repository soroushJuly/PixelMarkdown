<template>
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
</template>

<script setup>
import fileUploadTypes from '~/public/file-upload-types'

// TODO: will be used to implement adding with URL of the files
const selectedFile = ref('')
const fileList = reactive([])
const uploadTypes = computed(() => fileUploadTypes)

// Prepare and send the files to server and wait for results
const handleFile = async (params) => {
  for (let i = 0; i < params.length; i++) {
    const file = await uploadFile(params[i])
    fileList.push(file)
  }
}

// Uploading simulation
const uploadFile = (file) => {
  return new Promise((resolve) => {
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

// TODO: using state manager could have been better
const AddMarkup = (markup) => {
  emit('update:content', markup)
  closeModal()
}
</script>
