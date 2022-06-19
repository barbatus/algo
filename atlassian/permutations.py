# Given a list of numbers from 1 to n. find all the good permutations.
# good permutations are the ones in which arr[j] and arr[j+1] have differenct parity( remainder when divieded by 2).

import itertools

def next(arr):
  i = len(arr) - 1
  while i > 0 and arr[i-1] > arr[i]: i -= 1

  arr[i:] = arr[i:][::-1]

  if i >= 1:
    num, j = arr[i-1], i-1
    while num >= arr[i]: i += 1
    arr[j], arr[i] = arr[i], num

  return arr

def permute(arr):
  it = arr[:]
  res = [it]
  while True:
    it = next(it)
    if it == arr:
      break
    res.append(it[:])

  return res

def solve(n):
  odd, even = [], []
  for i in range(1, n+1, 2):
    odd.append(i)
  for i in range(2, n+1, 2):
    even.append(i)

  ops = permute(odd)
  eps = permute(even)

  res = []
  for perm1 in ops:
    for perm2 in eps:
      if len(perm1) >= len(perm2):
        res.append([x for x in itertools.chain.from_iterable(itertools.zip_longest(perm1,perm2)) if x])
      if len(perm1) <= len(perm2):
        res.append([x for x in itertools.chain.from_iterable(itertools.zip_longest(perm2,perm1)) if x])
  return res

print(solve(6))
