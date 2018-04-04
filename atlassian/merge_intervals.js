function merge(intervals) {
  intervals = intervals.sort((a, b) => a.s - b.s);
  let start = intervals[0].s;
  let end = intervals[0].e;
  const result = [];
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i].s > end) {
      result.push({ s: start, e: end });
      start = intervals[i].s;
      end = intervals[i].e;
    } else {
      end = Math.max(end, intervals[i].e);
    }
  }
  result.push({ s: start, e: end });
  return result;
}

console.log(merge([{ s: 1, e: 3}, { s: 2, e: 6}, { s: 7, e: 20}, { s: 5, e: 6}, { s: 21, e: 22}]));
