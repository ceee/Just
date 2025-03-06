import { type App } from 'vue';
import uiIcon from './ui-icon.vue';

export function createComponents (app: App)
{
  app.component('ui-icon', uiIcon);
}