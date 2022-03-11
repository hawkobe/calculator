const display = document.querySelector('.display');
const numButton = document.querySelectorAll('.num');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, prevNum, currNum) {
    let result = operator(prevNum, currNum)
    return result;
}

function changeDisplay(e) {
    display.textContent = this.textContent;
}


numButton.forEach(button => button.addEventListener('click', changeDisplay));