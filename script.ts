const display = document.getElementById('display') as HTMLInputElement;
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator: string | null = null;
let previousInput = '';

function calculate(): number {
    if (operator && previousInput !== '' && currentInput !== '') {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
            case '+':
                return prev + curr;
            case '-':
                return prev - curr;
            case '*':
                return prev * curr;
            case '/':
                return prev / curr;
            default:
                return curr;
        }
    }
    return 0;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = (button as HTMLButtonElement).dataset.value;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.value = '';
        } else if (value === '=') {
            if (operator) {
                currentInput = calculate().toString();
                operator = null;
                previousInput = '';
                display.value = currentInput;
            }
        } else if (['+', '-', '*', '/'].includes(value as string)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                } else if (operator) {
                    previousInput = calculate().toString();
                }
                operator = value as string;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
