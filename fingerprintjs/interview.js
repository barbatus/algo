function deepCopy(node) {
  if (typeof node === 'number') return node;

  const res = {};
  const stack = [[node, null, res]];
  while (stack.length) {
    const [top, name, parent] = stack.pop();
    if (typeof top === 'number') {
      parent[name] = top;
    } else {
      const next = name ? (parent[name] = {}) : parent;
      for (let key of Object.getOwnPropertyNames(top)) {
        stack.push([top[key], key, next]);
      }
    }
  }
  return res;
}

console.log(deepCopy({a: 1, b: {c: 2}}));
console.log(deepCopy({a: 1, b: {c: 2}}));
