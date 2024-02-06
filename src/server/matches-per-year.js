
const matchesData = require('./../public/output/matches.json');
const fs = require('fs');

const matchCountPerYear = {};

for (const element of matchesData) {
  if (element.season) {
    if (element.season in matchCountPerYear) {
      matchCountPerYear[element.season] += 1;
    } else {
      matchCountPerYear[element.season] = 1;
    }
  }
}

// Writing the result to a JSON file

const outputFilePath = './../public/output/matchesWonPerYear.json';
fs.writeFileSync(outputFilePath, JSON.stringify(matchCountPerYear, null, 2));

console.log(matchCountPerYear);



