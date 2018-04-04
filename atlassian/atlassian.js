// Tasks often given in tests by Atlassian

// The look-and-say sequence is the sequence of below integers:
// 1, 11, 21, 1211, 111221, 312211, 13112221, 1113213211, …
function countAndSay(n) {
  if (n === 1) return "1";

  if (n === 2) return "11";

  let str = "11";
  for (i = 2; i < n; i++) {
    let count = 1;
    let tmp = "";
    let j;
    for (j = 1; j < str.length; j++) {
      if (str[j] !== str[j - 1]) {
        tmp += count;
        tmp += str[j - 1];
        count = 0;
      }
      count += 1;
    }
    if (count) {
      tmp += count;
      tmp += str[j - 1];
    }
    str = tmp;
  }
  return str;
}

function base7(n) {
  const base = "0atlsiN";
  let div = n;
  let str = [];
  let i = 0;
  while (div > 0) {
    const res = div % 7;
    div = (div / 7) >> 0;
    str[i] = base[res];
    i++;
  }
  return str.reverse().join('');
}

/* 
  print stairs:
  #
  ##
  ###
  ####
  ....
*/
function printStair(n) {
  let row = "";
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      row += " ";
    }
    for (let j = 0; j < n - i; j++) {
      row += "#";
    }
    row += '\n';
  }
  console.log(row);
}

printStair(20);
