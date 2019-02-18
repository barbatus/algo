class Heap {
  constructor() {
    this.nodes = [];
    this.pos = {};
    this.size = 0;
  }

  parent(c) {
    return Math.max(Math.floor((c - 1) / 2), 0);
  }

  left(p) { return 2 * p + 1; }

  right(p) { return 2 * p + 2; }

  insert(node) {
    const { key, val } = node;
    this.nodes[this.size++] = node;
    this.pos[key] = this.size;
    this.moveUp(this.size - 1);
  }

  updateUp(key, val) {
    const pos = this.pos[key];
    this.nodes[pos].val = val;
    this.moveUp(pos);
  }

  moveUp(c) {
    let p = this.parent(c);
    while (this.nodes[p].val > this.nodes[c].val) {
      this.swap(p, c);
      c = p; p = this.parent(c);
    }
  }

  pop() {
    const root = this.nodes[0];
    const last = this.nodes[--this.size];
    this.nodes[0] = last;
    this.pos[last.key] = 0;
    let c = 0, l = this.left(c), r = this.right(c);
    while (l < this.size || r < this.size) {
      if (r < this.size && this.nodes[l].val > this.nodes[r].val) {
        l = r;
      }

      if (this.nodes[c].val > this.nodes[l].val) {
        this.swap(c, l);
      }

      c = l, l = this.left(c), r = this.right(c);
    }
    return root;
  }

  swap(c1, c2) {
    const node = this.nodes[c2];
    this.nodes[c2] = this.nodes[c1];
    this.nodes[c1] = node;

    const node1 = this.nodes[c1];
    const node2 = this.nodes[c2];
    const pos = this.pos[node1.key];
    this.pos[node2.key] = this.pos[node1.key];
    this.pos[node1.key] = pos;
  }
}

module.exports = Heap;

function test() {
  const heap = new Heap();
  const elems = [];
  Array(100).fill().forEach((elem, index) => {
    const rand = Math.floor(Math.random() * 1000);
    elems.push(rand);
    heap.insert({ key: index, val: rand });
  });

  while (heap.size) {
    console.log(heap.pop().val);
  }
}
