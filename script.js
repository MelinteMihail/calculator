const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
let displayValue = "0";
let choseSecond = false, choseOp = false;
let firstNumber = null, operator = null, secondNumber = null;
let lastOperator = null, lastSecondNumber = null;
let roundDecimals = [];

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

function operate(num1, op, num2){
    switch(op) {
        case "+":
            return add(num1, num2);
        
        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);

        case "/":
            return divide(num1, num2);
    }
}

function getFirstNumber() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(!choseSecond) {
                if(displayValue === "0" || choseOp) {
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue;
                    choseOp = false;
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue;
                }
                firstNumber = Number(displayValue);
            }
        });
    }
}

function getOperator() {
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(!choseOp) {
                operator = operators[i].textContent;
                choseSecond = true;
                decimal.disabled = false;
            }
        });
    }
    displayValue = "";
}

function getSecondNumber() {
    let check = false;
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(choseSecond) {
                if(displayValue === String(firstNumber) && !check) {
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue;
                    check = true;
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue;
                }
                secondNumber = Number(displayValue); 
                choseOp = true;
            }
        });
    }
}

function getResult() {
    equals.addEventListener("click", () => {
        if(choseOp) {
            displayValue = operate(firstNumber, operator, secondNumber);
            if(operator === "/" && String(secondNumber) === "0") {
                display.textContent = "You can't divide by 0!";
                equals.disabled = true;
            } else {
                roundDecimals = String(displayValue).split(".");
                if(roundDecimals[1] !== undefined) {
                    if(roundDecimals[1].length > 3) {
                        displayValue = String(Number(displayValue).toFixed(5));
                        display.textContent = displayValue;
                    } else {
                        display.textContent = displayValue;
                    }
                } else {
                    display.textContent = displayValue;
                }
                firstNumber = Number(display.textContent);
                lastOperator = operator;
                lastSecondNumber = secondNumber;
                choseOp = false;
                displayValue = "";
                secondNumber = null;
            }
        } else if(lastOperator !== null && lastSecondNumber !== null) {
            displayValue = operate(firstNumber, lastOperator, lastSecondNumber);
            roundDecimals = String(displayValue).split(".");
            if(roundDecimals[1] !== undefined) {
                if(roundDecimals[1].length > 3) {
                    displayValue = String(Number(displayValue).toFixed(5));
                    display.textContent = displayValue;
                } else {
                    display.textContent = displayValue;
                }
            } else {
                display.textContent = displayValue;
            }
            display.textContent = displayValue;
            firstNumber = Number(display.textContent);
        }
    });
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(choseOp) {
                displayValue = operate(firstNumber, operator, secondNumber);
                roundDecimals = String(displayValue).split(".");
                if(roundDecimals[1] !== undefined) {
                    if(roundDecimals[1].length > 3) {
                        displayValue = String(Number(displayValue).toFixed(5));
                        display.textContent = displayValue;
                    } else {
                        display.textContent = displayValue;
                    }
                } else {
                    display.textContent = displayValue;
                }
                display.textContent = displayValue;
                firstNumber = Number(display.textContent);
                operator = operators[i].textContent;
                lastOperator = operator;
                lastSecondNumber = secondNumber;
                choseOp = false;
                displayValue = "";
            }
        });
    }
}

function addDecimal() {
    decimal.addEventListener("click", () => {
        if(!displayValue.includes(".")) {
            displayValue += decimal.textContent;
            display.textContent = displayValue;
            decimal.disabled = true;
        }
    });
 }

function populateDisplay() {
    getFirstNumber();
    getOperator();
    getSecondNumber();
    getResult();
    addDecimal();
}
populateDisplay();


/* function clearDisplay() {
    clearBtn.addEventListener("click", () => {
        displayValue = "0";
        display.textContent = displayValue;
        choseSecond = false, choseOp = false;
        firstNumber = null, operator = null, secondNumber = null;
        lastOperator = null, lastSecondNumber = null;
        roundDecimals = [];
    });
}

clearDisplay(); */