---
layout: post
title:  "Conditional Resource Inclusion for Jekyll"
date:   2021-05-28  00:00:00 -0800
tags: jekyll minima assets lightbox javascript conditional
load_lightbox: true
---
Not every Jekyll post needs to load every javascript library.
Use a header template containing liquid [control flow](https://shopify.github.io/liquid/tags/control-flow/) tags, 
along with [front-matter](https://jekyllrb.com/docs/front-matter/) variables, to control the inclusions of things
like `.js` and `.css` page resources.

<a data-lightbox="screenshot_1" href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png">
  <img width="10%" src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png"/>
</a>

Suppose you want to enlarge and magnify an image on-click, also darkening the rest of the page in the process (a lighthouse effect).  To accomplish this, you might include a library such as [lightbox2](https://lokeshdhakar.com/projects/lightbox2/) in your page and add a `data-lightbox` attribute to your image's href tag.

(The following examples were implemented in the [PreferenceFragmentCompat](/2021/02/17/preferencefragmentcompat.html) post)

```html
{% raw %}<a data-lightbox="screenshot_1" href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png">
  <img src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png"/>
</a>{% endraw %}
```

Three steps are required to make the above HTML sample work. First, place the code and images used by lightbox somewhere under
your site's `assets` directory. The contents of that directory will be copied to `_site` when the site is next built.

```
root
├── _includes/
│   └── head.html
└── assets/
    └── lightbox/
        ├── images/
        │   ├── close.png
        │   ├── loading.gif
        │   ├── next.png
        │   └── prev.png
        ├── lightbox-plus-jquery.js
        └── lightbox.css
```

Next, modify `head.html` to conditionally include the `<link>` and `<script>` tags for lightbox libraries
only when header variable `page.load_lightbox == true`. Since lighbox requires jquery, I was lazy and
used the lightbox-plus-jquery version.

```html
{% raw %}
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {%- seo -%}
  <link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
  {%- feed_meta -%}
  {%- if jekyll.environment == 'production' and site.google_analytics -%}
    {%- include google-analytics.html -%}
  {%- endif -%}
  {%- if page.load_lightbox == true -%}
  <link href="/assets/lightbox/lightbox.css" rel="stylesheet" />
  <script src="/assets/lightbox/lightbox-plus-jquery.js"></script>
  {%- endif -%}
</head>
{% endraw %}
```

Last, add `load_lightbox: true` to Jekyll's header variables at the top of each post where you wish to use lightbox.

```
---
layout: post
title: "PreferenceFragmentCompat"
date: 2021-02-17 00:00:00 -0800
tags: Android PreferenceFragmentCompat PreferenceManager
load_lightbox: true
---
```

Reference

* [jekyll includes](https://jekyllrb.com/docs/includes/)
* [jekyll variables](https://jekyllrb.com/docs/variables/)
* [lighthouse .js, .css and images](https://github.com/lokesh/lightbox2/tree/dev/dist/images)
* [lightbox getting started](https://lokeshdhakar.com/projects/lightbox2/#getting-started)
