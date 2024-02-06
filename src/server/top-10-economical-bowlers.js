const matchesData = require('./../public/output/matches.json');
const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const economyRates = {};

for (let i = 0; i < deliveriesData.length; i++) {
    const delivery = deliveriesData[i];
    const matchId = delivery.match_id;
    const match = matchesData.find(match => match.id === matchId);

    if (match && match.season === '2015') {
        const bowler = delivery.bowler;
        const runs = parseInt(delivery.total_runs);
        const extras = parseInt(delivery.extra_runs);
        const balls = 1; // Each delivery is counted as one ball

        if (!economyRates[bowler]) {
            economyRates[bowler] = (runs - extras) / balls;
        } else {
            economyRates[bowler] += (runs - extras) / balls;
        }
    }
}

const bowlersSortedByEconomy = Object.keys(economyRates)
    .sort((a, b) => economyRates[a] - economyRates[b]);

const top10EconomicalBowlers = {};
for (let i = 0; i < Math.min(10, bowlersSortedByEconomy.length); i++) {
    const bowler = bowlersSortedByEconomy[i];
    top10EconomicalBowlers[bowler] = economyRates[bowler];
}

fs.writeFileSync('./../public/output/topEconomicalBowlers_2015.json', JSON.stringify(top10EconomicalBowlers, null, 2));
