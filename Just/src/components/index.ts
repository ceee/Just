import { type App } from 'vue';
import uiIcon from './ui-icon.vue';
import uiContextmenu from './ui-contextmenu.vue';
import uiContextmenuButton from './ui-contextmenu-button.vue';

export function createComponents (app: App)
{
  app.component('ui-icon', uiIcon);
  app.component('ui-contextmenu', uiContextmenu);
  app.component('ui-contextmenu-button', uiContextmenuButton);
}