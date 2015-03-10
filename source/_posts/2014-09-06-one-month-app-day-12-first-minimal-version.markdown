---
layout: post
title: "One Month App - Day 12 - First minimal version"
date: 2014-09-06 22:51:51 +0800
comments: true
categories: 
---

## Dashboard version 2

I was thinking about new view for dashboard. Here is the sketch:

{% img center /images/sketch-2-dash-1.jpg  %}

<!--more-->

Almost everything will be available on one page:

* Daily report inputs
* "Add new question" component
* Reports widget for questions and answers

I found good repo that helps me build calendar widget [http://kamisama.github.io/cal-heatmap/](http://kamisama.github.io/cal-heatmap/) (almost as GitHub widget).

My current version:

{% img center /images/dash-2.png  %}


Building client side code (my, `React`, `cal-heatmap`, `d3`) into one file with `browserify` and `Grunt` is REALLY slow... **Argh....**. And `Sails.JS` already using `Grunt` for all task, so switching to `gulp` might be bad idea.
