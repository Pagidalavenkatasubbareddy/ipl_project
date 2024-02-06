const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const dismissalCount = {};

for (let i = 0; i < deliveriesData.length; i++) {
    const delivery = deliveriesData[i];
    const dismissedPlayer = delivery.player_dismissed;
    const dismissalKind = delivery.dismissal_kind;

    if (dismissedPlayer && dismissalKind !== 'run out') {
        if (!dismissalCount[dismissedPlayer]) {
            dismissalCount[dismissedPlayer] = {};
        }
        const bowler = delivery.bowler;
        if (!dismissalCount[dismissedPlayer][bowler]) {
            dismissalCount[dismissedPlayer][bowler] = 1;
        } else {
            dismissalCount[dismissedPlayer][bowler]++;
        }
    }
}

const highestDismissalCount = {};
const dismissedPlayers = Object.keys(dismissalCount);
for (let i = 0; i < dismissedPlayers.length; i++) {
    const dismissedPlayer = dismissedPlayers[i];
    const bowlers = dismissalCount[dismissedPlayer];
    let highestBowler;
    const bowlerNames = Object.keys(bowlers);
    for (let j = 0; j < bowlerNames.length; j++) {
        const currentBowler = bowlerNames[j];
        if (!highestBowler || bowlers[currentBowler] > bowlers[highestBowler]) {
            highestBowler = currentBowler;
        }
    }

    highestDismissalCount[dismissedPlayer] = {
        bowler: highestBowler,
        count: bowlers[highestBowler]
    };
}

fs.writeFileSync('./../public/output/highestDismissals.json', JSON.stringify(highestDismissalCount, null, 2));
