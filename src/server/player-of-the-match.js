const matchesData = require('./../public/output/matches.json');
const fs = require('fs');

const playerOfTheMatchPerSeason = {};

matchesData.forEach(match => {
    const season = match.season;
    const playerOfTheMatch = match.player_of_match;

    if (!playerOfTheMatchPerSeason[season]) {
        playerOfTheMatchPerSeason[season] = {};
    }
    if (!playerOfTheMatchPerSeason[season][playerOfTheMatch]) {
        playerOfTheMatchPerSeason[season][playerOfTheMatch] = 1;
    } else {
        playerOfTheMatchPerSeason[season][playerOfTheMatch]++;
    }
});

const highestPlayerOfTheMatchPerSeason = {};
for (const season in playerOfTheMatchPerSeason) {
    const players = playerOfTheMatchPerSeason[season];
    const highestPlayer = Object.keys(players).reduce((a, b) => players[a] > players[b] ? a : b);
    highestPlayerOfTheMatchPerSeason[season] = {
        player: highestPlayer,
        count: players[highestPlayer]
    };
}

fs.writeFileSync('./../public/output/highestPlayerOfTheMatchPerSeason.json', JSON.stringify(highestPlayerOfTheMatchPerSeason, null, 2));