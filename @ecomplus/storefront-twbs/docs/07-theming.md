# Theming

You may use Sass to create a custom theme, the easier way is just importing your own variables before `@ecomplus/storefront-twbs/scss/styles`:

```scss
@import "variables";
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

Take a look on [Bootstrap 4 variables](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) as reference.

If you're using plain CSS only, you can also overwrite [CSS vars](./05-vars.md) on `:root` and naturally overwrite default [components](./01-components.md) styles (it generates unnecessary stylesheets, not so good approach).
