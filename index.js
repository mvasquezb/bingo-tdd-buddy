class Bingo {
    LOWER_LIMIT = 1;
    UPPER_LIMIT = 75;
    BINGO_SIZE = 75;

    constructor(initialCalls = new Set()) {
        this.numbersCalled = initialCalls;
        // Build array with all available numbers
        this.allNumbers = [...Array(this.BINGO_SIZE)].map((v, i) => {
            return i + this.LOWER_LIMIT;
        });
    }

    get allNumbersCalled() {
        return this.numbersCalled.size >= this.BINGO_SIZE;
    }

    // Calls a new bingo number
    // returns -1 if no valid number was found
    callNumber() {
        let number = 0;
        let index = 0;
        while (!this._isValidNumber(number) && !this.allNumbersCalled) {
            index = this._generateRandomNumber();
            number = this.allNumbers[index];
        }
        if (this.allNumbersCalled) {
            return -1;
        }
        this.numbersCalled.add(number);
        this.allNumbers.splice(index, 1);
        return number;
    }

    // Checks if number provided is valid according to specified rules
    _isValidNumber(number) {
        if (number < this.LOWER_LIMIT || number > this.UPPER_LIMIT) {
            return false;
        }
        return !this.numbersCalled.has(number);
    }

    // Generates random whole number in range [0, allNumbers.length]
    _generateRandomNumber() {
        let numberSpan = this.allNumbers.length;
        return Math.floor(Math.random() * numberSpan);
    }
}

/**
 * Generates a random bingo card
 * Assumes a square card with an empty spot in the middle
 */
export class BingoCardGenerator {
    constructor(size, numberSpan) {
        if (size <= 1 && size % 2 == 0) {
            throw new TypeError("Illegal card size. Must be > 1 and uneven");
        }
        if (numberSpan <= 0) {
            throw new TypeError("Illegal column number span. Must be > 0");
        }
        this.size = size;
        this.numberSpan = numberSpan;
    }

    generateCard() {
        let card = [];
        for (let row = 0; row < this.size; row++) {
            let lower = row * this.numberSpan + 1;
            let upper = (row + 1) * this.numberSpan;
            let newRow = this._generateRow(row, this.size, lower, upper);
            card.push(newRow)
        }

        return this._transposeCard(card);
    }

    _generateRow(rowNumber, size, lower, upper) {
        let middle = Math.floor(size / 2);
        let hasEmptyMiddle = rowNumber == middle;
        let availableNumbers = [...Array(upper - lower + 1)].map((v, i) => {
            return i + lower;
        });
        let row = [];
        while (row.length != size) {
            if (hasEmptyMiddle && row.length == middle) {
                row.push(-1);
                continue;
            }
            let index = Math.floor(Math.random() * availableNumbers.length);
            let number = availableNumbers[index];
            if (!row.includes(number)) {
                row.push(number);
                availableNumbers.splice(index, 1);
            }
        }
        return row;
    }

    _transposeCard(card) {
        let newCard = [];
        for (let row = 0; row < card.length; row++) {
            newCard.push([]);
        };

        for (let row = 0; row < card.length; row++) {
            for (let col = 0; col < card.length; col++) {
                newCard[col].push(card[row][col]);
            };
        };

        return newCard;
    }
}

export default Bingo;