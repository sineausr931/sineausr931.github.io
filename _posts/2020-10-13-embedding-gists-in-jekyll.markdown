---
layout: post
title:  "Embedding Gists In Jekyll"
date:   2020-10-13 10:21:30 -0700
tags: jekyll-gist jekyll
---
Gists are essentially git repositories you can clone and manipulate like you would any of your project. You own the gist (a collection of files), but everyone else has read access. There are no private gists, only secret ones that haven't yet been posted to the public firehose feed.

The jekyll-gist plugin provides Liquid tags for displaying GitHub Gists in Jekyll sites:

    {% raw %}{% gist efeda8454d623699b6f191d0194196b1 %}{% endraw %}

or, to display a single file from a gist:

    {% raw %}{% gist efeda8454d623699b6f191d0194196b1 README.md %}{% endraw %}

The embedded gist is displayed below.

{% gist efeda8454d623699b6f191d0194196b1 %}

Reference

* [Liquid tag for displaying GitHub Gists in Jekyll](https://github.com/jekyll/jekyll-gist)
