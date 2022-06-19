from collections import *

def maxPalindrome(str):
  count = defaultdict(int)
  for a in str:
    count[a] += 1
  s, mid = '', ''
  for k in list(sorted(count.keys())):
    s += k*(count[k]//2)
    if count[k] % 2 == 1: mid = k

  return s + mid + s[::-1]

print(maxPalindrome('abcacba'))
