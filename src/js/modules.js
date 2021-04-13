import Accordion from './modules/accordion';
import Slider from './modules/slider';
import Header from './modules/header';

// name of a module must be present in the DOM in order for it to be initialized
export const modules = [
  {
    name: 'ACCORDION',
    constructor: Accordion
  },
  {
    name: 'SLIDER',
    constructor: Slider
  },
  {
    name: 'HEADER',
    constructor: Header
  }
];
