# https://leetcode.com/discuss/interview-question/1527244/CodeSignal-bouncing-diagonal-matrix-or-quora-interview
# Sum values of bouncing diagonals

from functools import reduce

def bounce(matr):
  n, m = len(matr), len(matr[0])
  i = 0
  res = []
  while i < n:
    diag = []
    r, c = i, 0
    while r > 0:
      diag.append(matr[r][c])
      r -= 1
      c += 1
    while c < m:
      diag.append(matr[r][c])
      r += 1
      c += 1
    res.append([reduce(lambda x, y: x+y, diag), i])
    i += 1

  res.sort(key=lambda x: x[0])
  return list(map(lambda x: matr[x[1]][0], res))

print(bounce([[1,3,2,5],[3,2,5,0],[9,0,1,3],[6,1,0,8]]))
