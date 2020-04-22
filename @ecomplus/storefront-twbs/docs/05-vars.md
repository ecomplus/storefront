# CSS vars

Try to use it whenever possible, to maintain and consist of the store's identity. Define the theme, colors, fonts to be consistent with the identity that the shopkeeper is creating.

**Example of use:**

<div class="demo">
  <button class="btn btn-orange">teste</button>
</div>

<style>
  .demo .btn.btn-orange {
    background-color: var(--green);
    color: var(--white);
  }
</style>

```html
<div class="demo">
  <button class="btn btn-orange">teste</button>
</div>

<style>
  .demo .btn.btn-orange {
    background-color: var(--green);
    color: var(--white);
  }
</style>
```

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
  --primary-rgb: 232,62,140;
  --secondary: #333;
  --secondary-yiq: #fff;
  --secondary-rgb: 51,51,51;
  --success: #28a745;
  --success-yiq: #fff;
  --success-rgb: 40,167,69;
  --info: #17a2b8;
  --info-yiq: #fff;
  --info-rgb: 23,162,184;
  --warning: #ffc107;
  --warning-yiq: #212529;
  --warning-rgb: 255,193,7;
  --danger: #dc3545;
  --danger-yiq: #fff;
  --danger-rgb: 220,53,69;
  --light: #f8f9fa;
  --light-yiq: #212529;
  --light-rgb: 248,249,250;
  --dark: #343a40;
  --dark-yiq: #fff;
  --dark-rgb: 52,58,64;
  --primary-lightest: #fad4e6;
  --primary-lightest-yiq: #212529;
  --primary-lightest-rgb: 249.92083,212.37917,229.60417;
  --primary-lighter: #f39ec5;
  --primary-lighter-yiq: #212529;
  --primary-lighter-rgb: 243.40417,157.69583,197.02083;
  --primary-light: #ed6ca7;
  --primary-light-yiq: #212529;
  --primary-light-rgb: 237.43056,107.56944,167.15278;
  --secondary-lightest: #878787;
  --secondary-lightest-yiq: #fff;
  --secondary-lightest-rgb: 135.15,135.15,135.15;
  --secondary-lighter: #696969;
  --secondary-lighter-yiq: #fff;
  --secondary-lighter-rgb: 104.55,104.55,104.55;
  --secondary-light: #4d4d4d;
  --secondary-light-yiq: #fff;
  --secondary-light-rgb: 76.5,76.5,76.5;
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
  ```