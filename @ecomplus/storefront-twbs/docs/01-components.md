# Bootstrap components

Majority part (_but not all_) of Bootstrap CSS is imported, with almost all components, some utility classes and custom additional [CSS vars](./05-vars.md).

> Almost all content here is copied from [Bootstrap documentation](https://getbootstrap.com/docs/4.5/components/alerts/), you can get the detailed reference there. Here we're just pointing some differences and resuming original reference.

## Content

Bootstrap content styles are fully imported, including reboot, typography, images, tables and code, check reference from [Bootstrap 4 documentation](https://getbootstrap.com/docs/4.5/content/).

Storefront Twbs also enables [responsive font sizes](https://getbootstrap.com/docs/4.5/content/typography/#responsive-font-sizes) by default.

<div class="demo">
  <h3>
    Sample H3
    <small class="text-muted">
      With faded secondary text
    </small>
  </h3>
  <p class="h1">
    h1. Bootstrap heading
  </p>
  <p class="lead">
    Demo lead paragraph
  </p>
</div>

```html
<h3>
  Sample H3
  <small class="text-muted">
    With faded secondary text
  </small>
</h3>
<p class="h1">
  h1. Bootstrap heading
</p>
<p class="lead">
  Demo lead paragraph
</p>
```

## Grid system

Grid system is also imported as is, using default [responsive breakpoints](https://getbootstrap.com/docs/4.5/layout/overview/#responsive-breakpoints). Check [Bootstrap 4 reference](https://getbootstrap.com/docs/4.5/layout/grid/) for details and more examples.

<div class="demo">
  <div class="container">
    <div class="row">
      <div class="col-sm">1° of three columns</div>
      <div class="col-sm">2° of three columns</div>
      <div class="col-sm">3° of three columns</div>
    </div>
    <hr>
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">1/6</div>
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">2/6</div>
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">3/6</div>
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">4/6</div>
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">5/6</div>
      <div class="col-6 col-md-4 col-lg-3 col-xl-2">6/6</div>
    </div>
  </div>
</div>

```html
<div class="container">
  <div class="row">
    <div class="col-sm">1° of three columns</div>
    <div class="col-sm">2° of three columns</div>
    <div class="col-sm">3° of three columns</div>
  </div>
  <hr>
  <div class="row">
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">1/6</div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">2/6</div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">3/6</div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">4/6</div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">5/6</div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">6/6</div>
  </div>
</div>
```

## Utilities

We're replacing default Bootstrap utilities approach with [CSS vars](https://developer.mozilla.org/docs/Web/CSS/var) approach to reduce size of unused CSS output, Storefront Twbs extends default CSS vars and so you should prefer to use them instead of atomic classes.

Even so, some most useful (generally non-atomic) utility classes still imported and listed below:

### Clearfix

> Quickly and easily clear floated content within a container by adding a clearfix utility.

```html
<div class="clearfix">...</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/clearfix/)

### Display

> Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

<div class="demo">
  <div class="d-lg-none">
    hide on lg and wider screens
  </div>
  <div class="d-none d-lg-block">
    hide on screens smaller than lg
  </div>
</div>

```html
<div class="d-lg-none">
  hide on lg and wider screens
</div>
<div class="d-none d-lg-block">
  hide on screens smaller than lg
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/display/)

### Embed

> Create responsive video or slideshow embeds based on the width of the parent by creating an intrinsic ratio that scales on any device.

<div class="demo">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>

```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/embed/)

### Position

> Use these shorthand utilities for quickly configuring the position of an element.

```html
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>
<div class="fixed-top">...</div>
<div class="fixed-bottom">...</div>
<div class="sticky-top">...</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/position/)

### Screen readers

> Use screen reader utilities to hide elements on all devices except screen readers.

```html
<a class="sr-only sr-only-focusable" href="#content">
  Skip to main content
</a>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/screen-readers/)

### Stretched link

> Make any HTML element or Bootstrap component clickable by “stretching” a nested link via CSS.

<div class="demo">
  <div class="card" style="max-width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">
        Card with stretched link
      </h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </p>
      <a href="javascript:;" class="btn btn-primary stretched-link">
        Go somewhere
      </a>
    </div>
  </div>
</div>

```html
<div class="card" style="max-width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">
      Card with stretched link
    </h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <a href="javascript:;" class="btn btn-primary stretched-link">
      Go somewhere
    </a>
  </div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/stretched-link/)

### Spacing

> Bootstrap includes a wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.

Especially the _spacing_ utilities are defined **without `!important` rule**.

<div class="demo">
  <div class="p-3 p-md-4 p-lg-5 mx-auto" style="background: var(--light); width: 200px;">
    Centered element
  </div>
</div>

```html
<span class="p-3 p-md-4 p-lg-5 mx-auto" style="background: var(--light)">
  Centered element
</span>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/utilities/spacing/)

### Text

Storefront Twbs includes only `.text-truncate` and `.text-muted` text utilities from Bootstrap, skipping all other text atomic modifiers.

<div class="demo">
  <span class="d-inline-block text-muted text-truncate" style="max-width: 150px;">
    Praeterea iter est quasdam res quas ex communi.
  </span>
</div>

```html
<span class="d-inline-block text-muted text-truncate" style="max-width: 150px;">
  Praeterea iter est quasdam res quas ex communi.
</span>
```

## Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

<div class="demo">
  <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </div>
  <div class="alert alert-info" role="alert">
    A simple info alert with
    <a href="javascript:;" class="alert-link">an example link</a>.
    Give it a click if you like.
  </div>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="alert alert-danger" role="alert">
    A simple danger alert—check it out!
  </div>
</div>

```html
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
<div class="alert alert-info" role="alert">
  A simple info alert with
  <a href="javascript:;" class="alert-link">an example link</a>.
  Give it a click if you like.
</div>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/alerts/)

