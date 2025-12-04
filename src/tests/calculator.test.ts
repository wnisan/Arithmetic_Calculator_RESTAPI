import { convertToRPN, calculateRPNExpression } from '../calculator';
import { BadSequenceError, DivisionByZeroError } from '../errors/customErrors';

describe('convertToRPN', () => {

    // Тест 1: Проверяем базовое преобразование
    test('should convert sipmle expression to RPN', () => {
        const expression = '2 + 3';
        const result = convertToRPN(expression);
        expect(result).toBe('2 3 +');
    });

    // Тест 2: Проверяем преобразование с приоритетами операций
    test('should handle parentheses correctly', () => {
        const expression = '( 2 + 3 ) * 4';
        const result = convertToRPN(expression);
        expect(result).toBe('2 3 + 4 *');
    });

    // Тест 4: Проверяем ошибку при неверном типе параметра
    test('should throw TypeError for non-string input', () => {
        // Проверяем что функция выбрасывает ошибку TypeError
        expect(() => convertToRPN(123 as any)).toThrow(TypeError);
        expect(() => convertToRPN(null as any)).toThrow(TypeError);
    });

    // Тест 5: Проверяем ошибку при неверной последовательности
    test('should throw BadSequenceError for invalid expression', () => {
        // Двойной оператор
        expect(() => convertToRPN('2 + + 3')).toThrow(BadSequenceError);
        // Неправильные скобки
        expect(() => convertToRPN('( 2 + 3')).toThrow(BadSequenceError);
    });
});

describe('calculateRPNExpression', () => {
    // Тест 6: Проверяем простое вычисление
    test('should calculate simple RPN expression', () => {
        const expression = '2 3 +';
        const result = calculateRPNExpression(expression);
        expect(result).toBe(5);
    });

    // Тест 7: Проверяем вычисление с приоритетами
    test('should calculate complex RPN expression', () => {
        const expression = '2 3 4 * +';
        const result = calculateRPNExpression(expression);
        expect(result).toBe(14); // 2 + (3 * 4) = 14
    });

    // Тест 8: Проверяем деление на ноль
    test('should throw DivisionByZeroError for 0/0', () => {
        // Сначала преобразуем выражение в RPN
        const rpnExpression = convertToRPN('0 / 0');
        // Затем проверяем что вычисление выбрасывает ошибку
        expect(() => calculateRPNExpression(rpnExpression)).toThrow(DivisionByZeroError);
    });

    // Тест 9: Проверяем TypeError для не-строки
    test('should throw TypeError for non-string input', () => {
        expect(() => calculateRPNExpression(123 as any)).toThrow(TypeError);
    });
});

// Тест 10: Полный цикл - преобразование и вычисление
describe('Full cycle - convert and calculate', () => {
    test('should convert and calculate complex expression', () => {
        const infixExpression = '2 * ( 3 + 6 / 2 ) / 4';

        // Шаг 1: Преобразуем в RPN
        const rpnExpression = convertToRPN(infixExpression);
        expect(rpnExpression).toBe('2 3 6 2 / + * 4 /');

        // Шаг 2: Вычисляем RPN
        const result = calculateRPNExpression(rpnExpression);
        expect(result).toBe(3); // 2 * (3 + 3) / 4 = 3
    });

    // Тест 11: Проверяем дополнительные случаи
    test('should handle multiple parentheses', () => {
        const expression = '( ( 2 + 3 ) * ( 4 - 1 ) ) / 5';
        const rpn = convertToRPN(expression);
        const result = calculateRPNExpression(rpn);
        expect(result).toBe(3); // (5 * 3) / 5 = 3
    });

    // Тест 12: Проверяем деление с плавающей точкой
    test('should handle floating point results', () => {
        const expression = '5 / 2';
        const rpn = convertToRPN(expression);
        const result = calculateRPNExpression(rpn);
        expect(result).toBe(2.5);
    });

    // Тест 13: Проверяем отрицательные числа (если разрешено)
    test('should handle subtraction that results in negative', () => {
        const expression = '2 - 5';
        const rpn = convertToRPN(expression);
        const result = calculateRPNExpression(rpn);
        expect(result).toBe(-3);
    });
});