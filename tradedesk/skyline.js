function insert(queue, y) {
  var l = 0;
  var r = queue.length - 1;

  while (true) {
    var mid = Math.floor((l + r) / 2);
    if (r - l <= 1) {
      if (queue[l] >= y) {
        queue.splice(l, 0, y);
        return;
      }
      if (y > queue[r]) {
        queue.splice(r + 1, 0, y);
        return;
      }
      queue.splice(r, 0, y);
      return;
    }

    if (y > queue[mid]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
}

function remove(queue, y) {
  var l = 0;
  var r = queue.length - 1;

  while (true) {
    var mid = Math.floor((l + r) / 2);
    if (queue[mid] === y) {
      queue.splice(mid, 1);
      return;
    }
    if (y > queue[mid]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
}

function skyline(arr) {
  var points = arr.reduce((accum, b) => {
    accum.push({ ...b.s, e: false });
    accum.push({ ...b.e, e: true });
  }, []);

  points.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  var queue = [];
  var skyline = [{ x: 0, y: 0 }];
  var count = 0;
  var prevY = 0;
  var prevX = 0;
  while (count < arr.length) {
    next = arr[count];
    if (next.e) {
      remove(queue, next.y);
    } else {
      insert(queue, next.y);
    }

    if (!queue.length) {
      skyline.push({ y: next.y, x: prevX });
      skyline.push(next);
      skyline.push({ y: 0, x: next.x });
      break;
    }

    var top = queue.peek();
    if (prevY !== top.y) {
      skyline.push({ y: prevY, x: next.x });
      prevY = top.y;
      prevX = next.x;
    }
    count++;
  }

  var result = [skyline[0]];
  for (let i = 1; i < skyline.length - 1; i++) {
    if (skyline[i].x !== skyline[i + 1].x) {
      result.push(skyline[i]);
    }
  }
  result.push(skyline[skyline.length - 1]);
}
