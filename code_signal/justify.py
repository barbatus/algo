# Code signal #3: justify array of lines on the screen limited by screen width

def justify2(paragraphs, width):
  def align(str):
    pad = (width - len(str))//2 - 1
    return str.rjust(pad+len(str), ' ').ljust(width-2, ' ').ljust(width-1, '*').rjust(width, '*')

  i, j, res = 0, 0, [''.ljust(width, '*')]
  while i < len(paragraphs):
    line = ''
    while j < len(paragraphs[i]) and len(line + paragraphs[i][j]) <= width:
      line += paragraphs[i][j] + ' '
      j += 1

    res.append(align(line.strip()))

    if j == len(paragraphs[i]):
      i += 1
      j = 0

  res.append(''.ljust(width, '*'))
  return res

print(justify2([["hello", "world"], ["How", "areYou", "doing"], ["Please look", "and align", "to center"]], 16))