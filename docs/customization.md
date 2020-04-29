# Customization :pencil:

How Storefront V2 may be customized (from easier to harder) and TODOs:

Insert `HTML`, `JS` and `CSS` with specified files predefined at Storefront Starter:

Split views in new partials to make possible to insert HTML in more (any) places;

Update Storefront Starter pages with new insert partials and respective imports;

Edit prerendered `HTML` through `EJS` or dynamically update `DOM` with custom `JS` (can use `jQuery`):

Template EJS components may have predefined places for additional HTML;
Vue components must have slots to support most common additional HTML cases;
Widgets must try to keep custom prerendered HTML, preferably trough respective component slots;

Use Webpack aliases on `storefront.webpack.js` to make deeper edits on Vue component parts (`HTML`, `JS` or `SCSS`);

## Build pages within CMS

Access the administrative part of your website by adding `/ admin`.
The options to be modified are at your fingertips on the left side of the screen.
See below:

<img src="/assets/img/doc_customization1.png" alt="...">

### Configuration :wrench:

Here's how to set up and where changes will be affected on your website:

**Change colors, themes in a simple way and keep your store's identity:**

<img src="/assets/img/doc_customization2.png" alt="...">

**Define colors:**

<img src="/assets/img/doc_customization3.png" alt="...">

Build the `header`,` footer` maintaining the identity of your store.

Configure for example:
+ Header;
+ Sidebar;
+ Footer;
+ Session with customized `html` code;
+ Extra pages;

_____
Page Builder: Remove block from the page, add code and organize the page as you prefer.
_____

### See below how to organize the session:

Easily organize the layout of the sessions by dragging with the mouse according to the order you want to display on the screen.

<img src="/assets/img/doc_customization.gif" alt="...">

### Personalize by entering html codes.

Enter html codes using CMS. Easily creating an identity for your store:

<img src="/assets/img/doc_customization4.png" alt="...">

## Theme/overwrite styles

Include css code to customize your site.

+ If you want to add a few style sheets, change in the CMS at:

`Layout> Insert code` (as example):

<img src="/assets/img/doc_customization5.png" alt="...">

+ If you want to change many style sheets, there are a few options:

1. Change directly in the code at:
`/ template / scss / custom-css / _styles.scss`

2. To override some variables, you can also access `/ template / scss / _variables.scss` and change the variables directly. For example, change the button as shown below:
put button

3. you can edit main.scss. All scss are imported from the storefront template. You can remove the css that you don't want to use and for example make your own footer.

This way, you are reducing useless css codes.

## Edit pre-rendered views

> TODO

## Additional scripts

> TODO

## Replace Vue components

> TODO
