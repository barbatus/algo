function parse(str) {
  const regExp = /([-+]?[0-9]*x?)/g;
  let m;
  let a = 0;
  let x = 0;
  str = str
    .replace(/([-+]?0x)/g, '')
    .replace(/^x/, '1x')
    .replace(/\-x/g, '-1x')
    .replace(/\+x/g, '+1x');
  while (m = regExp.exec(str)[0]) {
    const num = parseInt(m);
    if (m.endsWith('x')) {
      x += num;
    } else {
      a += num;
    }
  }

  return [x, a];
}

var solveEquation = function(equation) {
  const parts = equation.split('=');

  let [lx, la] = parse(parts[0]);
  let [rx, ra] = parse(parts[1]);

  if (la === ra && lx === rx) return 'Infinite solutions';

  if (la === ra) return 'x=0';

  if (lx === rx) return 'No solution';

  return `x=${(ra - la) / (lx - rx)}`;
};

console.log(solveEquation("1-x+x-x+x=99"));
