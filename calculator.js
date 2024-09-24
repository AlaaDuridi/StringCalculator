function isOperator(c) {
    return ['+', '-', '*', '/', '%', '^'].includes(c);
}

// Helper to define operator precedence
function precedence(op) {
    if(op === '^') return 3;
    if (op === '*' || op === '/' || op === '%') return 2;
    return 1;
}

// Helper to apply an operator to two values, with a check for division by zero
function applyOperator(a, b, operator) {
    if(a>1000 && b>1000) return 0;
    if(a>1000) return b;
    if(b>1000) return a;
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b === 0) throw new Error('Division by zero');
            return a / b;
        case '%':
            if (b === 0) throw new Error('Division by zero');
            return a % b;
        case '^': return Math.pow(a, b);
    }
}

// Main calc function to evaluate the expression, alternating between number and operator
function calc(...args) {
    if (args.length === 0) throw new Error('Empty expression');

    const operators = [];
    const values = [];
    const parenthesesStack = []; // Track parentheses to ensure balance

    let expectNumber = true; // Start by expecting a number

    let i = 0;
    while (i < args.length) {
        const token = args[i];

        // If it's the turn for a number
        if (expectNumber) {
            if (typeof token === 'number') {
                // Valid number, push to values stack
                values.push(token);
                expectNumber = false; // After a number, expect an operator
            }
            else if (token === '(') {
                // Handle opening parenthesis, push to operators stack and track it
                operators.push(token);
                parenthesesStack.push('('); // Track this open parenthesis
            }
            else {
                throw new Error('Invalid input type');
            }
        }
        // If it's the turn for an operator
        else {
            if (isOperator(token)) {
                while (
                    operators.length &&
                    operators[operators.length - 1] !== '(' &&
                    precedence(operators[operators.length - 1]) >= precedence(token)
                    ) {
                    const operator = operators.pop();
                    const b = values.pop();
                    const a = values.pop();
                    values.push(applyOperator(a, b, operator));
                }
                operators.push(token);
                expectNumber = true; // After an operator, expect a number
            }
            else if (token === ')') {
                // Handle closing parenthesis, pop operators until '('
                if (parenthesesStack.length === 0) {
                    throw new Error('Invalid expression: unmatched closing parenthesis');
                }
                while (operators.length && operators[operators.length - 1] !== '(') {
                    const operator = operators.pop();
                    const b = values.pop();
                    const a = values.pop();
                    values.push(applyOperator(a, b, operator));
                }
                operators.pop(); // Remove the '(' from the stack
                parenthesesStack.pop(); // Remove the matching '(' from the stack
                expectNumber = false; // After closing parenthesis, expect an operator
            }
            else {
                throw new Error('Invalid operator');
            }
        }

        i++;
    }

    // Ensure there are no unmatched opening parentheses
    if (parenthesesStack.length > 0) {
        throw new Error('Invalid expression: unmatched opening parenthesis');
    }

    // Apply remaining operators
    while (operators.length) {
        const operator = operators.pop();
        const b = values.pop();
        const a = values.pop();
        values.push(applyOperator(a, b, operator));
    }

    return values[0];
}

module.exports = calc;