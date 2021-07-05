import Navigation from './modules/navigation';
import Slider from './extentions/slider/slider';
import { bodyBGChanger } from './extentions/body/bodyBGChanger';
import './assets/styles/global.scss'; // add global styles
import './assets/styles/_custom_styles.scss'; // add your custom styles

type MenuItems = {
  [prop: string]: string;
};

const menuItems: MenuItems = {
  Dome: '#',
  Rome: '#',
  Home: '#',
  Herty: '#',
  Qwerty: '#',
  // Lessy: '#',
  // Messy: '#',
  // Prodigy: '#',
  // Linkin: '#',
  // Park: '#',
  // Mark: '#',
  // Ruffalo: '#',
  // Dome1: '#',
  // Rome1: '#',
  // Home1: '#',
  // Herty1: '#',
  // Qwerty1: '#',
  // Lessy1: '#',
  // Messy1: '#',
  // Prodigy1: '#',
  // Linkin1: '#',
  // Park1: '#',
  // Mark1: '#',
  // Ruffalo1: '#',
  // Ruffalo2: '#',
};

// Initializing Navigation

const menu = new Navigation(
  {
    menuLinks: menuItems,
    linkClass: 'navigation__link',
    otherCustomLinkClassNames: [],
  },
  'navigation',
  'navigation__list',
  'navigation__item',
  'activated'
);

const root = document.createElement('div') as HTMLDivElement;
root.id = 'root';
root.append(menu.create());

document.body.append(root);

// Initializing Slider

new Slider('.navigation', '.navigation__list', '.navigation__item', 'activated', 5).init();

// Just fun

bodyBGChanger();