## Badge

> Documentation and examples for badges, our small count and labeling component.

<div class="demo">
  <h4>Example heading <span class="badge badge-secondary">New h4</span></h4>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-secondary">Secondary</span>
  <span class="badge badge-success">Success</span>
  <span class="badge badge-danger">Danger</span>
  <span class="badge badge-warning">Warning</span>
  <span class="badge badge-info">Info</span>
  <span class="badge badge-light">Light</span>
  <span class="badge badge-dark">Dark</span>
</div>

```html
<h4>
  Example heading
  <span class="badge badge-secondary">New h4</span>
</h4>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
<span class="badge badge-dark">Dark</span>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/badge/)


## Breadcrumb

> Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.

<div class="demo">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Library</a></li>
      <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
  </nav>
</div>

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
    <li class="breadcrumb-item"><a href="javascript:;">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/breadcrumb/)

## Buttons

> Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.

<div class="demo">
  <p>
    <button type="button" class="btn btn-light btn-sm">
      Light small button
    </button>
    <button type="button" class="btn btn-primary btn-lg">
      Large CTA
    </button>
  </p>
  <p>
    <input class="btn btn-primary" type="submit" value="Submit">
    <button type="button" class="btn btn-secondary">
      Secondary action
    </button>
    <button type="button" class="btn btn-outline-secondary">
      Outline
    </button>
  </p>
  <button type="button" class="btn btn-success btn-block">
    Success context with block level
  </button>
  <button type="button" class="btn btn-danger mt-3">Danger</button>
  <button type="button" class="btn btn-warning mt-3">Warning</button>
  <button type="button" class="btn btn-info mt-3">Info</button>
  <button type="button" class="btn btn-light mt-3">Light</button>
  <button type="button" class="btn btn-dark mt-3">Dark</button>
</div>

```html
<p>
  <button type="button" class="btn btn-light btn-sm">
    Light small button
  </button>
  <button type="button" class="btn btn-primary btn-lg">
    Large CTA
  </button>
</p>
<p>
  <input class="btn btn-primary" type="submit" value="Submit">
  <button type="button" class="btn btn-secondary">
    Secondary action
  </button>
  <button type="button" class="btn btn-outline-secondary">
    Outline
  </button>
</p>
<button type="button" class="btn btn-success btn-block">
  Success context with block level
</button>
<button type="button" class="btn btn-danger mt-3">Danger</button>
<button type="button" class="btn btn-warning mt-3">Warning</button>
<button type="button" class="btn btn-info mt-3">Info</button>
<button type="button" class="btn btn-light mt-3">Light</button>
<button type="button" class="btn btn-dark mt-3">Dark</button>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/buttons/)

## Button group

> Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.

<div class="demo">
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-secondary">Left</button>
    <button type="button" class="btn btn-secondary">Middle</button>
    <button type="button" class="btn btn-secondary">Right</button>
  </div>
</div>

