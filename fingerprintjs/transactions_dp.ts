import { parseString } from '@fast-csv/parse';
import fetch from 'node-fetch';

const apiLatencies = {"ae":80,"ar":87,"au":250,"be":46,"bh":82,"br":37,"ca":12,"ch":55,"cl":83,"cn":115,"cy":77,"de":48,"es":56,"fi":50,"fj":360,"fr":53,"gi":61,"gr":66,"hk":130,"id":227,"ie":42,"il":79,"it":62,"jp":122,"ky":30,"ma":88,"mx":14,"ng":102,"nl":47,"no":46,"nz":350,"pl":49,"ro":51,"ru":55,"sa":78,"se":47,"sg":130,"th":133,"tr":99,"ua":52,"uk":45,"us":10,"vn":129,"za":105};

type Transaction = {
  ID: string,
  amount: number,
  bank_country_code: keyof typeof apiLatencies,
};

function prioritize(transations: Transaction[], totalTime: number) {
  const n = transations.length;
  const dp = Array(n).fill(0).map(() => Array(totalTime + 1).fill(0).map(() => [0]));

  for (let t = 0; t <= totalTime; t++) {
    dp[0][t] = apiLatencies[transations[0].bank_country_code] <= t ? [transations[0].amount, 0] : [0];
  }

  for (let i = 1; i < n; i++) {
    const tr = transations[i];
    for (let t = 0; t <= totalTime; t++) {
      if (apiLatencies[tr.bank_country_code] <= t) {
        const [prev] = dp[i-1][t-apiLatencies[tr.bank_country_code]];
        if (dp[i-1][t][0] < prev+tr.amount) {
          dp[i][t] = dp[i-1][t-apiLatencies[tr.bank_country_code]].slice();
          dp[i][t][0] = prev+tr.amount;
          dp[i][t].push(i);
          continue;
        }
      }
      dp[i][t] = dp[i-1][t];
    }
  }
  const result: Transaction[] = [];
  for (let i = 1; i < dp[n-1][totalTime].length; i++) {
    result.push(transations[dp[n-1][totalTime][i]]);
  }
  return result;
}


fetch('https://gist.githubusercontent.com/Valve/70d01f51885b4d0cdfeea1a576a23850/raw/1e5f5b53a2273f8b495735e5e5be805616591a90/transactions.csv')
.then((response) => response.text())
.then(async (data) => {
  const transactions = [];
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
