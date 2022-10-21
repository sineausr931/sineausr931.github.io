---
layout: post
title: "Raining Javascript in The Tildeverse"
date: 2021-07-04 00:00:00 -0800
tags: javascript cors proxy canvas iframe cloudflare worker xmlhttprequest
load_highlightjs: true
---
<style>
.img-crop-container {
  overflow: hidden;
  height: 140px;
  position: relative;
}
.img-crop {
display: block;
  width: 100%;
  position: absolute;
  top: 0;
}
</style>
During a visit to the [Tildeverse](https://tildeverse.org/) this week, I ran into a recreation of the
raining, green characters from [The Matrix](https://www.imdb.com/title/tt0133093/) films.
The color palette used by most Tildeverse sites is [monochrome](https://tilde.club/), which I guess
is sufficient for a cmdline-based culture.

<div style="padding:0.5em; margin:1em 0em; pointer-events: none;">
  <iframe style="width:100%; height:300px;" scrolling="no" src="https://worker.sineausr931.workers.dev" title="Matrix Rain"></iframe>
</div>

But we're millennials.  We want multi-colored disco lights and an alphabet of characters that only <a href="https://mrrobot.fandom.com/wiki/Whiterose">White Rose</a> and the Dark Army might understand.

<div style="padding:0.5em; margin:1em 0em;">
  <iframe style="width:100%; height:300px;" src="/matrix" title="Unicode Rain"></iframe>
</div>

<script>
function getDaCode() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/assets/matrix/matrix.js", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
      if (xhr.status === 200) {
        var customTheme = document.getElementById('source_code');
        customTheme.innerHTML = xhr.responseText;

        // Call this after each code block has finished loading to
        // ensure highlighting is applied.
        hljs.highlightAll();
      }
    }
  }
  xhr.send();
}
</script>
<script>getDaCode();</script>

Their solution is elegant and terse. They measure the window's width and height, calculate the number of columns based on font size, and randomize the number of rows to draw for each drop before resetting its position to the top of the canvas (producing a staggering effect after the initial downpour).  Animation is created by drawing to the canvas's 2d context at a specified interval (~30ms).

The code listed below is what's actually running up above. I didn't feel like updating this post every time the code was modified, so the displayed source is loaded into the DOM from <a href="/assets/matrix/matrix.js">/assets/matrix/matrix.js</a> via a call to `XMLHttpRequest` and highlighted for readability using the <a href="https://highlightjs.org/">highlightjs</a> library.

<pre><code class="language-javascript" id="source_code"></code></pre>

Embedding the `<iframe>` into this page (so that one can peek at the monochrome green showers of the Tildeverse), is a bit less elegant.  Using a proxy deployed to some <a href="https://workers.cloudflare.com/">Cloudflare worker</a>, you can bypass any <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a> requirements set by the Tildeverse origin site and convince your browser that it's OK to be susceptible to <a href="https://www.w3.org/Security/wiki/Comparison_of_CORS_and_UMP#CORS">clickjacking</a>.

{% gist 6737f6560984a0ee67a2dd4057e445f7 index.js %}
