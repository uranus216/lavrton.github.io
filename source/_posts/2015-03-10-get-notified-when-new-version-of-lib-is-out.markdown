---
layout: post
title: "Get notified when new version of lib is out"
date: 2015-03-10 01:00:05 +0000
comments: true
categories: 
---

I really like to track new versions of my favorite libraries or frameworks.
Usually when new version of popular project (such as `React`, `Backbone`) is out you will know it from everywhere: reddit, hacker news, tweets, etc.


But you may miss new version for less popular framework.
Or if you are offline a while.

## How to get notified?

Do you know that github supports feed for new tags and releases?

You can use this url for new tags:

`https://github.com/{user}/{repository}/tags.atom`

For example backbone feed: [https://github.com/jashkenas/backbone/tags.atom](https://github.com/jashkenas/backbone/tags.atom)

or this url for new releases (if contributors make releases in github way) otherwise it is the same as "tags" feed:

`https://github.com/{user}/{repository}/releases.atom`

For examle look at phaser.js feed [https://github.com/photonstorm/phaser/releases.atom](https://github.com/photonstorm/phaser/releases.atom)

### Want to get notified via email?

We have a solution with [ifttt.com](http://ifttt.com/).

See my example recipe: [Konva.js new version notification](https://ifttt.com/recipes/267571-email-me-when-new-version-of-konva-js-is-out)