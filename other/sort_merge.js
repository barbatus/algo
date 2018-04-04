function sortMerge(arr, start, end) {
  if ((end - start) <= 1) {
    if (arr[end] < arr[start]) {
      const elem = arr[end];
      arr[end] = arr[start];
      arr[start] = elem;
    }
    return arr.slice(start, end + 1);
  }

  const mid = start + Math.floor((end - start) / 2);
  const res1 = sortMerge(arr, start, mid);
  const res2 = sortMerge(arr, mid + 1, end);
  let merged = [];
  let ind1 = 0; let ind2 = 0;
  while(ind1 < res1.length || ind2 < res2.length) {
    if (ind1 === res1.length) {
      merged = merged.concat(res2.slice(ind2));
      break;
    }
    if (ind2 === res2.length) {
      merged = merged.concat(res1.slice(ind1));
      break;
    }

    if (res1[ind1] < res2[ind2]) {
      merged.push(res1[ind1]);
      ind1++;
      continue;
    }
    if (res1[ind1] > res2[ind2]) {
      merged.push(res2[ind2]);
      ind2++;
      continue;
    }
    merged.push(res1[ind1]);
    merged.push(res2[ind2]);
    ind1++;
    ind2++;
  }
  return merged;
}

function sort(arr) {
  return sortMerge(arr, 0, arr.length - 1);
}

console.log(sort([2, 9, 4, 10, 6, 300, 4, 100, 10, 1, 1, 5, 5, 70, 40, 80, 11]))
