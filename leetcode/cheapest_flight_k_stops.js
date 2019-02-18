// https://leetcode.com/problems/cheapest-flights-within-k-stops/

const Heap = require('../data_structures/heap');

var findCheapestPrice = function(n, flights, src, dst, K) {
  const heap = new Heap();
  heap.insert({ key: src, k: 0, val: 0 });

  while (heap.size) {
    const top = heap.pop();
    if (top.key === dst) return top.val;
    if (top.k < K + 1) {
      for (let i = 0; i < flights.length; i++) {
        if (flights[i][0] === top.key) {
          const cost = top.val + flights[i][2];
          heap.insert({ key: flights[i][1], k: top.k + 1, val: cost });
        }
      }
    }
  }
  return -1;
};

console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500],[0,5,1000],[2,3,500],[3,4,500],[3,0,100]], 1, 5, 2));
// console.log(findCheapestPrice(1, [[0,4,100],[4,1,100]], 0, 1, 1));
