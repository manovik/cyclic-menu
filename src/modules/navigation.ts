import MenuLink from './menu_link';

type Link = string;

type MenuItem = {
  [name: string]: Link;
};

type MenuItems = {
  menuLinks: MenuItem;
  linkClass?: string;
  otherCustomLinkClassNames?: string[];
};

export default class Navigation {
  menuItemParams: string[];
  customNavClass: string;
  customULClass: string;
  customLIClass: string;
  menuLinks: MenuItems;
  customActiveClass: string;

  private defaultNavClass: string = 'nav';
  private defaultULClass: string = 'nav__list';
  private defaultLIClass: string = 'nav__item';
  private defaultMenuItems: MenuItems = {
    menuLinks: {
      Home: '#',
      About: '#',
      Contacts: '#',
      Design: '#',
      Shop: '#',
      Clients: '#',
      Carreer: '#',
      FAQ: '#',
      Buy: '#',
      Events: '#',
      Reviews: '#',
      Prodigy: '#',
    },
    linkClass: 'nav__link',
    otherCustomLinkClassNames: [],
  };

  constructor(
    menuLinks?: MenuItems,
    customNavClass?: string,
    customULClass?: string,
    customLIClass?: string,
    customActiveClass?: string
  ) {
    this.customNavClass = customNavClass ? customNavClass : this.defaultNavClass;
    this.customULClass = customULClass ? customULClass : this.defaultULClass;
    this.customLIClass = customLIClass ? customLIClass : this.defaultLIClass;
    this.customActiveClass = customActiveClass ? customActiveClass : 'active';
    this.menuLinks = menuLinks ? menuLinks : this.defaultMenuItems;
  }

  create(): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = this.customNavClass;
    const ul = document.createElement('ul');
    ul.className = this.customULClass;

    for (let key in this.menuLinks.menuLinks) {
      const mI: MenuItems = this.menuLinks;
      const li: HTMLLIElement = document.createElement('li');
      li.className = this.customLIClass;
      let additionalClassNames: string[] = [];
      if (mI.otherCustomLinkClassNames.length) {
        additionalClassNames = mI.otherCustomLinkClassNames;
      }
      li.append(new MenuLink(key, mI.menuLinks[key], mI.linkClass, additionalClassNames).create());
      ul.append(li);
      ul.children[0].classList.add(this.customActiveClass);
    }

    nav.append(ul);

    return nav;
  }
}
