//https://leetcode.com/problems/task-scheduler/description/


function solve(tasks, n) {
  const map = {};

  let index = 0;
  let result = 0;
  while (index < tasks.length) {
    const last = map[tasks[index]];
    if (!last || result - last > n) {
      map[tasks[index]] = result;
      index++;
    }
    result++;
  }
}

function solve2(tasks, n) {
  let map = [];
  for (let i = 0; i < 26; i++) {
    map[i] = 0;
  }
  for (let i = 0; i < tasks.length; i++) {
    map[tasks.charCodeAt(i) - 65]++;
  }
  map = map.sort((a, b) => a - b);
  let time = 0;
  while (map[25]) {
    let i = n + 1;
    let next = 25;
    while (i) {
      if (!map[25]) break;
      if (map[next] > 0) {
        map[next]--;
      }
      i--;
      next--;
      time++;
    }
    map = map.sort((a, b) => a - b);
  }

  return time;
}

console.log(solve('AAABBB', 2));
