var assert = require("assert");
var anim = require("./request-animation-loop");

var requestAnimationLoop = anim.requestAnimationLoop;
var cancelAnimationLoop = anim.cancelAnimationLoop;

global.mocha.globals(["_animationLoop*"]);

suite("request-animation-loop");

test("should test animation loop and cancel", function (done) {
  var called = 0;
  var id = requestAnimationLoop(function (dt) {
    called++;
    assert.equal(called, 1, "should be called once");
    cancelAnimationLoop(id);
    done();
  });
});

test("should test delta time", function (done) {
  var called = 0;
  var id = requestAnimationLoop(function (dt) {
    called++;
    assert.ok(dt > 0, "delta time should be above zero");
    if (called > 10) {
      cancelAnimationLoop(id);
      done();
    }
  });
});

test("should check globals", function (done) {
  var called = 0;
  var id1 = requestAnimationLoop(function (dt) {
    called++;
    assert.ok(id1 < window._animationLoopIdCounter, "id should be below global");
    assert.ok(window._animationLoopRunningLoops[id1], "id should be among running loops");
    cancelAnimationLoop(id1);
    if (called === 2) { done(); }
  });

  var id2 = requestAnimationLoop(function (dt) {
    called++;
    assert.ok(id2 < window._animationLoopIdCounter, "id should be below global");
    assert.ok(window._animationLoopRunningLoops[id2], "id should be among running loops");
    cancelAnimationLoop(id2);
    if (called === 2) { done(); }
  });
});
