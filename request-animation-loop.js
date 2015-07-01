(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    var exports = factory();
    root.requestAnimationLoop = exports.requestAnimationLoop;
    root.cancelAnimationLoop = exports.cancelAnimationLoop;
  }
}(this, function () {
  "use strict";

  var exports = {};

  var animationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };

  var isUndefined = function (v) {
    return typeof v === "undefined";
  };

  if (isUndefined(window._animationLoopIdCounter)) {
    window._animationLoopIdCounter = 0;
  }

  if (isUndefined(window._animationLoopRunningLoops)) {
    window._animationLoopRunningLoops = {};
  }

  var isRunning = function (id) {
    return !!window._animationLoopRunningLoops[id];
  };

  var nextId = function () {
    return window._animationLoopIdCounter++;
  };

  var timeStamp = function () {
    if (window.performance) {
      return window.performance.now();
    }

    return +new Date();
  };

  var animationLoop = function (id, fn, start) {
    animationFrame(function (end) {
      end = end || timeStamp();
      var dt  = end - start;
      if (dt < 0) { dt = 0; }
      if (isRunning(id)) {
        animationLoop(id, fn, end);
        fn(dt, id);
      }
    });
  };

  exports.requestAnimationLoop = function (fn) {
    var id = nextId();
    window._animationLoopRunningLoops[id] = true;
    animationLoop(id, fn, timeStamp());
    return id;
  };

  exports.cancelAnimationLoop = function (id) {
    delete window._animationLoopRunningLoops[id];
  };

  return exports;
}));
