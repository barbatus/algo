# You are given an array of non-negative integers numbers. You are allowed to choose any number from this array and swap any two digits in it. If after the swap operation the number contains leading zeros, they can be omitted and not considered (eg: 010 will be considered just 10).

# Your task is to check whether it is possible to apply the swap operation at most once, so that the elements of the resulting array are strictly increasing.

# Example

# For numbers = [1, 5, 10, 20], the output should be makeIncreasing(numbers) = true.
# The initial array is already strictly increasing, so no actions are required.

# For numbers = [1, 3, 900, 10], the output should be makeIncreasing(numbers) = true.
# By choosing numbers[2] = 900 and swapping its first and third digits, the resulting number 009 is considered to be just 9. So the updated array will look like [1, 3, 9, 10], which is strictly increasing.

def make_increasing(numbers):
  def descrease(num1, num2):
    str1, str2 = str(num1), str(num2)
    i = 0
    if len(str1) == len(str2) and num1 != num2:
      while str1[i] == str2[i]: i += 1

    tmp = list(str1)
    for j in range(i+1, len(str1)):
      tmp[i], tmp[j] = tmp[j], tmp[i]
      num = int(''.join(tmp))
      if num < num2: return num
      else: tmp[i], tmp[j] = tmp[j], tmp[i]
    return num1

  modified = False
  for i in range(0, len(numbers)-1):
    if numbers[i] < numbers[i+1]: continue

    if modified: return False

    num = descrease(numbers[i], numbers[i+1])

    if num < numbers[i+1] and (i == 0 or num > numbers[i-1]): modified = True
    else: return False

  return True


print(make_increasing([1000, 10, 9]))
