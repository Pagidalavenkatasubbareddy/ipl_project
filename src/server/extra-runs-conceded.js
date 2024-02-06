const matchesData = require(`./../public/output/matches.json`);
const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

// 3. Extra runs conceded per team in the year 2016

function calculateExtraRunsConceded(deliveriesData, matchesData, targetYear) {
  const extraRunsConceded = {};

  for (let i = 0; i < matchesData.length; i++) {
    const match = matchesData[i];
    if (match.season === targetYear) {
      const matchId = match.id;

      for (let j = 0; j < deliveriesData.length; j++) {
        const ball = deliveriesData[j];
        if (ball.match_id === matchId) {
          const bowlingTeam = ball.bowling_team;
          const extraRuns = parseInt(ball.extra_runs, 10);

          if (!extraRunsConceded[bowlingTeam]) {
            extraRunsConceded[bowlingTeam] = 0;
          }

          extraRunsConceded[bowlingTeam] += extraRuns;
        }
      }
    }
  }

  return extraRunsConceded;
}

const extraRunsConcededIn2016 = calculateExtraRunsConceded(
  deliveriesData,
  matchesData,
  '2016'
);

fs.writeFileSync(`./../public/output/extraRunsperTeamIn2016.json`, JSON.stringify(extraRunsConcededIn2016, null, 2));
