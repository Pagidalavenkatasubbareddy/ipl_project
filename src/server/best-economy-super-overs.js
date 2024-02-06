const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const superOversData = [];
for (let i = 0; i < deliveriesData.length; i++) {
    const delivery = deliveriesData[i];
    if (delivery.is_super_over === '1') {
        superOversData.push(delivery);
    }
}

const economyRates = {};
for (let i = 0; i < superOversData.length; i++) {
    const delivery = superOversData[i];
    const bowler = delivery.bowler;
    const runs = parseInt(delivery.total_runs);
    const extras = parseInt(delivery.extra_runs);
    const balls = 1;

    if (!economyRates[bowler]) {
        economyRates[bowler] = (runs - extras) / balls;
    } else {
        economyRates[bowler] += (runs - extras) / balls;
    }
}

let bestEconomyBowler;
const bowlers = Object.keys(economyRates);
for (let i = 0; i < bowlers.length; i++) {
    const currentBowler = bowlers[i];
    if (!bestEconomyBowler || economyRates[currentBowler] < economyRates[bestEconomyBowler]) {
        bestEconomyBowler = currentBowler;
    }
}

fs.writeFileSync('./../public/output/bestEconomyBowlerInSuperOvers.json', JSON.stringify(bestEconomyBowler, null, 2));
