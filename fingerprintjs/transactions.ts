import { parseString } from '@fast-csv/parse';
import fetch from 'node-fetch';

const apiLatencies = {"ae":80,"ar":87,"au":250,"be":46,"bh":82,"br":37,"ca":12,"ch":55,"cl":83,"cn":115,"cy":77,"de":48,"es":56,"fi":50,"fj":360,"fr":53,"gi":61,"gr":66,"hk":130,"id":227,"ie":42,"il":79,"it":62,"jp":122,"ky":30,"ma":88,"mx":14,"ng":102,"nl":47,"no":46,"nz":350,"pl":49,"ro":51,"ru":55,"sa":78,"se":47,"sg":130,"th":133,"tr":99,"ua":52,"uk":45,"us":10,"vn":129,"za":105};

type Transaction = {
  ID: string,
  amount: number,
  bank_country_code: keyof typeof apiLatencies,
};

function swap(queue: Transaction[], a: number, b: number) {
  const transation = queue[a];
  queue[a] = queue[b];
  queue[b] = transation;
}

function heappush(arr: Transaction[], tr: Transaction) {
  arr.push(tr);
  let k = arr.length-1;
  let p = Math.floor((k-1)/2);
  while (p >= 0) {
    if (apiLatencies[tr.bank_country_code] < apiLatencies[arr[p].bank_country_code]) break;
    if (apiLatencies[tr.bank_country_code] === apiLatencies[arr[p].bank_country_code] && tr.amount > arr[p].amount) break;
    swap(arr, p, k);
    k = p;
    p = Math.floor((k-1)/2);
  }
}

function heappop(arr: Transaction[]): Transaction {
  const top = arr[0];
  arr[0] = arr[arr.length-1];
  let p = 0;
  while (2*p+1 < arr.length-1) {
    const am1 = apiLatencies[arr[2*p+1].bank_country_code];
    const am2 = apiLatencies[arr[2*p+2]?.bank_country_code];
    const k = am1 > am2 ? 2*p+1 : 2*p+2;
    if (apiLatencies[arr[p].bank_country_code] > apiLatencies[arr[k].bank_country_code]) break;
    if (apiLatencies[arr[p].bank_country_code] === apiLatencies[arr[k].bank_country_code] && arr[p].amount <= arr[k].amount) break;
    swap(arr, k, p);
    p = k;
  }
  arr.length = arr.length-1;
  return top;
}

function prioritize(transations: Transaction[], totalTime: number): Transaction[] {
  const sorted = transations.sort((a, b) => b.amount - a.amount);
  let time = 0;
  let amount = 0;
  let max = 0;
  let subset = [];
  const queue: Transaction[] = [];
  for (const tr of sorted) {
    if (time + apiLatencies[tr.bank_country_code] <= totalTime) {
      heappush(queue, tr);
      time += apiLatencies[tr.bank_country_code];
      amount += tr.amount;
    } else if (apiLatencies[queue[0]?.bank_country_code] > apiLatencies[tr.bank_country_code]) {
      time = time - apiLatencies[queue[0]?.bank_country_code] + apiLatencies[tr.bank_country_code];
      amount = amount - queue[0].amount + tr.amount;
      heappop(queue);
      heappush(queue, tr);
    }
    if (max < amount) {
      subset = queue.slice();
      max = amount;
    }
  }
  return subset;
};

fetch('https://gist.githubusercontent.com/Valve/70d01f51885b4d0cdfeea1a576a23850/raw/1e5f5b53a2273f8b495735e5e5be805616591a90/transactions.csv')
.then((response) => response.text())
.then(async (data) => {
  const transactions: Transaction[] = [];
  await parseString(data, { headers: true })
    .on('data', row => transactions.push({
      ...row,
      ID: row.id,
      amount: Number(row.amount),
      bank_country_code: row.bank_country_code,
    }))
    .on('end', () => {
      console.log(prioritize(transactions, 50).reduce((acc, tr) => acc + tr.amount, 0));
      console.log(prioritize(transactions, 60).reduce((acc, tr) => acc + tr.amount, 0));
      console.log(prioritize(transactions, 90).reduce((acc, tr) => acc + tr.amount, 0));
      console.log(prioritize(transactions, 1000).reduce((acc, tr) => acc + tr.amount, 0));
    });
});
