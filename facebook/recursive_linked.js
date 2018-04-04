function Node(value, next) {
  this.value = value;
  this.next = next;
}

// 1 -> (2 -> 4 -> 5 -> 6 -> undefined) -> (10 -> (24 -> 30 -> 50 - undefined) -> 500 -> undefined) -> 20 -> undefined

var n1 = new Node(20);
var n21 = new Node(500);
var n211 = new Node(50);
var n212 = new Node(30, n211);
var n213 = new Node(24, n212);
var n22 = new Node(n213, n21);
var n23 = new Node(10, n22);
var n2 = new Node(n23, n1);
var n31 = new Node(6);
var n32 = new Node(5, n31);
var n33 = new Node(4, n32);
var n34 = new Node(2, n33);
var n3 = new Node(n34, n2);
var n4 = new Node(1, n3);

function shift(node) {
  let prev = node;
  let next = node.next;
  while (next) {
    prev.value = next.value;
    if (!next.next) break;
    prev = next;
    next = prev.next;
  }
  prev.next = undefined;
  return prev;
}

function flatten(head) {
  if (!head) { return head; }

  if (typeof head.value === 'number') {
    flatten(head.next);
    return head;
  }

  let next = head.next;
  const first = flatten(head.value);
  head.next = first;
  const last = shift(head);
  next = flatten(next);
  last.next = next;
  return head;
}

var node = flatten(n4);
while (node) {
  console.log(node.value);
  node = node.next;
}
