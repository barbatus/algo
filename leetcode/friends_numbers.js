// Friend numbers -- two numbers that share at least one digit
// Count all friend numbers. 

function isFriends(num1, num2) {
  for (let i = 0; i < num1.length; i++) {
    if (num2.indexOf(num1[i]) !== -1) {
      return true;
    }
  }

  return false;
}

function calcFriends(num) {
  if (num - 1 <= 0) return 0;

  let count = 1;
  for (let i = 1; i <= num - 1; i++) {
    count *= count * i;
  }
  return count;
}

function solve(nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const str = nums[i].toString();
    const digits = {};
    for (let j = 0; j < str.length; j++) {
      digits[str[j]] = true;
    }
    const key = Object.keys(digits).join('');
    map[key] = map[key] ? map[key] + 1 : 1;
  }

  let count = Object.values(map).reduce((accum, num) => accum + calcFriends(num), 0);
  const unique = Object.keys(map);
  for (let i = 0; i < unique.length; i++) {
    for (let j = i + 1; j < unique.length; j++) {
      if (isFriends(unique[i], unique[j])) {
        count++;
      }
    }
  }
  return count;
}

console.log(solve([11, 12, 1100, 1200, 5555]));
