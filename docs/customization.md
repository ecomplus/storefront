# Customization :pencil:

It is faster to make changes and customizations. Through a configuration page it is possible to define:

+ General settings such as: Contact, address, logo;
+ Choose Colors with your store's identity;
+ Organize your page: choosing how the layout and organization of your screen will be;
+ Configure the extra pages: delivery conditions, payment methods, exchanges and returns;
+ An instructive and simple tool that makes it possible to define the header, side menu, footer, among others;
+ Possibility to include settings directly with `HTML`,` JS` and `CSS` code;

## Build pages within CMS

Access the administrative part of your website at `https://yourdomain.com/admin/`.
The options to be modified are at your fingertips on the left side of the screen.
See below:

<img src="/assets/img/doc_customization1.png" alt="CMS">

### Configuration :wrench:

Here's how to set up and where changes will be affected on your website:

**Change colors, themes in a simple way and keep your store's identity:**

<img src="/assets/img/doc_customization2.png" alt="CMS">

**Define colors:**

<img src="/assets/img/doc_customization3.png" alt="CMS">

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

+ Considering your deploy was generated from [Storefront Starter](https://github.com/ecomplus/storefront-starter), we recommend one of the following ways to edit lot of CSS code (SCSS) directly from GitHub or locally on your preferred code editor:

1. Change directly in the code at:
`/ template / scss / custom-css / _styles.scss`

2. To override some variables, you can also access `/ template / scss / _variables.scss` and change the variables directly. For example, change the button as shown below:
put button

3. You can edit `main.scss` if you don't want to import entire [Storefront Template styles](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss), for example to make your own footer styles and prevent importing those ones from our default template.

This way, you are reducing useless css codes.

## Edit pre-rendered views

> TODO

### Note for product page and cards

> About slots

## Additional scripts

> TODO

## Replace Vue components

> TODO
