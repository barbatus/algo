function add(a) {
  let sum = a;
  const func = (b) => {
    if (b === undefined) {
      return sum;
    }
    sum += b;
    return func;
  };
  return func;
}

console.log(add(1)(2)(3)());
