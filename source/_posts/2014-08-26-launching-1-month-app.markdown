---
layout: post
title: "Launching 1 month app - Day 1"
date: 2014-08-26 17:50:38 +0800
comments: true
categories: 
---

## Prequel

Today I want to launch a new project. I want to call it "tracker.io - Life statistic".
The project is about statistic of your life and personal effectiveness.
I want to calculate such categories of my life:

- How many hours did I work today?
- How many hours did I sleep?
- ...

Also I'd like to add "Don't break the chain" motivation technique:

- Fitness
- Reading
- Working with open source
- ...

<!--more-->

One more thing I'd like to include AWESOME motivation technique that I am already using last 1.5 years 
(I will explain it in later posts).

So what is my purpose. I am going to build website that will help me store such data and visualize it.
Visualization is the most important part of the project.

I am going to build this service in one month. I am not sure is it long or short interval.
Just for definiteness and stimulus.

## Starting the project

For a long time I was thinking about server side. Should I use it or not.
I love "thick" javascript client application that can do everything itself without server side.
Or with just different SAAS server side solution such as `Parse` or `Kinvey`.
 
But I think my application will store a lot of data.
And may be some parts of the visualisation will be generated on server side.
So using my own server will be easier in this case.
 
While searching nodejs framework (I just want to learn nodejs) I choose sails.js.
I don't need full-stack framework because I want to use React on client side.
And I don't want to do a lot of stuff by myself with `connect` or `express` frameworks.

I have 1 month to make a good product. The 26th of September is a deadline for `Tracker`. So let's go! 