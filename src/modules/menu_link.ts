export default class MenuLink {
  name: string;
  href: string;
  customClass: string;
  otherCustomClasses: string[];

  constructor(name: string, href: string, customClass: string, otherCustomClasses: string[]) {
    this.name = name;
    this.href = href;
    this.customClass = customClass;
    this.otherCustomClasses = otherCustomClasses || [];
  }

  create(): HTMLAnchorElement {
    const link: HTMLAnchorElement = document.createElement('a');
    link.className = this.customClass;
    link.textContent = this.name;
    link.href = this.href;

    if (this.otherCustomClasses.length) {
      this.otherCustomClasses.forEach((oCC: string) => {
        link.classList.add(oCC);
      });
    }

    return link;
  }
}
