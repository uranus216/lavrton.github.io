---
layout: post
title: "Using Backbone with html5 canvas"
date: 2014-11-05 01:10:32 +0000
comments: true
categories: 
---

##1 Description of the problem

While developing mind map application Slash System,
I chose Backbone as the main library to build an application.
The mind map is drawn into `<canvas>` element using various primitives.
We chose KineticJS (now it is [Konva](http://konvajs.github.io/)) library to work with canvas,
as it perfectly supports events for objects on the canvas.

In order to match the architecture of Backbone, all work with canvas
(or rather with the object instances of `Konva`) occurred in `Backbone.View` instances:


```javascript
var Node = Backbone.View.extend({
    initialize: function (params) {
        this.layer = params.layer;
        this.node = this.el();
        this.bindEvents();
    },
    el: function (){
        var rect = new Konva.Rect({
            x : 100,
            y : 100,
            width : 50,
            height : 50,
            fill : 'green',
            id : 'rect'
        });
        return rect;
    },
    bindEvents: function() {
        this.node.on('click', function() {
            console.log("on rectangle clicked");
        }
        // etc ...
    }
});
```



##2 The problem

But Backbone.View is designed to work with the DOM elements,
and this approach generates unnecessary div objects and also announcing of events
in a declarative style (http://backbonejs.org/#View-delegateEvents) is not avalible.

###3 The solution

I made plugin [Backbone.KonvaView](https://github.com/lavrton/backbone.konvaview),
which allows to work with objects on the canvas (via Konva) in the same style as the normal
`Backbone.View` works with DOM. An example of how the code looks now:


```javascript
var MyView = Backbone.KineticView.extend({
    initialize : function(params) {
        this.layer = params.layer;
    },
    nodeType : 'Rect',
    attributes : {
        x : 100,
        y : 100,
        width : 50,
        height : 50,
        fill : 'green',
        id : 'rect'
    },
    // setup events
    events : { 
        'click': function(){
            console.log("on rectangle clicked");
        }
    }
    render : function(){
        this.layer.add(this.el);
        this.layer.draw();
    }
});

var view = new MyView({layer:layer});
view.render();
```



This plugin works almost the same way as `Backbone.View`,
but only for Konva objects. By analogy tests were adapted from Backbone.View.


Slightly more complex live example can be found here: [http://jsbin.com/fekex/5/edit?js,output](http://jsbin.com/fekex/5/edit?js,output)

Plugin code: [https://github.com/lavrton/backbone.konvaview](https://github.com/lavrton/backbone.konvaview)


Perhaps a similar solution can be easily built for such canvas libraries: Easeljs, FabricJS etc.
