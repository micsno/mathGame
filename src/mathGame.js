const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function range(max) {
    let arr = [];
    let a = Math.ceil(Math.random() * max);
    let b = Math.ceil(Math.random() * max);
    let c = Math.ceil(Math.random() * 3); // 1 = +, 2 = -, 3 = *

    arr.push(a);
    arr.push(b);

    if (c === 1) {
        arr.push("+");
        arr.push(a + b);
    } else if (c === 2) {
        arr.push("-");
        arr.push(a - b);
    } else if (c === 3) {
        arr.push("*");
        arr.push(a * b);
    } else {
        arr.push("error");
    }

    return arr;
}

function askQuestion(question) {
    return new Promise((resolve) => {
        reader.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function startGame() {
    console.clear();
    console.log("Tervetuloa matematiikkapeliin!");
    let rightAnswerCount = 0;
    let wrongAnswerCount = 0;

    const initialMaksimi = 10;
    let kerroin = 1;

    while (kerroin <= 10) {
        let data = range(initialMaksimi * kerroin);
        let lasku = `${data[0]} ${data[2]} ${data[1]} = `;
        let answer = data[3];
        let yourAnswer = await askQuestion(lasku);

        if (Number(yourAnswer) === answer) {
            console.log("Oikea vastaus!");
            rightAnswerCount += 1;
            wrongAnswerCount = 0; // Nollataan väärät vastaukset

            if (rightAnswerCount >= 5) {
                console.log("\nHienoa! Sait viisi oikeaa vastausta peräkkäin!\n");
                rightAnswerCount = 0;
                kerroin++;
            }
        } else {
            console.log(`\nVäärä vastaus, oikea vastaus olisi ollut: ${answer}.\n`);
            rightAnswerCount = 0; // Nollataan oikeat vastaukset
            wrongAnswerCount += 1;

            if (wrongAnswerCount >= 2 && kerroin > 1) {
                console.log("\nSait 2 väärää vastausta peräkkäin.\n");
                wrongAnswerCount = 0;
                kerroin--;
            }
        }
    }

    reader.close();
    console.log(`Peli päättyi. Kiitos pelaamisesta!`);
}

startGame();
