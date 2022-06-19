# having array of street lamps and coverage radius find out
# what min amounts of lamps enough to cover whole street

def lights(n, lights):
  jumps = [0]*n
  for s,d in lights:
    if s-d <= 0:
      jumps[0] = max(s+d, jumps[0])
    else:
      jumps[s-d] = 2*d

  print(jumps)

  max_jump, cur_jump, jump = 0, 0, 0
  for i in range(len(jumps)-1):
    max_jump = max(jumps[i] + i, max_jump)
    if i == cur_jump:
      jump += 1
      cur_jump = max_jump
  return jump if cur_jump >= n else -1

print(lights(10, [[0,5],[1,3],[5,4],[8,3]]))