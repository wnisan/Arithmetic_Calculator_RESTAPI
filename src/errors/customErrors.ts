export class BadSequenceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadSequenceError';
    }
}

export class DivisionByZeroError extends Error {
    constructor() {
        super('Division by zero');
        this.name = 'DivisionByZeroError';
    }
}