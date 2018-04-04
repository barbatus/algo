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

//var input = [ '3', '40', '9', '26', '48', '34', '41', '46', '42', '10', '#' ];
//var input = [ '16', '39', '37', '7', '44', '49', '18', '9', '28', '31', '#', '#', '#' ];

const start = Date.now();
solve2(input).join(',');
const end = Date.now();
console.log((end - start) / 1000);

const start2 = Date.now();
solve3(input).join(',');
const end2 = Date.now();
console.log((end2 - start2) / 1000);
// console.log(solve2(input).join(','));
// console.log(solve1(input).join(','));
//console.log(solve1(input).join(',') === solve2(input).join(','));
