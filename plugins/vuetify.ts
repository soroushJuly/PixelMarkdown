// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#333D45", // #333D45
            secondary: "#999EA2", // #999EA2
            placeholder: "#C2C5C7", // #C2C5C7
            borderColor: "#E0E2E3", // #E0E2E3
          }
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
