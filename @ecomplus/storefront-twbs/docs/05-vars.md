# CSS vars

We're replacing default Bootstrap CSS utilities approach with [CSS vars](https://developer.mozilla.org/docs/Web/CSS/var) approach, it provides a lighter and more flexible theme.

Beyond the default ones, more CSS vars are set on `:root` (brands colors, borders, text, spacing...) to be used by Storefront components and widgets, as example:

```css
:root {
  --body-bg: #fff;
  --body-color: #212529;
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #e83e8c;
  --primary-yiq: #fff;
  --primary-rgb: 232, 62, 140;
  --secondary: #333333;
  --secondary-yiq: #fff;
  --secondary-rgb: 51, 51, 51;
  --success: #28a745;
  --success-yiq: #fff;
  --success-rgb: 40, 167, 69;
  --info: #17a2b8;
  --info-yiq: #fff;
  --info-rgb: 23, 162, 184;
  --warning: #ffc107;
  --warning-yiq: #212529;
  --warning-rgb: 255, 193, 7;
  --danger: #dc3545;
  --danger-yiq: #fff;
  --danger-rgb: 220, 53, 69;
  --light: #f8f9fa;
  --light-yiq: #212529;
  --light-rgb: 248, 249, 250;
  --dark: #343a40;
  --dark-yiq: #fff;
  --dark-rgb: 52, 58, 64;
  --primary-whiter: white;
  --primary-white: white;
  --primary-lightest: #fad4e6;
  --primary-lightest-rgb: 250, 212, 230;
  --primary-lightest-yiq: #212529;
  --primary-lighter: #f39ec5;
  --primary-lighter-rgb: 243, 158, 197;
  --primary-lighter-yiq: #212529;
  --primary-light: #ed6ca7;
  --primary-light-rgb: 237, 108, 167;
  --primary-light-yiq: #212529;
  --primary-lighten: #ec5e9f;
  --primary-lighten-rgb: 236, 94, 159;
  --primary-lighten-yiq: #fff;
  --primary-darken: #e21b76;
  --primary-darken-rgb: 226, 27, 118;
  --primary-darken-yiq: #fff;
  --primary-dark: #d91a72;
  --primary-dark-rgb: 217, 26, 114;
  --primary-dark-yiq: #fff;
  --primary-darker: #cb186a;
  --primary-darker-rgb: 203, 24, 106;
  --primary-darker-yiq: #fff;
  --primary-darkest: #be1763;
  --primary-darkest-rgb: 190, 23, 99;
  --primary-darkest-yiq: #fff;
  --primary-black: #230412;
  --secondary-whiter: #f2f2f2;
  --secondary-white: #b3b3b3;
  --secondary-lightest: #878787;
  --secondary-lightest-rgb: 135, 135, 135;
  --secondary-lightest-yiq: #fff;
  --secondary-lighter: dimgray;
  --secondary-lighter-rgb: 105, 105, 105;
  --secondary-lighter-yiq: #fff;
  --secondary-light: #4d4d4d;
  --secondary-light-rgb: 77, 77, 77;
  --secondary-light-yiq: #fff;
  --secondary-lighten: #454545;
  --secondary-lighten-rgb: 69, 69, 69;
  --secondary-lighten-yiq: #fff;
  --secondary-darken: #1f1f1f;
  --secondary-darken-rgb: 31, 31, 31;
  --secondary-darken-yiq: #fff;
  --secondary-dark: #1a1a1a;
  --secondary-dark-rgb: 26, 26, 26;
  --secondary-dark-yiq: #fff;
  --secondary-darker: #121212;
  --secondary-darker-rgb: 18, 18, 18;
  --secondary-darker-yiq: #fff;
  --secondary-darkest: #0a0a0a;
  --secondary-darkest-rgb: 10, 10, 10;
  --secondary-darkest-yiq: #fff;
  --secondary-black: black;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --border-width: 1px;
  --border-color: #dee2e6;
  --border-radius-sm: 0.2rem;
  --border-radius: 0.25rem;
  --border-radius-lg: 0.3rem;
  --rounded-pill: 50rem;
  --box-shadow-sm: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
  --box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  --box-shadow-lg: 0 1rem 3rem rgba(0,0,0,0.175);
  --spacer-1: 0.25rem;
  --spacer-2: 0.5rem;
  --spacer-3: 1rem;
  --spacer-4: 1.5rem;
  --spacer-5: 3rem;
  --text-muted: #6c757d;
  --font-light: 300;
  --font-normal: 400;
  --font-bold: 700;
  --line-height: 1.5;
  --line-height-lg: 1.5;
  --line-height-sm: 1.2;
  --font-size: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-sm: 0.875rem;
  --h1: 2.5rem;
  --h2: 2rem;
  --h3: 1.75rem;
  --h4: 1.5rem;
  --h5: 1.25rem;
  --h6: 1rem;
  --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
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
