
function insertNode(queue, node) {
  const len = queue.length;
  if (!len) {
    queue.push(node);
    return queue;
  }

  let start = 0;
  let end = len - 1;
  if (node.path < queue[end].path) {
    queue.push(node);
    return queue;
  }
  if (node.path > queue[start].path) {
    queue.splice(start, 0, node);
    return queue;
  }
 
  while (end - start > 1) {
    const mid = Math.floor((end - start) / 2);
    if (queue[start + mid].path > node.path) {
      start = start + mid;
    } else {
      end = start + mid;
    }
  }
  queue.splice(end, 0, node);
  return queue;
}

function updateNode(queue, node, path) {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].i === node) {
      queue[i].path = path;
      for (let j = i + 1; j < queue.length; j++) {
        if (path > queue[j].path) {
          if (j === i + 1) return queue;
          queue.splice(j, 0, queue[i]);
          queue.splice(i, 1);
          return queue;
        }
      }
      queue.push(queue[i]);
      queue.splice(i, 1);
      return queue;
    }
  }
}

function findPath(s, graph) {
  const n = graph.length;
  const paths = [];
  for (let i = 0; i < n; i++) {
    paths.push(-1);
  }

  const queue = [{ i: s, path: 0 }];
  paths[s] = 0;
  while(queue.length) {
    const node = queue.pop().i;
    for (const n in graph[node]) {
      const i = parseInt(n);
      const path = paths[node] + graph[node][i];
      if (paths[i] === -1) {
        insertNode(queue, { i, path });
        paths[i] = path;
        continue;
      } 
      if (paths[i] > paths[node] + graph[node][i]) {
        updateNode(queue, i, path);
        paths[i] = path;
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
