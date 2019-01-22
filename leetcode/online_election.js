// https://leetcode.com/problems/online-election

var TopVotedCandidate = function(persons, times) {
  let mt = 0, mp = 0;
  for (let i = 0; i < persons.length; i++) {
    mp = Math.max(persons[i], mp);
    mt = Math.max(times[i], mt);
  }
  this.qt = [];
  for (let i = 0; i <= mt; i++) {
    this.qt[i] = -1;
  }
  const votes = [];
  for (let i = 0; i <= mp; i++) {
    votes[i] = 0;
  }

  let max = 0;
  let person;
  for (let i = 0; i < times.length; i++) {
    const vote = ++votes[persons[i]];
    if (vote >= max) {
      person = persons[i];
      max = vote;
    }
    this.qt[times[i]] = person;
  }
};

TopVotedCandidate.prototype.q = function(t) {
  for (let i = t; i >= 0; i--) {
    if (this.qt[i] !== -1) return this.qt[i];
  }
  return -1;
}


const cast = new TopVotedCandidate([0,1,1,0,0,1,0], [0,5,10,15,20,25,30]);

console.log(cast.q(15));
