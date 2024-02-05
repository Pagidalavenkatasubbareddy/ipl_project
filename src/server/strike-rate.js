

const fs = require('fs');


const deliveriesData = require('./../public/output/deliveries.json');

const matchesData = require('./../public/output/matches.json');

function calculateStrikeRatePerSeason(deliveriesData, matchesData) {

    const strikeRatePerSeason = {};

    // Iterate over deliveries data

    deliveriesData.forEach((delivery) => {
        const matchId = delivery.match_id;
        const batsman = delivery.batsman;
        const runs = parseInt(delivery.batsman_runs);
        const extras = parseInt(delivery.extras);

        // Find the corresponding match in matches data

        const match = matchesData.find(match => match.id === matchId);
        if (match) {
            const season = match.season;

            // Increment balls faced for valid deliveries

            if (runs !== 0 || extras === 0) {
                if (!strikeRatePerSeason[season]) {
                    strikeRatePerSeason[season] = {};
                }

                if (!strikeRatePerSeason[season][batsman]) {
                    strikeRatePerSeason[season][batsman] = { runs: 0, balls: 0 };
                }

                strikeRatePerSeason[season][batsman].runs += runs;
                strikeRatePerSeason[season][batsman].balls++;
            }
        }
    });

    // Calculate strike rate for each batsman in each season
    for (const season in strikeRatePerSeason) {
        for (const batsman in strikeRatePerSeason[season]) {
            const { runs, balls } = strikeRatePerSeason[season][batsman];
            const strikeRate = (runs / balls) * 100;

            strikeRatePerSeason[season][batsman].strikeRate = strikeRate.toFixed(2);
            delete strikeRatePerSeason[season][batsman].runs;
            delete strikeRatePerSeason[season][batsman].balls;
        }
    }

    // Write the result into a JSON file
    const outputFilePath = './../public/output/strikeRatePerSeason.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(strikeRatePerSeason, null, 2));
    console.log('Strike rate per season calculated successfully!');
}

// Call the function with the batsman data and matches data
calculateStrikeRatePerSeason(deliveriesData, matchesData);