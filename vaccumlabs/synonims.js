import fs from 'fs';
import readline from 'readline';


function solve(dict, queries) {
  const dfs = (word, visit) => {
    if (visit.has(word)) return new Set();
    if (!dict[word]) return new Set([word]);
    visit.add(word);
    const res = dict[word];
    res.add(word);
    for (let p of dict[word]) {
      for (let q of dfs(p, visit)) {
        res.add(q);
      }
    }
    return res;
  }

  const result = [];
  for (let i = 0; i < queries.length; i++) {
    if (queries[i][0] == queries[i][1]) {
      result.push('synonyms');
    } else {
      const p1 = dfs(queries[i][0], new Set());
      const p2 = dfs(queries[i][1], new Set());
      let inter = new Set([...p1].filter(x => p2.has(x)));
      result.push(inter.size ? 'synonyms' : 'different');
    }
  }
  return result;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('test.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const lines = [];
  for await (const l of rl) {
    lines.push(l);
  }

  let line = 0;
  const cases = lines[line++];
  const result = [];
  for (let i = 0; i < cases; i++) {
    const dsize = parseInt(lines[line++]);
    const dict = {};
    for (let j = 0; j < dsize; j++) {
      const [w1, w2] = lines[line++].split(' ').map(w => w.toLowerCase());
      dict[w1] = (dict[w1] || new Set()).add(w2);
      dict[w2] = (dict[w2] || new Set()).add(w1);
    }
    const qsize = parseInt(lines[line++]);
    const queries = [];
    for (let j = 0; j < qsize; j++) {
      const [w1, w2] = lines[line++].split(' ');
      queries.push([w1.toLowerCase(), w2.toLowerCase()]);
    }
    const tmp = solve(dict, queries);
    result.push(...tmp);
  }
  rl.close();

  const output = fs.createWriteStream('output.txt', {
    flags: 'w',
  })
  for (let res of result) {
    output.write(res + '\n');
  }
  output.end();
}
  
processLineByLine();
