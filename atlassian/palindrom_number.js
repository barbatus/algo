// Find out if a number is a palindrom one.

const int = (num) => Math.floor(num);

function find1(num) {
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

function find2(num) {
  if (int(num/10) === 0) return true;
  if (num < 0 || num%10 === 0) return false;

  let prev = 0;
  while (num > prev) {
    prev = prev*10 + num%10;
    num = int(num/10);
  }

  return num === prev || int(prev/10) === num;
}

console.log(find2(1268621));
