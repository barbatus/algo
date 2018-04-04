function insert(seq, diam) {
  var n = seq.length - 1;
  if (!seq.length || diam >= seq[n]) {
    seq.push(diam);
    return;
  }

  if (seq[0] >= diam) {
    seq.splice(0, 0, diam);
    return;
  }

  var ll = 0;
  var rr = n;
  while (rr - ll > 1) {
    var mid = ll + Math.floor((rr - ll) / 2);
    if (diam > seq[mid]) {
      ll = mid;
      continue;
    }
    rr = mid;
  }
  seq.splice(ll + 1, 0, diam);
}

function print(value) {
  console.log(value);
}

var input = [
  '1',
  '10',
  '2',
  '#',
  '3',
  '#',
  '4',
  '#',
  '#',
  '#',
  '5',
  '30',
  '10',
  '#',
  '1',
  '3',
  '#',
  '#',
  '#',
  '#'
];

var line = 0;
function readline() {
  return input[line++];
}

var next;
var seq = [];
var res = [];
// while (next = readline()) {
//   if (next === '#') {
//     var mid = Math.floor(seq.length / 2);
//     res.push(seq[mid]);
//     seq.splice(mid, 1);
//     continue;
//   }
//   const diam = parseInt(next);
//   insert(seq, diam);
// }
// print(res.join('\n'));

exports.default = function(lines) {
  seq.length = 0;
  res.length = 0;
  for (var i = 0; i < lines.length; i++) {
    var next = lines[i];
    if (next === '#') {
      var mid = Math.floor(seq.length / 2);
      res.push(seq[mid]);
      seq.splice(mid, 1);
      continue;
    }
    const diam = parseInt(next);
    insert(seq, diam);
  }

  return res;
}
