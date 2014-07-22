/*globals console, Snap*/

var tree = {};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var s = Snap(800,600);

var createBranches = function(elem, parent) {
  var i, level,
      count = getRandomInt(1, 6),
      new_branch;

  elem.branches = [];
  elem.length = getRandomInt(40, 50);
  level = elem.level || 0;
  if(!level) {
    elem.x1 = 200;
    elem.y1 = 600;
  } else {
    elem.x1 = parent.x2;
    elem.y1 = parent.y2;
  }
  elem.x2 = elem.x1 - elem.length + getRandomInt(0, 100);
  elem.y2 = elem.y1 - elem.length + getRandomInt(40, 20);
  elem.level = level + 1;

  s.line(elem.x1,elem.y1,elem.x2,elem.y2).attr(
    {
      stroke: "#000",
      strokeWidth: 5
    }
  );

  for(i=0;i<count;i++) {
    new_branch = { level: level + 1 }
    if((2 - level) >= 0) {
      createBranches(new_branch, elem)
      elem.branches.push(new_branch);
    }
  }
};

createBranches(tree);
console.log(tree);
