# request-animation-loop

> setInterval is to setTimeout as requestAnimationLoop is to requestAnimationFrame.

[![npm version](https://badge.fury.io/js/request-animation-loop.svg)](http://badge.fury.io/js/request-animation-loop)
[![Build Status](https://travis-ci.org/olahol/request-animation-loop.svg)](https://travis-ci.org/olahol/request-animation-loop)

## Install

```bash
npm install request-animation-loop --save
```

or

```bash
bower install request-animation-loop --save
```

## Example

Rotate an element for 1 second.

```javascript
var deg = 0;
var id = requestAnimationLoop(function (deltaTime) {
  deg += deltaTime * 0.1;
  el.style.transform = "rotate(" + deg + "deg)";
});

setTimeout(function () {
  cancelAnimationLoop(id);
}, 1000);
```

## API

##### requestAnimationLoop(callback(deltaTime, id))

Start an animation loop with function `callback` which recieves a time in
milliseconds since last iteration as `deltaTime` and `id` which is the id
of the loop.

##### cancelAnimationLoop(id)

Stop animation loop with id `id`.
