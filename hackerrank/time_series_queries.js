// https://www.hackerrank.com/contests/gs-codesprint/challenges/time-series-queries/problem

function find(series, start, end, v) {
  if (end - start === 0) {
    return v > series[end].v ? -1 : series[end].i;
  }

  if (end - start === 1) {
    return v > series[end].v ? -1 :
      (v > series[start].v ? series[end].i : series[start].i);
  }

  const mid = start + Math.floor((end - start) / 2);
  if (v > series[mid].v) {
    return find(series, mid + 1, end, v);
  }
  return find(series, start, mid, v);
}

function build(t, p) {
  const n = t.length;

  const series = [];
  for (let i = 0; i < n; i++) {
    series.push({ v: t[i], i: 0 });
  } 

  let max = p[n - 1];
  for (let i = n - 1; i >= 0; i--) {
    if (p[i] > max) {
      max = p[i];
    }
    series[i].i = max;
  }

  max = p[0];
  const prices = [{ v: max, i: t[0] }];
  for (let i = 1; i <= n; i++) {
    if (p[i] > max) {
      max = p[i];
      prices.push({ v: max, i: t[i] });
    }
  }

  return function(type, v) {
    if (type === 1) {
      return find(prices, 0, prices.length - 1, v);
    }
    return find(series, 0, series.length - 1, v);
  };
}

//const query = build([1, 2, 4, 8, 10, 12, 14, 16], [5, 3, 12, 1, 10, 100, 4, 50]);
const query = build([1], [5]);
console.log(query(1, 5));
