var display = document.getElementById('display');
var buttons = document.querySelectorAll('.btn');
var currentInput = '';
var operator = null;
var previousInput = '';
function calculate() {
    if (operator && previousInput !== '' && currentInput !== '') {
        var prev = parseFloat(previousInput);
        var curr = parseFloat(currentInput);
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
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var value = button.dataset.value;
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.value = '';
        }
        else if (value === '=') {
            if (operator) {
                currentInput = calculate().toString();
                operator = null;
                previousInput = '';
                display.value = currentInput;
            }
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                }
                else if (operator) {
                    previousInput = calculate().toString();
                }
                operator = value;
                currentInput = '';
            }
        }
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
