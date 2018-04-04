// Find out if a number is a palindrom one.

const int = (num) => Math.floor(num);

function find(num) {
  let order = 1;
  let next = num;
  while (next = int(next / 10)) {
    order *= 10;
  }

  next = num;
  while (next) {
    const lead = order ? int(next / order) : next;
    const tail = next % 10;
    if (lead !== tail) return false;

    next = int((next % order) / 10);
    order = int(order / 100);
  }

  return true;
}

console.log(find(152621));
