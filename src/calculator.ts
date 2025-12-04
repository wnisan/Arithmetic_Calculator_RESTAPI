import { BadSequenceError, DivisionByZeroError } from './errors/customErrors';

// Приоритет операторов
const precedence: { [key: string]: number } = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
};

// Является ли токен оператором
function isOperator(token: string): boolean {
  return token in precedence;
}

// Является ли токен числом
function isNumber(token: string): boolean {
  return !isNaN(parseFloat(token)) && isFinite(Number(token));
}

export function convertToRPN(expression: string): string {
  if (typeof expression !== 'string') {
    throw new TypeError('Expression must be a string');
  }

  if (expression.trim() === '') {
    throw new BadSequenceError('Expression cannot be empty');
  }

  const tokens = expression.split(' ');
  
  // Стек для операторов
  const operatorStack: string[] = [];
  const outputQueue: string[] = [];
  
  // Счетчик скобок 
  let parenthesesBalance = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNumber(token) && !isOperator(token) && token !== '(' && token !== ')') {
      throw new BadSequenceError(`Invalid token: ${token}`);
    }

    // Если токен - число, добавляем в выходную очередь
    if (isNumber(token)) {
      outputQueue.push(token);
    }
    // Если токен - оператор
    else if (isOperator(token)) {
      if (i > 0 && isOperator(tokens[i - 1])) {
        throw new BadSequenceError('Double operator found');
      }

      // Перемещаем операторы из стека в выходную очередь
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      
      operatorStack.push(token);
    }
    else if (token === '(') {
      parenthesesBalance++;
      operatorStack.push(token);
    }
    else if (token === ')') {
      parenthesesBalance--;
      
      if (parenthesesBalance < 0) {
        throw new BadSequenceError('Unmatched closing parenthesis');
      }

      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop()!);
      }
      
      if (operatorStack.length > 0) {
        operatorStack.pop();
      }
    }
  }

  if (parenthesesBalance !== 0) {
    throw new BadSequenceError('Unmatched parentheses');
  }

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop()!;
    if (operator === '(') {
      throw new BadSequenceError('Unmatched opening parenthesis');
    }
    outputQueue.push(operator);
  }

  // Объединяем выходную очередь в строку
  return outputQueue.join(' ');
}

export function calculateRPNExpression(expression: string): number {
  if (typeof expression !== 'string') {
    throw new TypeError('Expression must be a string');
  }

  if (expression.trim() === '') {
    throw new BadSequenceError('Expression cannot be empty');
  }

  const tokens = expression.split(' ');
  const stack: number[] = [];

  for (const token of tokens) {
    if (isNumber(token)) {
      stack.push(parseFloat(token));
    }

    else if (isOperator(token)) {
      if (stack.length < 2) {
        throw new BadSequenceError('Not enough operands for operator');
      }

      const b = stack.pop()!;
      const a = stack.pop()!;

      let result: number;
      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) {
            if (a === 0) {
              throw new DivisionByZeroError();
            }
            throw new Error('Division by zero');
          }
          result = a / b;
          break;
        default:
          throw new BadSequenceError(`Unknown operator: ${token}`);
      }

      stack.push(result);
    }

    else {
      throw new BadSequenceError(`Invalid token in RPN expression: ${token}`);
    }
  }

  // В конце в стеке должен остаться ровно один элемент
  if (stack.length !== 1) {
    throw new BadSequenceError('Invalid RPN expression');
  }

  return stack[0];
}