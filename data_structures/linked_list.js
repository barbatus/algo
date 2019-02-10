class LinkedList {
  constructor() {
    this.head = { prev: null, next: null };
    this.tail = { prev: null, next: null };
    this.head.prev = this.tail;
    this.tail.next = this.head;
    this.size = 0;
  }

  poll() {
    const node = this.head.prev;
    if (node === this.tail) return null;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
    return node;
  }

  offer(node) {
    const next = this.tail.next;
    this.tail.next = node;
    node.next = next;
    node.prev = this.tail;
    next.prev = node;
    this.size++;
  }

  render() {
    let next = this.tail.next;
    while (next !== this.head) {
      next = next.next;
    }
  }
}

module.exports = LinkedList;
