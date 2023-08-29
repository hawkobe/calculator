const committedDisplay = document.querySelector('.committed-display');
const display = document.querySelector('.active-display');
const numButton = document.querySelectorAll('.num');
const operatorButton = document.querySelectorAll('.operator')
const evaluator = document.querySelector('.evaluator');
const clearWhole = document.querySelector('.clear-all');
const clearActive = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
const posNeg = document.querySelector('.plus-minus');

let displayValue = ''
let currentNumber = ''
let previousNumber = ''
let operation = ''
let committed = ''
let result = '';
let decPressed = false;
let equalPressed = false;
let regOperatorPressed = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const remainder = (a, b) => a % b;

function operate(prevNum, currNum) {
    committedDisplay.textContent = previousNumber;
    prevNum = Number(previousNumber);
    currNum = Number(currentNumber);

    if (displayValue === '') {
        result = previousNumber;
        displayValue = previousNumber;
        display.textContent = previousNumber;
        committedDisplay.textContent = '';
        previousNumber = '';
        operation = '';
        return;
    } else {
        clearActiveDisplay();
        if (operation === '+') {
            result = add(prevNum, currNum);
        } else if (operation === '-') {
            result = subtract(prevNum, currNum);
        } else if (operation === 'x') {
            result = multiply(prevNum, currNum);
        } else if (operation === '%') {
            result = remainder(prevNum, currNum);
        } else if (operation === '/') {
            if (currentNumber === '0' || currentNumber == '00') {
                alert('You know I can\'t divide by ZERO!');
            } else {
            result = divide(prevNum, currNum);
            }
        }
    }
    
    result = Math.round(result * 10000) / 10000;
    previousNumber = result;

    if (equalPressed === true) {
        display.textContent = result;
        operation = '';
        currentNumber = '';
        committedDisplay.textContent = '';
        equalPressed = false;
        regOperatorPressed = false;
        regexNum = /^[\d\.]$/;
        regexOperator = /^[+=/*%-]$/;
        decimal.addEventListener('click', () => decPressed = true);
    }
}

function clear() {
    display.textContent = '';
    displayValue = '';
}

function clearAll() {
    displayValue = ''
    currentNumber = ''
    previousNumber = ''
    operation = ''
    committed = ''
    result = '';
    equalPressed = false;
    decPressed = false;
    display.textContent = '';
    committedDisplay.textContent = '';
}

function clearActiveDisplay() {
    displayValue = ''
    display.textContent = '';
} 

function changeDisplay(e) {
    if (decPressed === true) {
        decimal.removeEventListener('click', changeDisplay);
        regexNum = /^[\d]$/;
    }

    displayValue += this.textContent;
    display.textContent = displayValue;
    currentNumber = displayValue;
    result = '';
}

function storeOperation() {
    if (displayValue === '') {
        if (regOperatorPressed) {
            operation = operation;
        } else {
            operation = this.textContent;
        };
        committedDisplay.textContent = `${previousNumber} ${operation}`;
        regOperatorPressed = false;
        return;
    }
    else {
        regexNum = /^[\d\.]$/;
        if (operation && previousNumber) {
            if (regOperatorPressed) {
                operation = operation;
            } else {
                operate(previousNumber, currentNumber);
                operation = this.textContent;
            };
            committedDisplay.textContent = `${result} ${operation}`;
            regOperatorPressed = false;
        } else {
            clearActiveDisplay();
            previousNumber = currentNumber;
            if (result) {
                previousNumber = result;
            }
            if (regOperatorPressed) {
                operation = operation;
                committedDisplay.textContent = `${previousNumber} ${operation} `
            } else {
                operation = this.textContent;
                committedDisplay.textContent = `${previousNumber} ${this.textContent} `;
            };
            regOperatorPressed = false;
        }
    }
}

let regexOperator = /^[+=/*%-]$/;
let regexNum = /^[\d\.]$/;

function keyPress(e) {
    if (regexNum.test(e.key)) {
        if (e.key == '.') {
            regexNum = /^[\d]$/;
            console.log(regexNum);
            decPressed = true;
            decimal.removeEventListener('click', changeDisplay);
        }

        displayValue += e.key;
        display.textContent = displayValue;
        currentNumber = displayValue;
        result = '';
    }
    if (regexOperator.test(e.key)) {
        regOperatorPressed = true;
        regexNum = /^[\d\.]$/;
        if (e.key === '=') {
            regexOperator = /^[+/*-]$/;
            equalPressed = true;
            operate();
            previousNumber = '';
            operation = '=';
            displayValue = result;
        } else if (e.key === '*') {
            regexOperator = /^[+=/*-]$/;
            if (operation === '=') {
                previousNumber = result;
            }
            if (operation && previousNumber) {
                operate(previousNumber, currentNumber);
            }
            operation = 'x';
            storeOperation();
        } else {
            regexOperator = /^[+=/*%-]$/;
            if (operation === '=') {
                previousNumber = result;
            }
            if (operation && previousNumber) {
                operate(previousNumber, currentNumber); 
            }
            operation = e.key;
            storeOperation();
        }
    }
}

decimal.addEventListener('click', () => decPressed = true);
clearWhole.addEventListener('click', clearAll);
clearActive.addEventListener('click', clear);
numButton.forEach(button => button.addEventListener('click', changeDisplay));
operatorButton.forEach(button => button.addEventListener('click', storeOperation));
operatorButton.forEach(button => button.addEventListener('click', () => {
    decPressed = false;
    decimal.addEventListener('click', changeDisplay);
}));
evaluator.addEventListener('click', function() {
    equalPressed = true;
    decPressed = false;
    decimal.addEventListener('click', changeDisplay);
    operate()
});
window.addEventListener('keyup', (e) => {
    keyPress(e);
});
