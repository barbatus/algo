var majorityElement = function(nums) {
  const count = new Map();
  for (let n of nums) {
    if (count.has(n)) {
      count.set(n, count.get(n) + 1);
    } else {
      count.set(n, 1);
    }

    if (count.size === 3) {
      Array(count.keys()).forEach((key) => {
        const value = count.get(key);
        if (value === 1) {
          count.delete(key);
        } else {
          count.set(key, value - 1);
        }
      });
    }
  }

  const res = [];
  const len = nums.length;
  count.forEach((value, key) => {
    const s = nums.reduce((acc, n) => acc += (n === key) ? 1 : 0, 0);
    if (s > len / 3) res.push(key);
  });

  return res;
};

console.log(majorityElement([0,0,0]));
