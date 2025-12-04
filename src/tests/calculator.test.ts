import { convertToRPN, calculateRPNExpression } from '../calculator';
import { BadSequenceError, DivisionByZeroError } from '../errors/customErrors';

describe('convertToRPN', () => {
    test('should convert simple expression to RPN', () => {
        const expression = '2 + 3';
        const result = convertToRPN(expression);
        expect(result).toBe('2 3 +');
    });

    test('should handle parentheses correctly', () => {
        const expression = '( 2 + 3 ) * 4';
        const result = convertToRPN(expression);
        expect(result).toBe('2 3 + 4 *');
    });

    test('should throw TypeError for non-string input', () => {
        expect(() => convertToRPN(123 as any)).toThrow(TypeError);
        expect(() => convertToRPN(null as any)).toThrow(TypeError);
    });

    test('should throw BadSequenceError for invalid expression', () => {
        expect(() => convertToRPN('2 + + 3')).toThrow(BadSequenceError);
        expect(() => convertToRPN('( 2 + 3')).toThrow(BadSequenceError);
    });

    test('should handle complex expression', () => {
        const expression = '2 * ( 3 + 6 / 2 ) / 4';
        const result = convertToRPN(expression);
        expect(result).toBe('2 3 6 2 / + * 4 /');
    });
});

describe('calculateRPNExpression', () => {
    test('should calculate simple RPN expression', () => {
        const expression = '2 3 +';
        const result = calculateRPNExpression(expression);
        expect(result).toBe(5);
    });

    test('should calculate complex RPN expression', () => {
        const expression = '2 3 4 * +';
        const result = calculateRPNExpression(expression);
        expect(result).toBe(14);
    });

    test('should throw DivisionByZeroError for 0/0', () => {
        const rpnExpression = '0 0 /';
        expect(() => calculateRPNExpression(rpnExpression)).toThrow(DivisionByZeroError);
    });

    test('should throw TypeError for non-string input', () => {
        expect(() => calculateRPNExpression(123 as any)).toThrow(TypeError);
    });

    test('should handle floating point results', () => {
        const rpnExpression = '5 2 /';
        const result = calculateRPNExpression(rpnExpression);
        expect(result).toBe(2.5);
    });

    test('should handle negative results', () => {
        const rpnExpression = '2 5 -';
        const result = calculateRPNExpression(rpnExpression);
        expect(result).toBe(-3);
    });
});

describe('Full cycle - convert and calculate', () => {
    test('should convert and calculate complex expression', () => {
        const infixExpression = '2 * ( 3 + 6 / 2 ) / 4';
        const rpnExpression = convertToRPN(infixExpression);
        const result = calculateRPNExpression(rpnExpression);
        expect(result).toBe(3);
    });

    test('should handle multiple parentheses', () => {
        const expression = '( ( 2 + 3 ) * ( 4 - 1 ) ) / 5';
        const rpn = convertToRPN(expression);
        const result = calculateRPNExpression(rpn);
        expect(result).toBe(3);
    });
});