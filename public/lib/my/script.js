/*globals console, Snap*/

var tree = {};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var s = Snap(800,600);

var createBranches = function(elem, parent) {
  var i, level,
      count = getRandomInt(1, 3),
      new_branch;

  elem.branches = [];
  elem.length = getRandomInt(40, 50);
  level = elem.level || 0;
  if(!level) {
    elem.x1 = 200;
    elem.y1 = 600;
  } else {
    elem.x1 = parent.tmpx2;
    elem.y1 = parent.tmpy2;
  }
  elem.x2 = elem.x1;
  elem.y2 = elem.y1;
  elem.tmpx2 = elem.x1 - elem.length + getRandomInt(0, 100);
  elem.tmpy2 = elem.y1 - elem.length + getRandomInt(40, 20);
  elem.level = level + 1;

  var ln = s.line(elem.x1,elem.y1,elem.x2,elem.y2).attr(
    {
      stroke: "#361605",
      strokeWidth: 10-level
    }
  );

  ln.animate({
    x2: elem.tmpx2,
    y2: elem.tmpy2},
             500,
             null,
             function() {
               for(i=0;i<count;i++) {
                 new_branch = { level: level + 1 }
                 if((5 - level) >= 0) {
                   createBranches(new_branch, elem)
                   elem.branches.push(new_branch);
                 }
               }
             })
};

createBranches(tree);
console.log(tree);
