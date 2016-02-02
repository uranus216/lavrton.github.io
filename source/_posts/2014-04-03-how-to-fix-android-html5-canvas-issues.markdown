---
layout: post
title: "How to fix android html5 canvas issues"
date: 2014-05-03 01:06:13 +0000
comments: true
categories: 
---

While developing html5 mind map application I discovered that it works well on desktop and iOS
but VERY bad on android devices. The reason is android’s canvas is VERY buggy.
So here is a list of useful tips, which may help you to improve the quality of your web application.
I was using [Konva](http://konvajs.github.io/) in the project, so all examples will be provided with it.
But of course you may take into account this tips with other libs or “native” canvas workflow.
I added some comments. So you will understand how to use tips with other frameworks or pure canvas API.

The main problem is canvas sometimes is not clearing, so you can see “ghost” or duplicate shapes on it.

###1. Hack number one – draw into canvas after small delay.

That means at first you have to add canvas to your page, then wait and only then draw something.

```javascript
var stage = new Konva.Stage(conf);
// create canvas element
var layer = new Konva.Layer();
// append it into DOM
stage.add(layer);

// only after delay draw into canvas
setTimeout(function(){
    // add shapes to the layer and then do layer.draw()
}, 300);
```

You can try different delays here, but 300ms suit the best for our project.


###2. Hack number two – change canvas opacity to clear canvas.

```javascript
// throttle function from underscore.js to prevent to many calling for performance reasons
var clearCanvas = _.throttle(function(canvas){
    canvas.style.opacity = 0.99;
    setTimeout(function() {
        canvas.style.opacity = 1;
    });
    // also you can uncomment next line.
    // It may help on some devices, but it was useless in our project.
    // canvas.width = canvas.width;
}, 100);

var oldDraw = Konva.Layer.prototype.drawScene;

// add to you draw function new "clearCanvas" step
Konva.Layer.prototype.drawScene = function(){
    clearCanvas(this.canvas._canvas);
    oldDraw.apply(this, arguments);
    return this;
}
```

### 3. Hack number three – remove overflow property from all canvas parents (probably you don’t need this property on touch devices):

```javascript
$("canvas").parents("*").css("overflow", "visible");
```
