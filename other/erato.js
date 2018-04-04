
function erato(n) {
  const sieve = [];
  for (let i = 0; i < n; i++) {
    sieve[i] = true;
  }
  let i = 2;
  while (Math.pow(i, 2) <= n) {
    if (sieve[i - 1]) {
      let k = Math.pow(i, 2);
      while (k <= n) {
        sieve[k - 1] = false;
        k += i;
      }
    }
    i += 1;
  }
  return sieve;
}

function printPrime(n) {
  const sieve = erato(n);
  const primes = [];
  for (let i = 0; i < sieve.length; i++) {
    if (sieve[i]) {
      primes.push(i + 1);
    }
  }
  return primes;
}

console.log(printPrime(100));
