import { BadSequenceError, DivisionByZeroError } from '../errors/customErrors';

describe('Custom Errors', () => {
    test('BadSequenceError should have correct name and message', () => {
        const error = new BadSequenceError('Invalid sequence');
        
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BadSequenceError');
        expect(error.message).toBe('Invalid sequence');
    });

    test('DivisionByZeroError should have correct name and default message', () => {
        const error = new DivisionByZeroError();
        
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('DivisionByZeroError');
        expect(error.message).toBe('Division by zero');
    });

    test('DivisionByZeroError should be throwable', () => {
        expect(() => {
            throw new DivisionByZeroError();
        }).toThrow(DivisionByZeroError);
    });
});