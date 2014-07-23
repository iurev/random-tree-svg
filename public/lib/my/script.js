/*globals console, Snap, setTimeout*/

var tree = {};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var s = Snap(800, 600);
var bg = s.rect(0, 0, 800, 600).attr({
  fill: '#9FDAED'
})
var sun = s.circle(-100, 300, 50).attr({
  fill: '#E1F50A'
})
bg = s.rect(0, 400, 800, 600).attr({
  fill: '#145409'
})
sun.animate({
  cx: 600,
  cy: 40
}, 1000)
console.log(sun);

var createLeaf = function(elem, count) {
  var i;
  if (!count) return;
  setTimeout(function() {
    s.circle(elem.tmpx2 + getRandomInt(-20, 20), elem.tmpy2 + getRandomInt(-20, 20), 0).attr({
      stroke: "#2BCC40",
      fill: "#2BCC40"
    }).animate({
      r: 2
    }, 10, function() {
      createLeaf(elem, count - 1);
    });
  }, 5)


}

var createBranches = function(elem, parent) {
  var i, level,
    count = getRandomInt(1, 3),
    new_branch;

  elem.branches = [];
  elem.length = getRandomInt(40, 50);
  level = elem.level || 0;
  if (!level) {
    elem.x1 = 200;
    elem.y1 = 400;
  } else {
    elem.x1 = parent.tmpx2;
    elem.y1 = parent.tmpy2;
  }
  elem.x2 = elem.x1;
  elem.y2 = elem.y1;
  elem.tmpx2 = elem.x1 - elem.length + getRandomInt(10, 100);
  elem.tmpy2 = elem.y1 - elem.length + getRandomInt(-20, 20);
  elem.level = level + 1;

  var strokeWidth = 10 - level;

  var ln = s.line(elem.x1, elem.y1, elem.x2, elem.y2).attr({
    stroke: "#361605",
    strokeWidth: 1
  });

  Snap.animate(1, strokeWidth, function(width) {
    ln.attr({
      strokeWidth: width
    })
  }, 2000);

  ln.animate({
      x2: elem.tmpx2,
      y2: elem.tmpy2
    },
    500,
    null,
    function() {
      var circle2 = s.circle(elem.tmpx2, elem.tmpy2, 1).attr({
        stroke: "#361605",
        fill: "#361605"
      });

      circle2.animate({r: strokeWidth/2}, 2000)

      createLeaf(elem, level * 4);

      for (i = 0; i < count; i++) {
        new_branch = {
          level: level + 1
        }
        if ((5 - level) >= 0) {
          createBranches(new_branch, elem)
          elem.branches.push(new_branch);
        }
      }
    })
};

createBranches(tree);
