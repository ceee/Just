import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import en_translations from './locales/en.json'
type en_messageSchema = typeof en_translations

const app = createApp(App)

app.use(createPinia())
app.use(createI18n<[en_messageSchema], 'en'>({
  locale: 'en',
  messages: {
    en: en_translations
  }
}));
app.use(router)

app.mount('#app')
