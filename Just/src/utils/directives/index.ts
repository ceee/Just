import { type App } from 'vue';
import clickOutside from './v-click-outside';

export function createDirectives (app: App)
{
  app.directive('click-outside', clickOutside);
}