const matchesData = require('./../public/output/matches.json')
const fs=require('fs')

// 2.Number of matches won per team per year in IPL.

const matchesWonPerTeamPerYear = matchesData.reduce((acc, match) => {
  const year = match.season;
  const winner = match.winner;

  if (!acc[year]) {  // ekada acc already untii adi tesukovalii incase if it is not there we can take as a empty object of the year...
    acc[year] = {}
  }

  if (!acc[year][winner]) {     // winning team kii already proprty undo lado ani checkchesukonii
    acc[year][winner] = 1      // no ayithi akada lakuntiii intilize it with count of 1...
  } else {   
    acc[year][winner]++        // yes ayithi untii winning property increments the count
  }
  return acc ;
}, {});                       // ekada manam empty object ga tesukuntunam aniaaa artham {}

fs.writeFileSync(`/./../public/output/matchesWonPerTeamPerYear.json`, JSON.stringify(matchesWonPerTeamPerYear, null, 2));
   // convertion for json file to fs file ....