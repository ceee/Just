import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createComponents } from '@/components'
import { createDirectives } from '@/utils/directives'

import './styles/styles.scss'
import App from './App.vue'
//import router from './router'
import en_translations from './locales/en.json'
const app = createApp(App)

createComponents(app)
createDirectives(app)
app.use(createPinia())
app.use(createI18n<[typeof en_translations], 'en'>({
  legacy: false,
  locale: 'en',
  messages: {
    en: en_translations
  }
}));
//app.use(router)

app.mount('#app')
