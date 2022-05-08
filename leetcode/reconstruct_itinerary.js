var findItinerary = function(tickets) {
  const map = {};
  for (let ticket of tickets) {
    map[ticket[0]] = map[ticket[0]] || [];
    map[ticket[1]] = map[ticket[1]] || [];
  }
  for (let ticket of tickets) {
    map[ticket[0]].push(ticket[1]);
  }

  for (let key of Object.keys(map)) {
    map[key].sort((a, b) => -a.localeCompare(b));
  }

  const stack = ['JFK'];
  const path = [];
  while (stack.length) {
    while (map[stack[stack.length - 1]].length) {
      stack.push(map[stack[stack.length - 1]].pop());
    }
    path.push(stack.pop());
  }

  return path.reverse();
};


console.log(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]))

