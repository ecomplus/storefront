# Bootstrap components

Bootstrap is a popular structure around the world for creating responsive websites for mobile devices.

Bootstrap has several JavaScript plugins (jQuery) that make your daily life much easier. With numerous ready-made libraries available, what needs to be done is just to include them in your projects.

**See the components used:**

## scss/tables

Due to the widespread use of tables across third-party widgets like calendars and date pickers, we’ve designed our tables to be opt-in. Just add the base class .table to any `<table>`, then extend with custom styles or our various included modifier classes.

Using the most basic table markup, here’s how .table-based tables look in Bootstrap. All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the same manner as the parent.

**Example:**

<DemoBootstrap :showTable="true"/>
```html
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
```

[See more](https://getbootstrap.com/docs/4.4/content/tables/)

## scss/forms

Bootstrap’s form controls expand on [our Rebooted form styles](https://getbootstrap.com/docs/4.4/content/reboot/#forms) with classes. Use these classes to opt into their customized displays for a more consistent rendering across browsers and devices.

**Example:**

<DemoBootstrap :showForms="true"/>
``` html
<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
```

[See more](https://getbootstrap.com/docs/4.4/components/forms/)

## scss/buttons

Includes several predefined button styles, each serving its own semantic purpose, with a few extras available for greater control.
Here are some examples:

<DemoBootstrap :showButtons="true" />
```html
<button type="button" class="btn btn-secondary btn-sm">Small button</button>
<input class="btn btn-primary" type="submit" value="Submit">
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
```

[See more](https://getbootstrap.com/docs/4.4/components/buttons/)

## scss/transitions ????


## scss/dropdown

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re made interactive with the included Bootstrap dropdown JavaScript plugin. They’re toggled by clicking, not by hovering; this is [an intentional design decision](https://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

Dropdowns are built on a third party library, [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection. Be sure to include [popper.min.js](https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js) before Bootstrap’s JavaScript or use `bootstrap.bundle.min.js` / `bootstrap.bundle.js` which contains Popper.js. Popper.js isn’t used to position dropdowns in navbars though as dynamic positioning isn’t required.

Wrap the dropdown’s toggle (your button or link) and the dropdown menu within .dropdown, or another element that declares position: relative;. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

**Example:**

<DemoBootstrap :showDropdown="true" />
```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
```

[See more](https://getbootstrap.com/docs/4.4/components/dropdowns/)

## scss/button-group

Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.Here are some examples:

<DemoBootstrap :showButtonGroup1="true" />
```html
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

[See more](https://getbootstrap.com/docs/4.4/components/button-group/)

## scss/input-group



## scss/custom-forms
## scss/nav
## scss/card
## scss/breadcrumb
## scss/pagination
## scss/badge
## scss/alert
## scss/list-group
## scss/close
## scss/toasts
## scss/modal
## scss/tooltip
## scss/popover
## scss/spinners



## Utilities
### scss/utilities/clearfix
### scss/utilities/display
### scss/utilities/embed
### scss/utilities/position
### scss/utilities/screenreaders
### scss/utilities/stretched-link

## Customized utilities
### utilities/spacing
### utilities/text