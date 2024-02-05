const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const superOversData = deliveriesData.filter(delivery => delivery.is_super_over === '1');

const economyRates = {};
superOversData.forEach(delivery => {
    const bowler = delivery.bowler;
    const runs = parseInt(delivery.total_runs);
    const extras = parseInt(delivery.extra_runs);
    const balls = 1; // Each delivery is counted as one ball in a super over

    if (!economyRates[bowler]) {
        economyRates[bowler] = (runs - extras) / balls;
    } else {
        economyRates[bowler] += (runs - extras) / balls;
    }
});

const bestEconomyBowlerInSuperOvers = Object.keys(economyRates).reduce((a, b) => economyRates[a] < economyRates[b] ? a : b);

fs.writeFileSync('./../public/output/bestEconomyBowlerInSuperOvers.json', JSON.stringify(bestEconomyBowlerInSuperOvers, null, 2));