/*globals console, Snap*/

var tree = {};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createBranches = function(elem) {
  var i, level,
      count = getRandomInt(1, 6),
      new_branch;

  elem.branches = [];
  elem.length = getRandomInt(3, 20);
  level = elem.level || 0;
  elem.level = level + 1;

  for(i=0;i<count;i++) {
    new_branch = { level: level + 1 }
    if((2 - level) >= 0) {
      createBranches(new_branch, true)
      elem.branches.push(new_branch);
    }
  }
};

createBranches(tree);
console.log(tree);
var s = Snap(800,600);
var bigCircle = s.circle(150, 150, 100);