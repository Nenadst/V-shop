import { generateGuid } from './utils';
import { modules } from './modules';

class App {
    constructor(modules) {
      this.module = {};

      this.initModules(modules);  
    }

    initModules(modules) {
      let moduleElements = document.querySelectorAll('[data-module]') || [];

      if( !moduleElements.length ) {
        console.warn('MISSING MODULES: No modules were defined on the page, please check your HTML');
        return this;
      }

      moduleElements.forEach(element => {
        const elementModule = element.getAttribute('data-module');

        modules.forEach(module => {
          if(module.name === elementModule) {
            this.module[`${module.name}-${generateGuid()}`] = new module.constructor(this, element);
          }
        }); 
      });
    }

    emitEvent({ name, payload }) {
      const event = new CustomEvent(name, {
        detail: payload,
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(event);
    }
}

const app = new App(modules);
export default app;

// for debugging
window.APP = app || {};
