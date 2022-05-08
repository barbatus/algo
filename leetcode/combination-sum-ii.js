function combine(candidates, sum, p, target) {
  const result = [];
  for (let i = p + 1; i < candidates.length; i++) {
    if (sum + candidates[i] > target) break;
  
    if (sum + candidates[i] === target) {
      result.push([candidates[i], candidates[p]]);
    } else {
      const next = combine(candidates, sum + candidates[i], i, target);
      for (let ires of next) {
        result.push(ires.concat(candidates[p]));
      }
    }

    while (candidates[i + 1] === candidates[i]) i++;
  }
  return result;
}

var combinationSum2 = function(candidates, target) {
  candidates.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < candidates.length - 1; i++) {
    if (candidates[i] === candidates[i - 1]) continue;
    result = result.concat(combine(candidates, candidates[i], i, target));
  }
  if (candidates.pop() === target) {
    result.push([target]);
  }
  return result;
};

console.log(combinationSum2([10,1,2,7,6,1,1,5], 9));
