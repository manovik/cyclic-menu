# Cyclic-menu

To install app you need:

1. Save `cyclic-menu` folder on your computer
2. Go to folder `cyclic-menu` and open Command Prompt there. Or open folder `cyclic-menu` in your IDE and use it's Console.
3. To install dependencies print `npm i` in Console.
4. After installing dependencies run app with `npm run serve`.
5. The application will become available on port `9000`.

###### To initialize cyclic menu you need to make two steps

1. initialize class Navigation, which would create next template:
`nav > ul > li * elements_count > a`

2. initialize class Slider, to navigate by menu items.
---
#### Initializing Navigation

Go to `cyclic-menu > src > index.ts`

1. The first argument sets link options. It should be an object with 3 keys:
  * `menuLinks`
  * `linkClass`
  * `otherCustomLinkClassNames`
###
 `menuLinks` should contain `key` - your link name and `value` - link itself. For Example:
```js
{
  menuLinks: {
    Home: '/',
    Contacts: '/contacts',
    Google: 'https://googe.com',
    Empty: '#',
    ...
```
###
- `linkClass` is a *string* parameter - className of your link
###
- `otherCustomLinkClassNames` is an *array of strings* - other classes, you might want to add. Pass there empty array, if you don't want to add any other classes. Like this `otherCustomLinkClassNames: []`

2. The second argument is a *string* parameter - `<nav></nav>` element className
3. The third argument is a *string* parameter - `<ul></ul>` element className
4. The fourth argument is a *string* parameter - `<li></li>` element className
5. The fifth argument is a *string* parameter - is an active className for `<li></li>`

Your final initialization is going to look like:

```js
const menu = new Navigation(
  {
    menuLinks: {
      Home: '/',
      Contacts: '/contacts',
      Google: 'https://googe.com',
      Empty: '#',
      ...
    },
    linkClass: 'navigation__link', // className of your link
    otherCustomLinkClassNames: [],
  },
  'navigation', // <nav></nav> element className
  'navigation__list', // <ul></ul> element className
  'navigation__item', // <li></li> element className
  'activated' // active className for <li></li>
);
```

After initialization call `Navigation.create()` method and append it's result into your `root` element.

#### Initializing Slider

To initialize slider you need to pass 5 arguments, which are pretty similar to Navigation initialization:

Arguments:
1. a *string* - `<nav></nav>` element className
2. a *string* - `<ul></ul>` element className
   * it will be wrapped to create a track for items
3. a *string* - `<li></li>` element className
   * it will be used for navigation by left/right arrows on your keyboard
4. a *string* - is an active className for `<li></li>`
5. a *number* - count of visible menu items on your screen

Hope you'll enjoy using it.
