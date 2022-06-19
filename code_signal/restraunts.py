# Restraunts preferences

# https://leetcode.com/discuss/interview-question/1454144/preferredRestaurant-(Codesignal)-help-needed

from functools import cmp_to_key

def restraunts(preferences):
  n = len(preferences[0])
  ratings = [[i, []] for i in range(1, n+1)]

  for i in range(3):
    for j in range(n):
      ratings[preferences[i][j]-1][1].append(j)
  
  def rated_higher(r1, r2):
    return (r1[0] < r2[0] and r1[1] < r2[1]) or (r1[1] < r2[1] and r1[2] < r2[2]) or (r1[0] < r2[0] and r1[2] < r2[2])

  def compare(a, b):
    r1, r2 = a[1], b[1]
    if rated_higher(r1, r2): return -1
    if rated_higher(r2, r1): return 1
    return 0

  ratings = sorted(ratings, key=cmp_to_key(compare))

  for i in range(1, n):
    if (compare(ratings[0], ratings[i]) >= 0):
      return -1

  return ratings[0][0]

print(restraunts([[1, 2, 3, 4], [3, 1, 4, 2], [4, 2, 1, 3]]))
print(restraunts([[1, 2, 3], [2, 3, 1], [3, 1, 2]]))
