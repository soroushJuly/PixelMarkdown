<template>
  <div>
    <v-app>
      <v-main class="">
        <v-container>
          <p class="text-h6	text-primary pb-5">
            Content
          </p>
          <MarkDownEditor @new-markdown="UpdateMarkdownContent" />
          <MarkDownRenderer :content="markdownContent" />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
const markdownContent = ref('')

const UpdateMarkdownContent = (e) => {
  markdownContent.value = e
}
</script>
