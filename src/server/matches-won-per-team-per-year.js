const matchesData = require('./../public/output/matches.json');
const fs = require('fs');

// 2. Number of matches won per team per year in IPL.

const matchesWonPerTeamPerYear = {};

for (let i = 0; i < matchesData.length; i++) {
  const match = matchesData[i];
  const year = match.season;
  const winner = match.winner;

  if (!matchesWonPerTeamPerYear[year]) {
    matchesWonPerTeamPerYear[year] = {};
  }

  if (!matchesWonPerTeamPerYear[year][winner]) {
    matchesWonPerTeamPerYear[year][winner] = 1;
  } else {
    matchesWonPerTeamPerYear[year][winner]++;
  }
}

fs.writeFileSync('./../public/output/matchesWonPerTeamPerYear.json', JSON.stringify(matchesWonPerTeamPerYear, null, 2));
