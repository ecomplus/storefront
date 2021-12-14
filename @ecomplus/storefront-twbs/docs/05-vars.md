# CSS vars

We're replacing default Bootstrap CSS utilities approach with [CSS vars](https://developer.mozilla.org/docs/Web/CSS/var) approach, it provides a lighter and more flexible theme.

Beyond the default ones, more CSS vars are set on `:root` (brands colors, borders, text, spacing...) to be used by Storefront components and widgets, as example:

```css
:root {
  --bs-body-bg: #fff;
  --bs-body-color: #212529;
  --bs-blue: #007bff;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #e83e8c;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #28a745;
  --bs-teal: #20c997;
  --bs-cyan: #17a2b8;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #e83e8c;
  --bs-primary-yiq: #fff;
  --bs-primary-rgb: 232,62,140;
  --bs-secondary: #333;
  --bs-secondary-yiq: #fff;
  --bs-secondary-rgb: 51,51,51;
  --bs-success: #28a745;
  --bs-success-yiq: #fff;
  --bs-success-rgb: 40,167,69;
  --bs-info: #17a2b8;
  --bs-info-yiq: #fff;
  --bs-info-rgb: 23,162,184;
  --bs-warning: #ffc107;
  --bs-warning-yiq: #212529;
  --bs-warning-rgb: 255,193,7;
  --bs-danger: #dc3545;
  --bs-danger-yiq: #fff;
  --bs-danger-rgb: 220,53,69;
  --bs-light: #f8f9fa;
  --bs-light-yiq: #212529;
  --bs-light-rgb: 248,249,250;
  --bs-dark: #343a40;
  --bs-dark-yiq: #fff;
  --bs-dark-rgb: 52,58,64;
  --bs-primary-lightest: #fad4e6;
  --bs-primary-lightest-yiq: #212529;
  --bs-primary-lightest-rgb: 249.92083,212.37917,229.60417;
  --bs-primary-lighter: #f39ec5;
  --bs-primary-lighter-yiq: #212529;
  --bs-primary-lighter-rgb: 243.40417,157.69583,197.02083;
  --bs-primary-light: #ed6ca7;
  --bs-primary-light-yiq: #212529;
  --bs-primary-light-rgb: 237.43056,107.56944,167.15278;
  --bs-secondary-lightest: #878787;
  --bs-secondary-lightest-yiq: #fff;
  --bs-secondary-lightest-rgb: 135.15,135.15,135.15;
  --bs-secondary-lighter: #696969;
  --bs-secondary-lighter-yiq: #fff;
  --bs-secondary-lighter-rgb: 104.55,104.55,104.55;
  --bs-secondary-light: #4d4d4d;
  --bs-secondary-light-yiq: #fff;
  --bs-secondary-light-rgb: 76.5,76.5,76.5;
  --bs-breakpoint-xs: 0;
  --bs-breakpoint-sm: 576px;
  --bs-breakpoint-md: 768px;
  --bs-breakpoint-lg: 992px;
  --bs-breakpoint-xl: 1200px;
  --bs-border-width: 1px;
  --bs-border-color: #dee2e6;
  --bs-border-radius-sm: 0.2rem;
  --bs-border-radius: 0.25rem;
  --bs-border-radius-lg: 0.3rem;
  --bs-rounded-pill: 50rem;
  --bs-box-shadow-sm: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
  --bs-box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  --bs-box-shadow-lg: 0 1rem 3rem rgba(0,0,0,0.175);
  --bs-spacer-1: 0.25rem;
  --bs-spacer-2: 0.5rem;
  --bs-spacer-3: 1rem;
  --bs-spacer-4: 1.5rem;
  --bs-spacer-5: 3rem;
  --bs-text-muted: #6c757d;
  --bs-font-light: 300;
  --bs-font-normal: 400;
  --bs-font-bold: 700;
  --bs-line-height: 1.5;
  --bs-line-height-lg: 1.5;
  --bs-line-height-sm: 1.2;
  --bs-font-size: 1rem;
  --bs-font-size-lg: 1.25rem;
  --bs-font-size-sm: 0.875rem;
  --bs-h1: 2.5rem;
  --bs-h2: 2rem;
  --bs-h3: 1.75rem;
  --bs-h4: 1.5rem;
  --bs-h5: 1.25rem;
  --bs-h6: 1rem;
  --bs-font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --bs-font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
```

Try to use it whenever possible (specially for colors) to respect the store's identity and make your styles easily customizable and extensible.

## Usage example

```css
.btn-orange {
  background-color: var(--orange);
  color: var(--white);
}
```

```html
<button class="btn btn-orange">
  Orange button
</button>
```

<div class="demo">
  <button class="btn btn-orange">
    Orange button
  </button>
</div>

<style>
  .demo .btn-orange {
    background-color: var(--orange);
    color: var(--white);
  }
</style>
