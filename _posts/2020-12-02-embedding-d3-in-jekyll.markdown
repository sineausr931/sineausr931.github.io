---
layout: post
title: "Embedding d3 in Jekyll"
date: 2020-12-02 08:46:30 -0700
tags: jekyll markdown d3
---
What follows is a brute force implementation of displaying running javascript and d3 visualizations in a jekyll post. The methods used here are for illustration. A cleaner approach would be to store all 3rd-party javascript libraries under the site's `/assets` directory and conditionally import the `.js` files only in posts that contain a [front matter](https://jekyllrb.com/docs/front-matter/) custom variable (e.g. `load_d3_libs: true`).

<a href="{{ site.baseurl }}{% post_url 2021-05-28-conditional-resource-inclusion-for-jekyll-minima %}">Read more</a> about conditional resource inclusion.

<script src='https://d3js.org/d3.v4.min.js'></script>
<script src='https://d3js.org/d3-scale-chromatic.v1.min.js'></script>

<div id="pie"/>

<script type="text/javascript">
var keys = [
  "Pineapple"
  , "Banana"
  , "Apple"
  , "Orange"
  , "Watermelon"
  , "Peach"];

var width = 250,
  height = 250,
  radius = Math.min(width, height) / 2;

var svg = d3.select("#pie")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").attr("class", "slices");

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3.arc()
  .outerRadius(radius * 1.0)
  .innerRadius(radius * 0.0);

var outerArc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 1);

var key = function(d) { return d.data.label; };

var color = d3.scaleOrdinal(d3.schemePastel1)
    .domain(keys);

update(makeData());

var inter = setInterval(function() {
    update(makeData());
  }, 2000);

function mergeWithFirstEqualZero(first, second){
  var secondSet = d3.set();

  second.forEach(function(d) { secondSet.add(d.label); });

  var onlyFirst = first
    .filter(function(d){ return !secondSet.has(d.label) })
    .map(function(d) { return {label: d.label, value: 0}; });

  var sortedMerge = d3.merge([ second, onlyFirst ])
    .sort(function(a, b) {
        return d3.ascending(a.label, b.label);
      });

  return sortedMerge;
}

function makeData() {
  var data = Array();

  for (i = 0; i < keys.length; i++) {
    if (Math.random() < 0.7) {
      var ob = {};
      ob["label"] = keys[i];
      ob["value"] = randomCount(1, 100);
      data.push(ob);
    }
  }

  var sortedData = data.sort(function(a, b) {
      return d3.ascending(a.label, b.label);
    });

  return sortedData;
}

function randomCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update(data) {
    var duration = 500;

    var oldData = svg.select(".slices")
      .selectAll("path")
      .data().map(function(d) { return d.data });

    if (oldData.length == 0) oldData = data;

    var was = mergeWithFirstEqualZero(data, oldData);
    var is = mergeWithFirstEqualZero(oldData, data);

    var slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(was), key);

    slice.enter()
      .insert("path")
      .attr("class", "slice")
      .style("fill", function(d) { return color(d.data.label); })
      .each(function(d) {
          this._current = d;
        });

    slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(is), key);

    slice.transition()
      .duration(duration)
      .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          var _this = this;
          return function(t) {
              _this._current = interpolate(t);
              return arc(_this._current);
            };
        });

    slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(data), key);

    slice.exit()
      .transition()
      .delay(duration)
      .duration(0)
      .remove();
};
</script>

3rd-party libraries may be loaded directly using the `<script>` command.

{% highlight html %}
<script src='https://d3js.org/d3.v4.min.js'></script>
<script src='https://d3js.org/d3-scale-chromatic.v1.min.js'></script>
{% endhighlight %}

Target deployment element(s) are added to the post.

{% highlight html %}
<div id="pie"/>
{% endhighlight %}

In this example, local javascript is pasted directly into the post.

{% highlight html %}
<script type="text/javascript">
var keys = [
  "Pineapple"
  , "Banana"
  , "Apple"
  , "Orange"
  , "Watermelon"
  , "Peach"];

var width = 250,
  height = 250,
  radius = Math.min(width, height) / 2;

var svg = d3.select("#pie")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").attr("class", "slices");

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3.arc()
  .outerRadius(radius * 1.0)
  .innerRadius(radius * 0.0);

var outerArc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 1);

var key = function(d) { return d.data.label; };

var color = d3.scaleOrdinal(d3.schemePastel1)
    .domain(keys);

update(makeData());

var inter = setInterval(function() {
    update(makeData());
  }, 2000);

function mergeWithFirstEqualZero(first, second){
  var secondSet = d3.set();

  second.forEach(function(d) { secondSet.add(d.label); });

  var onlyFirst = first
    .filter(function(d){ return !secondSet.has(d.label) })
    .map(function(d) { return {label: d.label, value: 0}; });

  var sortedMerge = d3.merge([ second, onlyFirst ])
    .sort(function(a, b) {
        return d3.ascending(a.label, b.label);
      });

  return sortedMerge;
}

function makeData() {
  var data = Array();

  for (i = 0; i < keys.length; i++) {
    if (Math.random() < 0.7) {
      var ob = {};
      ob["label"] = keys[i];
      ob["value"] = randomCount(1, 100);
      data.push(ob);
    }
  }

  var sortedData = data.sort(function(a, b) {
      return d3.ascending(a.label, b.label);
    });

  return sortedData;
}

function randomCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update(data) {
    var duration = 500;
    var oldData = svg.select(".slices")
      .selectAll("path")
      .data().map(function(d) { return d.data });

    if (oldData.length == 0) oldData = data;

    var was = mergeWithFirstEqualZero(data, oldData);
    var is = mergeWithFirstEqualZero(oldData, data);

    var slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(was), key);

    slice.enter()
      .insert("path")
      .attr("class", "slice")
      .style("fill", function(d) { return color(d.data.label); })
      .each(function(d) {
          this._current = d;
        });

    slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(is), key);

    slice.transition()
      .duration(duration)
      .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          var _this = this;
          return function(t) {
              _this._current = interpolate(t);
              return arc(_this._current);
            };
        });

    slice = svg.select(".slices")
      .selectAll("path")
      .data(pie(data), key);

    slice.exit()
      .transition()
      .delay(duration)
      .duration(0)
      .remove();
};
</script>
{% endhighlight %}

Reference

* [Using Custom Javascript In Jekyll Blogs](https://blog.emmatosch.com/2016/03/09/using-custom-javascript-in-jekyll-blogs.html)
* [Custom Javascript In Jekyll Blogs](https://mchirico.github.io/javascript/2016/12/22/JavascriptNetwork.html)
* [External Javascript In Jekyll Github Pages](https://coryburt.github.io/blog/2017/10/18/External-Javascript-In-Jekyll-Github-Pages)
