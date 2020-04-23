# Colors guide

Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.

<DemoBootstrap :showColor1="true" />
```html
<p class="text-primary">.text-primary</p>
<p class="text-muted">.text-muted</p>
```
Contextual text classes also work well on anchors with the provided hover and focus states. Note that the `.text-white` and `.text-muted` class has no additional link styling beyond underline.

<DemoBootstrap :showColor2="true" />
```html
<p><a href="#" class="text-primary">Primary link</a></p>
<p><a href="#" class="text-muted">Muted link</a></p>
```

### Background color

Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes. Background utilities **do not set** `color`, so in some cases you’ll want to use `.text-* `utilities.

<DemoBootstrap :showColor3="true" />

```html
<div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
```

### Background gradient
When $enable-gradients is set to true (default is false), you can use .bg-gradient- utility classes. Learn about our Sass options to enable these classes and more.

+ `.bg-gradient-primary`
+ `.bg-gradient-secondary`
+ `.bg-gradient-success`
+ `.bg-gradient-danger`
+ `.bg-gradient-warning`
+ `.bg-gradient-info`
+ `.bg-gradient-light`
+ `.bg-gradient-dark`

___
### Dealing with specificity
Sometimes contextual classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element’s content in a `<div>` with the class.
___

___
### Conveying meaning to assistive technologies
Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the .sr-only class.
___

[See more](https://getbootstrap.com/docs/4.4/utilities/colors/)