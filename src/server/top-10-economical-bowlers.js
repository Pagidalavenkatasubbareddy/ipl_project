const matchesData = require('./../public/output/matches.json');
const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const economyRates = {};

deliveriesData.forEach(delivery => {
    const match = matchesData.find(match => match.id === delivery.match_id);
    const year = match.season;

    if (year === '2015') {
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
});

const top10EconomicalBowlers = Object.keys(economyRates)
    .sort((a, b) => economyRates[a] - economyRates[b])
    .slice(0, 10)
    .reduce((obj, key) => {
        obj[key] = economyRates[key];
        return obj;
    }, {});

fs.writeFileSync('./../public/output/topEconomicalBowlers_2015.json', JSON.stringify(top10EconomicalBowlers, null, 2));