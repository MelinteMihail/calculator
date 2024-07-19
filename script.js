const digits = document.querySelectorAll(".digit");
const equals = document.querySelector("#equals");
const clearBtn = document.querySelector(".clearBtn");
const operators = document.querySelectorAll(".operator");
let displayValue = document.querySelector(".display");
let firstNumber = null;
let operator = null;
let secondNumber = null;
let choseSecondNumber = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, op, num2) {
    switch(op) {
        case '+':
            return add(num1,num2);
            
        case "-":
            return subtract(num1,num2);

        case "*":
            return multiply(num1,num2);

        case "/":
            return divide(num1,num2);
    }
}

function chooseFirst(){
    digits.forEach((digit) => {
        digit.addEventListener("click", () => {
            if(!choseSecondNumber){
                if(firstNumber === null || displayValue.textContent === "0") {
                    displayValue.textContent = digit.textContent;
                } else {
                    displayValue.textContent += digit.textContent;
                }
                firstNumber = Number(displayValue.textContent);
            }
        });
    });
}

function chooseOperator(){
    operators.forEach((op) => {
        op.addEventListener("click", () => {
            if(firstNumber !== null) {
                operator = op.textContent;
                choseSecondNumber = true;
                displayValue.textContent = "";
            }
        });
    });
}

function chooseSecond() {
    digits.forEach((digit) => {
        digit.addEventListener("click", () => {
            if(choseSecondNumber){
                if(displayValue === "0" || secondNumber === null) {
                    displayValue.textContent = digit.textContent;
                } else {
                    displayValue.textContent += digit.textContent;
                }
                secondNumber = Number(displayValue.textContent); 
            }
        });
    });
}

function calculate() {
    equals.addEventListener("click", () => {
        if(firstNumber !== null && operator !== null && secondNumber !== null) {
            displayValue.textContent = operate(firstNumber, operator, secondNumber);
            firstNumber = displayValue.textContent;
        }
    });
}

function resetDisplay() {
    clearBtn.addEventListener("click", () => {
        displayValue.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        choseSecondNumber = false;
    })
}

function updateDisplay() {
    chooseFirst();
    chooseOperator();
    chooseSecond();
    calculate();
    resetDisplay();
}

updateDisplay();

