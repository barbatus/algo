// https://leetcode.com/problems/partition-list/description/
// Linked list partition

function solve1(head, x) {
  if (!head) return head;

  let last = head;
  while (last.next) last = last.next;

  let cur = head;
  let fkHead = { next: head };
  let prev = fkHead;
  let tail = last;
  let next = cur;
  while (cur !== last && next !== tail) {
    cur = next;
    if (cur.value >= x) {
      prev.next = cur.next;
      tail.next = cur;
      tail = cur;
      next = cur.next;
      cur.next = null;
    } else {
      next = cur.next;
      prev = cur;
    }
  }

  return fkHead.next;
}

function ListNode(val, next) {
  this.value = val;
  this.next = next;
}

function solve2(head, x) {
  const node1 = {}, node2 = {};
  let p1 = node1, p2 = node2;
  while (head) {
    if (head.value < x) {
      p1 = p1.next = head;
    } else {
      p2 = p2.next = head;
    }
    head = head.next;
  }
  p2.next = null;
  p1.next = node2.next;
  return node1.next;
}

// 1->4->3->2->5->2
// 10 -> 10 -> 10 -> 3 -> 1 -> 1 -> 2

let node = new ListNode(2);
node = new ListNode(1, node);
node = new ListNode(1, node);
node = new ListNode(3, node);
node = new ListNode(10, node);
node = new ListNode(10, node);
node = new ListNode(10, node);

let head = solve1(node, 3);
const res = [];
while (head) {
  res.push(head.value);
  head = head.next;
}
console.log(res);
