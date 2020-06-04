import Bingo from './index.js';

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

export function runTests() {
    let tests = [
        testBingoWillCallValidNumberIfAvailable,
        testBingoWillReturnInvalidNumberAfterAllHaveCalled
    ];
    tests.forEach((test) => {
        let success = test();
        console.log(`${test.name} result: ${(success ? "Success" : "Failure")}`);
    })
}

runTests();