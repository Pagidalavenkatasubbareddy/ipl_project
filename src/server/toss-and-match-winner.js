const matchesData = require('./../public/output/matches.json');
const fs = require('fs');

const tossAndMatchWins = {};

matchesData.forEach(match => {
    const tossWinner = match.toss_winner;
    const matchWinner = match.winner;

    if (tossWinner && matchWinner) {
        if (!tossAndMatchWins[tossWinner]) {
            tossAndMatchWins[tossWinner] = {};
        }
        if (!tossAndMatchWins[tossWinner][matchWinner]) {
            tossAndMatchWins[tossWinner][matchWinner] = 1;
        } else {
            tossAndMatchWins[tossWinner][matchWinner]++;
        }
    }
});

fs.writeFileSync('./../public/output/tossAndMatchWins.json', JSON.stringify(tossAndMatchWins, null, 2));