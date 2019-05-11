[EJS](https://ejs.co/) markup to compile HTML files.

## `/partials`

On `partials` folder you should place
EJS partials to be included on multiple pages,
receiving all parsed CMS content and
optionally additional arguments.
Import the partial by filename, eg.:

```ejs
<%= partial('head', { title: 'Hello World' }) %>
```

## `/pages`

On `pages` folder you must place
EJS views to compile HTML pages.

Predefined files:

```
├── index.ejs
├── _brands.ejs
├── _categories.ejs
├── _collections.ejs
└── _products.ejs
```

The **above files are required**,
with the specified names. They have to be in the
root of `pages` directory.

To complete the storefront template,
you should also create other EJS views.
It's possible to use as many pages as you want,
and you can choose any filenames.

## `/pages/_cms`

EJS views for
[folder collections](https://www.netlifycms.org/docs/collection-types/#folder-collections),
witch produces multiple slugs.

For example, for a blog folder collection on folder `content/blog-posts`,
you should have a view `_cms/blog-posts.ejs`, it will generate an HTML page for each
post saved by CMS.
