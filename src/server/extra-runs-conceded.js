const matchesData = require(`./../public/output/matches.json`);

const deliveriesData = require('./../public/output/deliveries.json');

const fs = require('fs')

// 3 . Extra runs conceded per team in the year 2016

const calculateExtraRunsConceded = (
  deliveriesData,
  matchesData,                //starting 3 lines motham manam avi calculate chestham antii evii what i mentioned here 
  targetYear
) => {
  const extraRunsConceded = {}

  const matchesInYear = matchesData.filter(match => match.season === targetYear)

  const matchIdsInYear = matchesInYear.map(match => match.id)

  // Filter ball-by-ball data for matches in the specified year
  const relevantBallData = deliveriesData.filter(ball =>
    matchIdsInYear.includes(ball.match_id)    // ekada ball to ball check chesthundii ala antii vaka year ni target laga tesukonii chesukunanuu ekada 
  )

  // Calculate extra runs conceded per team

  relevantBallData.forEach(ball => {
    extraRunsConceded[ball.bowling_team] =       //filter tho ball by ball chesam kada ekada aa data tho bowling team nii tesukuntam .. 
      (extraRunsConceded[ball.bowling_team] || 0) +
      parseInt(ball.extra_runs, 10)            // parsent is to convert the extra_runs to an integer value.
  });

  return extraRunsConceded ;
};




const extraRunsConcededIn2016 = calculateExtraRunsConceded(
  deliveriesData,
  matchesData,
  '2016'
)

// console.log(extraRunsConcededIn2016)

fs.writeFileSync(`./../public/output/extraRunsperTeamIn2016.json`,JSON.stringify(extraRunsConcededIn2016, null, 2));