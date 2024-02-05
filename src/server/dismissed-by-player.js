const deliveriesData = require('./../public/output/deliveries.json');
const fs = require('fs');

const dismissalCount = {};

deliveriesData.forEach(delivery => {
    const dismissedPlayer = delivery.player_dismissed;
    const dismissalKind = delivery.dismissal_kind;

    if (dismissedPlayer && dismissalKind !== 'run out') {
        if (!dismissalCount[dismissedPlayer]) {
            dismissalCount[dismissedPlayer] = {};
        }
        if (!dismissalCount[dismissedPlayer][delivery.bowler]) {
            dismissalCount[dismissedPlayer][delivery.bowler] = 1;
        } else {
            dismissalCount[dismissedPlayer][delivery.bowler]++;
        }
    }
});

const highestDismissalCount = {};
for (const dismissedPlayer in dismissalCount) {
    const bowlers = dismissalCount[dismissedPlayer];
    const highestBowler = Object.keys(bowlers).reduce((a, b) => bowlers[a] > bowlers[b] ? a : b);
    highestDismissalCount[dismissedPlayer] = {
        bowler: highestBowler,
        count: bowlers[highestBowler]
    };
}

fs.writeFileSync('./../public/output/highestDismissals.json', JSON.stringify(highestDismissalCount, null, 2));