def pali(str):
  def check(tmp):
    return len(tmp) >= 3 and tmp[:len(tmp)//2] == tmp[(len(tmp)+1)//2:][::-1]

  i = 0
  while i <= len(str):
    if check(str[0:i]):
      str = str[i:]
      i = 0
    else:
      i += 1
  return str

print(pali('aaacodadoc'))