```html
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/button-group/)

## Card

> Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options.

<div class="demo">
  <div class="card" style="max-width: 18rem;">
    <img src="/assets/img/banner.png" class="card-img-top" alt="..">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="javascript:;" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>

```html
<div class="card" style="max-width: 18rem;">
  <img src="/assets/img/banner.png" class="card-img-top" alt="..">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="javascript:;" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/card/)

## Collapse

> Toggle the visibility of content across your project with a few classes and our JavaScript plugins.

<div class="demo">
  <p>
    <a class="btn btn-primary" data-toggle="collapse" href="#collapse-example" role="button" aria-expanded="false" aria-controls="collapse-example">
      Link with href
    </a>
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-example" aria-expanded="false" aria-controls="collapse-example">
      Button with data-target
    </button>
  </p>
  <div class="collapse" id="collapse-example">
    <div class="card card-body">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
    </div>
  </div>
</div>

```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapse-example" role="button" aria-expanded="false" aria-controls="collapse-example">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-example" aria-expanded="false" aria-controls="collapse-example">
    Button with data-target
  </button>
</p>
<div class="collapse" id="collapse-example">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/collapse/)

## Dropdown

> Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.

<div class="demo">
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="javascript:;">Action</a>
      <a class="dropdown-item" href="javascript:;">Another action</a>
      <a class="dropdown-item" href="javascript:;">Something else here</a>
    </div>
  </div>
</div>

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="javascript:;">Action</a>
    <a class="dropdown-item" href="javascript:;">Another action</a>
    <a class="dropdown-item" href="javascript:;">Something else here</a>
  </div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/dropdowns/)

## Forms

> Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms.

<div class="demo">
  <form action="javascript:;">
    <div class="form-group">
      <label for="example-input-email">Email address</label>
      <input type="email" class="form-control" id="example-input-email" aria-describedby="email-help">
      <small id="email-help" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="input-city">City</label>
        <input type="text" class="form-control" id="input-city">
      </div>
      <div class="form-group col-md-4">
        <label for="input-state">State</label>
        <select id="input-state" class="custom-select">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="input-zip">Zip</label>
        <input type="text" class="form-control" id="input-zip">
      </div>
    </div>
    <div class="form-group">
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="custom-radio-1" name="custom-radio-1" class="custom-control-input">
        <label class="custom-control-label" for="custom-radio-1">Toggle this custom radio</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="custom-radio-2" name="custom-radio-1" class="custom-control-input">
        <label class="custom-control-label" for="custom-radio-2">Or toggle this</label>
      </div>
    </div>
    <div class="form-group">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="custom-check">
        <label class="custom-control-label" for="custom-check">Check this custom checkbox</label>
      </div>
    </div>
    <div class="form-group">
      <input class="form-control" type="text" placeholder="Readonly input here..." readonly>
    </div>
    <button class="btn btn-primary" type="submit">Submit form</button>
  </form>
</div>

``` html
<form action="javascript:;">
  <div class="form-group">
    <label for="example-input-email">Email address</label>
    <input type="email" class="form-control" id="example-input-email" aria-describedby="email-help">
    <small id="email-help" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="input-city">City</label>
      <input type="text" class="form-control" id="input-city">
    </div>
    <div class="form-group col-md-4">
      <label for="input-state">State</label>
      <select id="input-state" class="custom-select">
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="input-zip">Zip</label>
      <input type="text" class="form-control" id="input-zip">
    </div>
  </div>
  <div class="form-group">
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="custom-radio-1" name="custom-radio-1" class="custom-control-input">
      <label class="custom-control-label" for="custom-radio-1">Toggle this custom radio</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="custom-radio-2" name="custom-radio-1" class="custom-control-input">
      <label class="custom-control-label" for="custom-radio-2">Or toggle this</label>
    </div>
  </div>
  <div class="form-group">
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="custom-check">
      <label class="custom-control-label" for="custom-check">Check this custom checkbox</label>
    </div>
  </div>
  <div class="form-group">
    <input class="form-control" type="text" placeholder="Readonly input here..." readonly>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/forms/)

## Input group

> Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.

<div class="demo">
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon-1">@</span>
    </div>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon-1">
  </div>
  <div class="input-group input-group-sm mb-3">
    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon-2">
    <div class="input-group-append">
      <span class="input-group-text" id="basic-addon-2">@example.com</span>
    </div>
  </div>
  <div class="input-group input-group-lg mb-3">
    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" id="button-addon">Button</button>
    </div>
  </div>
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text">With textarea</span>
    </div>
    <textarea class="form-control" aria-label="With textarea"></textarea>
  </div>
