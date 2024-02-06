const matchesData = require('./../public/output/matches.json');
const fs = require('fs');

// Find a player who has won the highest number of Player of the Match awards for each season

const playerOfTheMatchPerSeason = {};

for (let i = 0; i < matchesData.length; i++) {
    const match = matchesData[i];
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
}

const highestPlayerOfTheMatchPerSeason = {};
const seasons = Object.keys(playerOfTheMatchPerSeason);

for (let i = 0; i < seasons.length; i++) {
    const season = seasons[i];
    const players = playerOfTheMatchPerSeason[season];
    let highestPlayer;

    const playerNames = Object.keys(players);
    for (let j = 0; j < playerNames.length; j++) {
        const currentPlayer = playerNames[j];
        if (!highestPlayer || players[currentPlayer] > players[highestPlayer]) {
            highestPlayer = currentPlayer;
        }
    }

    highestPlayerOfTheMatchPerSeason[season] = {
        player: highestPlayer,
        count: players[highestPlayer]
    };
}

fs.writeFileSync('./../public/output/highestPlayerOfTheMatchPerSeason.json', JSON.stringify(highestPlayerOfTheMatchPerSeason, null, 2));
