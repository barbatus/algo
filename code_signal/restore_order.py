# given a bunch of pairwise numbers placed on a circle.
# The numbers are shuffled return the inital state of the circle.
# For example I/P [(3,5),(1,4),(2,4),(1,5),(2,3)] output [3,5,1,4,2]

from collections import defaultdict

def restore_order(pairs):
  map = defaultdict(list)

  for p1, p2 in pairs:
    map[p1].append(p2)
    map[p2].append(p1)
  
  prev, cur = pairs[0][0], map[pairs[0][0]][0]
  order, start = [prev], prev

  while start != cur:
    order.append(cur)
    for p in map[cur]:
      if p != prev:
        prev = cur
        cur = p
        break
  
  return order

print(restore_order([(3,5),(1,4),(2,4),(1,5),(2,3)]))