</div>

```html
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon-1">@</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon-1">
</div>
<div class="input-group input-group-sm mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon-2">
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon-2">@example.com</span>
  </div>
</div>
<div class="input-group input-group-lg mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-addon">Button</button>
  </div>
</div>
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">With textarea</span>
  </div>
  <textarea class="form-control" aria-label="With textarea"></textarea>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/input-group/)

## List group

> List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.

<div class="demo">
  <div class="list-group">
    <a href="javascript:;" class="list-group-item list-group-item-action active">
      Cras justo odio
    </a>
    <a href="javascript:;" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
    <a href="javascript:;" class="list-group-item list-group-item-action">Morbi leo risus</a>
    <a href="javascript:;" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
    <a href="javascript:;" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
  </div>
</div>

```html
<div class="list-group">
  <a href="javascript:;" class="list-group-item list-group-item-action active">
    Cras justo odio
  </a>
  <a href="javascript:;" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
  <a href="javascript:;" class="list-group-item list-group-item-action">Morbi leo risus</a>
  <a href="javascript:;" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
  <a href="javascript:;" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/list-group/)

## Modal

> Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.

<div class="demo">
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#example-modal">
    Launch demo modal
  </button>
  <div class="modal fade" id="example-modal" tabindex="-1" aria-labelledby="example-modal-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="example-modal-label">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

```html
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#example-modal">
  Launch demo modal
</button>
<div class="modal fade" id="example-modal" tabindex="-1" aria-labelledby="example-modal-label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="example-modal-label">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/modal/)

## Navs

> Documentation and examples for how to use Bootstrap’s included navigation components.

<div class="demo">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" href="javascript:;">Active</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="javascript:;">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="javascript:;">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="javascript:;" tabindex="-1" aria-disabled="true">Disabled</a>
    </li>
  </ul>
</div>

```html
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="javascript:;">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="javascript:;">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="javascript:;">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="javascript:;" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/navs/)

## Pagination

> Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages.

<div class="demo">
  <nav aria-label="..">
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="javascript:;" tabindex="-1" aria-disabled="true">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="javascript:;">1</a></li>
      <li class="page-item active" aria-current="page">
        <a class="page-link" href="javascript:;">2 <span class="sr-only">(current)</span></a>
      </li>
      <li class="page-item"><a class="page-link" href="javascript:;">3</a></li>
      <li class="page-item">
        <a class="page-link" href="javascript:;">Next</a>
      </li>
    </ul>
  </nav>
</div>

```html
<nav aria-label="..">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="javascript:;" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="javascript:;">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="javascript:;">2 <span class="sr-only">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link" href="javascript:;">3</a></li>
    <li class="page-item">
      <a class="page-link" href="javascript:;">Next</a>
    </li>
  </ul>
</nav>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/pagination/)

## Popover

> Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.

```html
<button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
```

One way to initialize all popovers on a page would be to select them by their `data-toggle` attribute:

```js
$(function () {
  $('[data-toggle="popover"]').popover()
})
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/popovers/)

# Progress

> Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.

<div class="demo">
  <div class="progress">
    <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
  </div>
  <div class="progress mt-2">
    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>

```html
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>
<div class="progress mt-2">
  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/progress/)

## Spinners

> Indicate the loading state of a component or page with Bootstrap spinners, built entirely with HTML, CSS, and no JavaScript.

<div class="demo">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow ml-3" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-border spinner-border-sm ml-3" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow ml-3" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>

```html
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow ml-3" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border spinner-border-sm ml-3" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow ml-3" style="width: 3rem; height: 3rem;" role="status">
  <span class="sr-only">Loading...</span>
</div>
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/spinners/)

## Toasts

> Push notifications to your visitors with a toast, a lightweight and easily customizable alert message.

```html
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src=".." class="rounded mr-2" alt="..">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
```

Initialize toasts via JavaScript:

```js
$(function () {
  $('.toast').toast()
})
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/toasts/)

## Tooltips

> Documentation and examples for adding custom Bootstrap tooltips with CSS and JavaScript using CSS3 for animations and data-attributes for local title storage.

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
  Tooltip on left
</button>
```

One way to initialize all tooltips on a page would be to select them by their `data-toggle` attribute:

```js
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
```

[Bootstrap reference](https://getbootstrap.com/docs/4.5/components/tooltips/)
