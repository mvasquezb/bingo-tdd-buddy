import Bingo, { BingoCardGenerator } from './index.js';

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