---
layout: post
title: "One Month App - Day 8"
date: 2014-09-02 18:11:26 +0800
comments: true
categories: 
---
Today I was implementing `don't break the chain` part. I have no problems with ReactJS. It is really easy to use it for me. But I feel that I am using it in wrong way. I need to find some articles about the best practises.

For example for now I have `App` class. It has `onDelete` method:

```javascript
onDelete : function(question) {
    var index = this.state.questions.indexOf(question);
    if (index > -1) {
        this.state.questions.splice(index, 1);
    } else {
        throw "Can't delete question from state. Has no such question."
    }
    this.setState(this.state);
}
```

I pass this method into child component:

```javascript
// render function
QuestionList({
    questions : this.state.questions,
    onDelete : this.onDelete  // pass inside
})
```

But `QuestionList` also have children, and I need to pass `onDelete` method into them:

```javascript
var createItem = function(question) {
    return AnswerComponent({
        question : question,
        onDelete : that.props.onDelete // pass inside again
    });
};
```

Passing same method twice looks very strange for me...


Currently I have this prototype:
{% img center /images/dash-proto-1.jpg  %}




