function ccw(p1, p2, p3) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

function norm(vect) {
  return Math.sqrt(vect.x * vect.x + vect.y * vect.y);
}

function buildPoly(points) {
  var n = points.length;
  points.sort((a, b) => {
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return a.x - b.x;
  });

  var start = points[0];
  points.sort((a, b) => {
    if (a === start) return -1;
    if (b === start) return 1;

    var vect1 = { x: a.x - start.x, y: a.y - start.y };
    var vect2 = { x: b.x - start.x, y: b.y - start.y };
    var cos1 = vect1.x / norm(vect1);
    var cos2 = vect2.x / norm(vect2);

    return cos2 - cos1;
  });
  var end = points[n - 1];
  points.splice(0, 0, end);

  var p = 1;
  for (var i = 2; i <= n; i++) {
    while (ccw(points[p - 1], points[p], points[i]) <= 0) {
      if (p > 1) {
        p -= 1;
        continue;
      }
      if (i === n) {
        break;
      }
      i++;
    }

    p += 1;
    points[p] = points[i];
  }

  return points.slice(1, p + 1);
}

function calcArea(poly) {
  if (poly.length <= 2) return 0;

  var n = poly.length;
  var sum = 0;
  for (var i = 0; i < n - 1; i++) {
    sum += poly[i].x * poly[i + 1].y - poly[i + 1].x * poly[i].y;
  }
  sum += poly[n - 1].x * poly[0].y - poly[0].x * poly[n - 1].y;
  return sum / 2;
}

function solve(points) {
  var area = calcArea(buildPoly(points));
  var str = area.toString();
  if (str.indexOf('.') === -1) {
    return str + '.0';
  }
  return str;
}

// function print(value) {
//   console.log(value);
// }

// var input = [
//   '5',
//   '0 0',
//   '10 10',
//   '0 10',
//   '10 0',
//   '5 5',
//   '10',
//   '6 39',
//   '28 25',
//   '28 13',
//   '31 3',
//   '11 19',
//   '31 17',
//   '26 19',
//   '18 13',
//   '30 11',
//   '25 20',
//   '0'
// ];

// var line = 0;
// function readline() {
//   return input[line++];
// }

var n;
while (n = parseInt(readline())) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var point = readline().split(' ');
    points.push({ x: parseInt(point[0]), y: parseInt(point[1]) });
  }
  print(solve(points));
}

// [
//   { x: 1, y: 1 },
//   { x: 2, y: 3 },
//   { x: 5, y: 2 },
//   { x: 7, y: 7 },
//   { x: 3, y: 9 },
//   { x: 2, y: 4 },
//   { x: 1, y: 2 },
// ]

// [
//   { x: 6, y: 39 },
//   { x: 28, y: 25 },
//   { x: 28, y: 13 },
//   { x: 31, y: 3 },
//   { x: 11, y: 19 },
//   { x: 31, y: 17 },
//   { x: 26, y: 19 },
//   { x: 18, y: 13 },
//   { x: 30, y: 11 },
//   { x: 25, y: 20 },
// ]

// console.log(solve([
//   { x: 6, y: 39 },
// ]));
