var minMeetingRooms = function(intervals) {
  intervals.sort((i1, i2) => i1[0] - i2[0]);
  const ends = intervals.slice().sort((i1, i2) => i1[1] - i2[1]);

  let max = 0;
  let rooms = 0;
  let end = 0;
  for (let int of intervals) {
    while (int[0] >= ends[end][1]) {
      rooms--;
      end++;
    }

    rooms++;
    max = Math.max(max, rooms);
  }

  return max;
};


[[0,30],[5,10],[15,20],[19,40],[21,30],[41,43]]
console.log(minMeetingRooms([[0, 30],[5, 10],[15, 20], [30, 40]]));