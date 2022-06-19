from collections import defaultdict

def subarrays(arr, m, k):
  l, r = 0, 0
  count = defaultdict(int)
  count[0] = 1 if m == 1 else 0
  sum, res = 0, 0

  while r < len(arr):
    sum += count[k - arr[r]]
    count[arr[r]] = count[arr[r]] + 1
    if r >= m-1:
      if sum: res += 1
      count[arr[l]] -= 1
      sum -= count[k - arr[l]]
      l += 1
    r += 1
  return res

print(subarrays([2, 4, 7, 5, 3, 5, 8, 5, 1, 7], 4, 10))
print(subarrays([15, 8, 8, 2, 6, 4, 1, 7], 2, 8))
