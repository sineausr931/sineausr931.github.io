---
layout: post
title:  "Conditional Resource Inclusion for Jekyll"
date:   2021-05-28  00:00:00 -0800
tags: jekyll minima assets lightbox javascript conditional
---
Not every Jekyll post needs to load every javascript library.
Use a header template containing liquid [control flow](https://shopify.github.io/liquid/tags/control-flow/) tags, 
along with [front-matter](https://jekyllrb.com/docs/front-matter/) variables, to control the inclusions of things like `.js` and `.css` page resources.

lightbox getting started
- https://lokeshdhakar.com/projects/lightbox2/#getting-started

lighthouse .js, .css and images
- https://github.com/lokesh/lightbox2/tree/dev/dist/images

jekyll includes
- https://jekyllrb.com/docs/includes/

jekyll variables
- https://jekyllrb.com/docs/variables/

cross-post linking
- https://stackoverflow.com/questions/52442726/linked-posts-lead-to-a-404-in-jekyll

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
