# You are given two positive integer arrays nums1 and nums2, both of length n.

# The absolute sum difference of arrays nums1 and nums2 is defined as the sum of |nums1[i] - nums2[i]| for each 0 <= i < n (0-indexed).

# You can replace at most one element of nums1 with any other element in nums1 to minimize the absolute sum difference.

# Return the minimum absolute sum difference after replacing at most one element in the array nums1

from bisect import bisect_left

def minDiff(a, b):
  n = len(a)
  diff = []
  for i in range(n):
    diff.append(abs(a[i] - b[i]))

  mm = 0
  srt = sorted(a)
  for i in range(n):
    l = bisect_left(srt, b[i])
    if l > 0:
      mm = max(abs(diff[i]-(b[i]-srt[l])), mm)
    if l < n:
      mm = max(abs(diff[i]-(srt[l]-b[i])), mm)
    if l == n:
      mm = max(abs(diff[i]-(b[i]-str[n-1])), mm)
  return sum(diff) - mm

print(minDiff([10,13,9], [2,7,9]))
