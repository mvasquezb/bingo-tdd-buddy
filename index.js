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

export default Bingo;