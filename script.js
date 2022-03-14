const committedDisplay = document.querySelector('.committed-display');
const display = document.querySelector('.active-display');
const numButton = document.querySelectorAll('.num');
const operatorButton = document.querySelectorAll('.operator')
const evaluator = document.querySelector('.evaluator');
let currentNumber = ''
let previousNumber = ''
let operation = ''
let committed = ''
let result = '';
let equals = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(prevNum, currNum) {

    clearActiveDisplay();
    committedDisplay.textContent = previousNumber;        
    prevNum = Number(previousNumber);
    currNum = Number(currentNumber);
    if (operation === '+') {
        result = add(prevNum, currNum);
        display.textContent = result;
        previousNumber = result;
    } else if (operation === '-') {
        result = subtract(prevNum, currNum);
        display.textContent = result;
    } else if (operation === 'x') {
        result = multiply(prevNum, currNum);
        display.textContent = result;
    } else if (operation === '/') {
        result = divide(prevNum, currNum);
        display.textContent = result;
    }

    if (equals === true) {
        operation = '';
        currentNumber = '';
        equals = false;
    }
}

const operations = {}

let displayValue = ''

function clearActiveDisplay() {
    displayValue = ''
    display.textContent = '';
} 

function changeDisplay() {
    displayValue += this.textContent;
    display.textContent = displayValue;
    currentNumber = displayValue;
}

function storeOperation() {
     if (operation) {
        operation = this.textContent;
        operate(previousNumber, currentNumber);
        committedDisplay.textContent = `${result} ${operation}`;
    } else {
        clearActiveDisplay();
        previousNumber = currentNumber;
        if (result) {
            previousNumber = result;
        }
        operation = this.textContent;
        committedDisplay.textContent = `${previousNumber} ${this.textContent} `;
    }
}


numButton.forEach(button => button.addEventListener('click', changeDisplay));
operatorButton.forEach(button => button.addEventListener('click', storeOperation));
evaluator.addEventListener('click', function() {
    equals = true;
    operate()
});
