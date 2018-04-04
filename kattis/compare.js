var solve1 = require('./cookies').default;
var solve2 = require('./cookies_heap').default;
var solve3 = require('./cookies_avl').default;

var random = () => Math.random() + 1;

function generate() {
  var res = [];
  for (var i = 0; i < 300000; i++) {
    res.push(Math.floor(random() * 300000).toString());
  }
  for (var i = 0; i < 300000; i++) {
    res.push('#');
  }
  for (var i = 0; i < 300000; i++) {
    res.push(Math.floor(random() * 300000).toString());
  }
  for (var i = 0; i < 300000; i++) {
    res.push('#');
  }
  return res;
}

var input = generate();

const start = Date.now();
solve2(input).join(',');
const end = Date.now();
console.log((end - start) / 1000);

const start2 = Date.now();
solve3(input).join(',');
const end2 = Date.now();
console.log((end2 - start2) / 1000);
