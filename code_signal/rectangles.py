# https://leetcode.com/discuss/interview-question/1482150/rotatedrectsum-codesignal-quora-two-sigma-oa
# Calc max rotated 45d rectangle of (a,b), (b,a) within matrix 

def perimetr(matr, i, j, w, h):
  s = matr[i][j]
  dd = [(h, 1, 1)] if w == 1 else [(w, 1, -1)] if h == 1 else [(w, 1, -1), (h, 1, 1), (w, -1, 1), (h-1, -1, -1)]
  for n, x, y in dd:
    if n <= 1: break
    c = 1
    while c < n:
      i += x
      j += y
      c += 1
      s += matr[i][j]
  return s

def rectangles(matr, w, h):
  mm = 0
  for w_, h_ in [(w, h), (h, w)]:
    for j in range(w_-1, len(matr[0])-(h_-1)): # rectangle cols spread [j-(w-1), j+(h-1)]
      for i in range(len(matr)-(w_+h_-1)+1): # each rectangle spreads w+h-1 rows
        # square at (i,j) is sum of all perimeters of inner rectangles
        mm = max(mm, sum([perimetr(matr, i+k, j+max(k-1,0), w_-k, h_-k) for k in range(min(w_, h_))]))
  return mm

matrix = [[1,2,3,4,0],[5,6,7,8,1],[3,2,4,1,4],[4,3,5,1,6]]

print(rectangles(matrix, 2, 3))

# print(perimetr(matrix, 1, 2, 2, 1))

