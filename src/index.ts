import { convertToRPN, calculateRPNExpression } from './calculator';

function main() {
    console.log('Arithmetic Expressions Calculator');

    const testExpressions = [
        '2 + 3',
        '10 - 5',
        '4 * 3',
        '15 / 3',
        '2 + 3 * 4',
        '( 2 + 3 ) * 4',
        '2 * ( 3 + 6 / 2 ) / 4',
        '0 / 5',
        '5 / 0',
        '2 + + 3',
    ];

    for (let i = 0; i < testExpressions.length; i++) {
        const expression = testExpressions[i];
        console.log(` Пример ${i + 1}: ${expression}`);

        try {
            //  в обратную польскую нотацию
            const rpn = convertToRPN(expression);
            console.log(`  RPN: ${rpn}`);

            //  Вычисляем результат
            const result = calculateRPNExpression(rpn);
            console.log(`  Результат: ${result}`);
        } catch (error) {

            if (error instanceof Error) {
                console.log(`  Ошибка (${error.name}): ${error.message}`);
            } else {
                console.log(`  Неизвестная ошибка: ${error}`);
            }
        }
    }
}

if (require.main === module) {
    main();
}

export { convertToRPN, calculateRPNExpression };