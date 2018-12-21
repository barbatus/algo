const Heap = require('./heap');

function findPath(s, graph) {
  const n = graph.length;
  const paths = [];
  for (let i = 0; i < n; i++) {
    paths.push({ node: -1 });
  }

  const queue = new Heap();
  queue.insert(s, 0);
  paths[s] = { node: 0, path: 0 };
  while(queue.size) {
    const node = queue.pop();
    for (const n in graph[node]) {
      const i = parseInt(n);
      const path = paths[node].path + graph[node][i];
      if (paths[i].node === -1) {
        queue.insert(i, path);
        paths[i] = { node, path };
        continue;
      }
      if (paths[i].path > path) {
        queue.update(i, path);
        paths[i] = { node, path };
      }
    }
  }

  return paths;
}

const graph = [];
graph[0] = {};
graph[1] = {};
graph[2] = {};
graph[3] = {};
graph[4] = {};
graph[5] = {};

graph[0][1] = 3; graph[0][2] = 2; graph[0][3] = 20;
graph[1][0] = 3; graph[1][4] = 4; graph[1][5] = 2;
graph[2][4] = 18; graph[2][0] = 2;
graph[3][4] = 1; graph[3][0] = 20;
graph[4][1] = 4; graph[4][2] = 18; graph[4][3] = 1;
graph[5][1] = 2;

const s = 0;
const paths = findPath(s, graph);
for (let i = 0; i < graph.length; i++) {
  if (i !== s) {
    console.log(paths[i]);
  }
}
