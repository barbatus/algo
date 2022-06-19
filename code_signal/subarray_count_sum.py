def subarraysCountBySum(arr, k, s):
  dict = {0: -1}
  i, sum, count = 0, 0, 0
  while i < len(arr):
    sum += arr[i]
    if sum-s in dict and i-dict[sum-s]<=k:
      count += 1
    dict[sum] = i
    i += 1
  return count

print(subarraysCountBySum([1, 2, 4, -1, 6, 1], 3, 6))
print(subarraysCountBySum([1, 0], 2, 1))
