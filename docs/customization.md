# Customization :pencil:

[:brazil: Tradução em português](./customizando.md)

> Here we're considering you already heave a deploy created from
[Storefront Starter](https://github.com/ecomplus/storefront-starter) and using our default
`@ecomplus/storefront-template`. If you're an E-Com Plus merchant, we did it for you :wink:

There are several ways to customize Storefront:

- [Compose pages through CMS](#build-pages-within-cms) (the easier way);
- [Theme/overwrite styles](#theme-overwrite-styles);
- [Editing some EJS (HTML) code from default template](#edit-pre-rendered-views);
- [Add/import custom JavaScript](#additional-scripts);
- [Replacing default scripts and Vue components with Webpack aliases](#replace-vue-components) (PRO :metal:);

Before starting, it might be useful to run your Storefront deploy on _localhost_:
  1. Make sure [Node.js](https://nodejs.org/en/) is installed;
  2. Clone your GitHub repo;
  3. Install npm dependencies;
  4. Run serve script;

```bash
git clone https://github.com/ecomplus-stores/my-store
cd my-store
npm i
npm run serve
```

## Build pages within CMS

Access the administrative part (powered by [Netlify CMS](https://www.netlifycms.org/) :heart:)
of your Storefront deploy at `https://yourdomain.com/admin/`, after login you'll be able to:

+ Edit general info and settings such as contact, address and logo:

<div class="demo">
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/storefront/assets/img/doc_customization1.png" alt="CMS">
      </div>
      <div class="col">
        <img src="/assets/img/doc_customization2.png" alt="CMS">
      </div>
    </div>
  </div>
</div>

+ Set your store's identity colors:

<img src="/storefront/assets/img/doc_customization3.png" alt="CMS" style="max-height: 180px">

+ Organize all pages adding, moving or removing sections (drag and drop):

<img src="/storefront/assets/img/doc_customization.gif" alt="CMS" style="max-height: 240px">

+ Add extra HTML, JS or CSS code for each page or entire site:

<div class="demo">
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/storefront/assets/img/doc_customization4.png" alt="CMS">
      </div>
      <div class="col">
        <img src="/storefront/assets/img/doc_customization5.png" alt="CMS">
      </div>
    </div>
  </div>
</div>

+ Create or edit extra pages and blog posts;
+ Plug and customize additional widgets;

## Theme/overwrite styles

We're using `@ecomplus/storefront-twbs`
(based on [Bootstrap 4](https://getbootstrap.com/docs/4.5/)) as CSS/JS foundation,
for details check the [base UI reference here](../@ecomplus/storefront-twbs/).
You may also check most important and maintained template
[elements selectors](../@ecomplus/storefront-template/docs/01-elements.md).

- If you just want to add few CSS, do it in the CMS at _Layout > Insert code > Custom CSS_;
- If you're planning to make deeper changes, we recommend to edit SCSS files
(you can use [Sass](https://sass-lang.com/) or just plain CSS) directly from GitHub
or locally using your preferred code editor:
    1. Add new or overwrite styles at
    `/template/scss/custom-css/_styles.scss`;
    2. To replace default template styles you can try setting
    [Bootstrap SCSS variables](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)
    at `/template/scss/_variables.scss`;
    3. Finally, you can also start from scratch editing
    `/template/scss/_main.scss` if you don't want to import entire
    [Storefront Template styles](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss),
    for example to make your own footer styles and prevent
    importing those ones from our default template
    (perf optim :rocket:, not so easy as the previous options);

::: tip
We also encourage to use
[CSS vars](../@ecomplus/storefront-twbs/docs/05-vars.md)
always then possible to make your additional code easily customizable and extensible.
:::

::: details Example using CSS vars
```css
.top-bar {
  background-color: var(--secondary);
}
```
<img src="/storefront/assets/img/doc_customization9.png" alt="CMS" style="max-height: 180px">
:::

As example you can also check custom SCSS applied
by some of our additional themes, such as
[Clean Gray](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss/themes/clean-gray)
and [Niche Baby](https://github.com/ecomplus/storefront/blob/master/%40ecomplus/storefront-template/template/scss/themes/niche-baby/_variables.scss).

## Edit pre-rendered views

In the CMS it's possible to include additional HTML snippets,
but to edit default views you should edit
[EJS](https://ejs.co/) files at `/template/pages/` folder:

+ `/template/pages/@/meta.ejs` to customize meta tags
(specially for SEO purposes):

<img src="/storefront/assets/img/doc_customization8.png" alt="CMS" width="400">

+ `/template/pages/@/sections/` to get lot of reusable components :pushpin:,
those ones renders the pages main content and are used on the CMS drag and drop tool:

<img src="/storefront/assets/img/doc_customization7.png" alt="CMS" width="400">

+ `/template/pages/@/layout/` to edit common layout organisms
(footer, header, menu);
+ `/template/pages/@/app/` to edit cart/checkout specific view;

Before start editing HTML, it should be useful to check the
[components](../@ecomplus/storefront-twbs/docs/01-components.md) and
CSS utility classes available by default.

::: tip
EJS is a simple JS based template language to generate HTML markup,
of course you can just write plain HTML, but for advanced customization
we recommend to check how Storefront
[renderization](../@ecomplus/storefront-framework/docs/01-renderization.md)
works with EJS.
:::

> To keep customized stores up to date we still trying to update
edited EJS files on new Storefront releases, preserving the edited snippets
but updating the non-changed parts by checking Git diff :sunglasses:

### Note for product cards

Some pre-rendered HTML elements are overwritten with JS on client by the
respective Vue components, it happens specially with product cards pre-rendered by
`/template/pages/@/sections/inc/product-item.ejs`.

In those cases you should use `data-slot` attribute to preserve your custom code
after hydration, for example:

```html
<div data-slot="buy-button-content">
  <i class="fas fa-shopping-bag mr-1"></i>
  Buy now
</div>
```

The `data-slot` value must correspond to a
[slot](https://vuejs.org/v2/guide/components-slots.html) name
of the Vue component, check
[`<ProductCard>` slots here](../@ecomplus/storefront-components/docs/ProductCard.md#slots).

::: tip PRO TIP
If you need deeper customization, consider creating an Webpack alias to
`./html/ProductCard.html` (check [replacing Vue components](#replace-vue-components)).
:::

> **You don't need to know Vue.js to customize Storefront**,
Vue is awesome and really easy to learn, for advanced customization it'll give you
lot of productivity, but it's not required at all :v:

## Additional scripts

By default you can use jQuery 3 (slim), Vue.js 2 and some other
small libraries globally available, for details check
[base UI included JS](../@ecomplus/storefront-twbs/docs/06-javascript.md) and
[template JS globals](../@ecomplus/storefront-template/docs/05-javascript.md).

- If you just want to add few JS, do it in the CMS at _Layout > Insert code_
adding `<script>` tags before `/body` or (when really needed) `/head`,
you can also add scripts to specific pages using _HTML code_ section;
- If you're planning to add lot of JS (or ES) code, it's strongly recommended to
edit JS files at `/template/js/custom-js/` folder directly from GitHub or locally using your preferred code editor. You can also create new files and
[import](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) properly;

::: tip
When editing `/template/js/` files you can use ES6 features without worrying about
browser support, code there will be parsed and minified.
:::

## Replace Vue components

::: warning
Use it with moderation and only when really needed, skip using for things other
then explained below, specially if you don't know Webpack very well.
:::

When easier ways aren't sufficient to make your wanted customization,
you can give a try with
[Webpack 4 aliases](https://webpack.js.org/configuration/resolve/#resolvealias).

Generally we recommend to use it only for replacing Vue components
HTML template :triangular_ruler:, although it would work also for scripts and styles.

You should start getting the original source from
[GitHub repo](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-components/src/html),
copy the file you want to replace and paste it inside
`/template/js/custom-js/` folder, edit the new file as needed and then create
a `storefront.webpack.js` file at the root of your repository, as example:

```js
// storefront.webpack.js

const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/ProductCard.html': path.resolve(__dirname, '/template/js/custom-js/html/ProductCard.html')
    }
  }
})
```

> Note that all [Storefront components](../@ecomplus/storefront-components/) are
composed by 4 files (Vue/HTML/JS/SCSS), the Vue file always imports the
HTML one with `./html/{ComponentName}.html`.
