import Bingo, { BingoCardGenerator, BingoCardVerifier } from './index.js';

export function testBingoWillCallValidNumberIfAvailable() {
    let bingo = new Bingo();
    let number = bingo.callNumber();
    return number >= bingo.LOWER_LIMIT && number <= bingo.UPPER_LIMIT;
}

export function testBingoWillReturnInvalidNumberAfterAllHaveCalled() {
    let bingo = new Bingo();
    let number = 0;
    // Call bingo number 76 times
    // Could also create bingo with full initial state 
    for (let i = 0; i <= bingo.BINGO_SIZE; i++) {
        number = bingo.callNumber();
    }
    return number == -1;
}

export function testBingoCardGeneratesValidCard() {
    let size = 5;
    let span = 15;
    let cardGenerator = new BingoCardGenerator(size, span);
    let card = cardGenerator.generateCard();
    
    return cardIsValid(card, size, span);
}

export function testBingoCardGeneratorThrows() {
    let thrown = false;
    try {
        let cardGenerator = new BingoCardGenerator(0, 5);
    } catch (error) {
        thrown = true;
    }
    return thrown;
}

export function testBingoCardWins() {
    let size = 5;
    let span = 15;
    // Bingo numbers called (1 to 25 inclusive)
    let bingoState = [
        1, 2, 3, 4, 5, 
        16, 17, 18, 19,
        20, 31, 32, 33,
        34, 35, 46, 47,
        48, 49, 50, 62,
        63, 64, 65, 66
    ];
    let card = convertBingoStateToCard(bingoState, size);
    let bingo = new Bingo(new Set(bingoState));
    let verifier = new BingoCardVerifier(bingo);
    return verifier.cardWins(card);
}

function convertBingoStateToCard(bingoState, size) {
    let card = [];
    for (let i = 0; i < bingoState.length / size; i++) {
        let col = (i % size);
        card.push(bingoState.slice(col * size, col + size));
    }
    return card;
}

function cardIsValid(card, size, span) {
    for (let col = 0; col < size; col++) {
        let column = [...Array(size)].map((v, row) => {
            return card[row][col];
        })
        let lower = col * span + 1;
        let upper = (col + 1) * span;
        if (!columnIsValid(column, col, size, lower, upper)) {
            return false;
        }
    }
    return true;
}

function columnIsValid(column, index, size, lower, upper) {
    let middle = Math.floor(size / 2);
    let hasEmptyMiddle = index == middle;
    return column.filter((value, row) => {
        if (hasEmptyMiddle && row == middle) {
            return true;
        }
        return value >= lower && value <= upper;
    });
}

export function runTests() {
    let tests = [
        testBingoWillCallValidNumberIfAvailable,
        testBingoWillReturnInvalidNumberAfterAllHaveCalled,
        testBingoCardGeneratesValidCard,
        testBingoCardGeneratorThrows
    ];
    tests.forEach((test) => {
        let success = test();
        console.log(`${test.name} result: ${(success ? "Success" : "Failure")}`);
    })
}

runTests();