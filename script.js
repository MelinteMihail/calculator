const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const delBtn = document.querySelector(".delete")
let displayValue = "0";
let choseSecond = false, choseOp = false;
let firstNumber = null, operator = null, secondNumber = null;
let lastOperator = null, lastSecondNumber = null;
let roundDecimals = [], alreadyPressed = false;

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

function shortenDecimal() {
    if(roundDecimals[1].length > 3) {
        displayValue = String(Number(displayValue).toFixed(5));
        display.textContent = displayValue;
    } else {
        display.textContent = displayValue;
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
            if(alreadyPressed) {
                displayValue = "";
                display.textContent = numbers[i].textContent;   
                displayValue = display.textContent;
                alreadyPressed = false;
            }
            else {
                
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

            }
        });
    }
}

// IMPORTANT! FIX getResult FUNCTION!! IT BREAKS EVERYTHING!!!  

function getResult() {
    equals.addEventListener("click", () => {
        if(choseOp) {
            displayValue = operate(firstNumber, operator, secondNumber);
            if(operator === "/" && String(secondNumber) === "0") {
                displayValue = "";
                display.textContent = "You can't divide by 0!";
            } else {
                roundDecimals = String(displayValue).split(".");
                if(roundDecimals[1] !== undefined) {
                    shortenDecimal();
                } else {
                    display.textContent = displayValue;
                }
                firstNumber = Number(displayValue);
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
                shortenDecimal();
            } else {
                display.textContent = displayValue;
            }
            display.textContent = displayValue;
            firstNumber = Number(displayValue);
            alreadyPressed = true;
        }
    });
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(choseOp) {
                displayValue = operate(firstNumber, operator, secondNumber);
                roundDecimals = String(displayValue).split(".");
                if(roundDecimals[1] !== undefined) {
                    shortenDecimal();
                } else {
                    display.textContent = displayValue;
                }
                display.textContent = displayValue;
                firstNumber = Number(displayValue);
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

function deleteLast() {
    delBtn.addEventListener("click", () => {
        if(displayValue.substring(0, displayValue.length - 1) === "") {
            displayValue = "0";
        } else {
            displayValue = displayValue.substring(0, displayValue.length - 1);
        }
        display.textContent = displayValue;
        
        if(choseSecond) {
            secondNumber = Number(displayValue); 
        } else {
            firstNumber = Number(displayValue);
        }
    });
}

function clearDisplay() {
    clearBtn.addEventListener("click", () => {
        displayValue = "0";
        display.textContent = displayValue;
        choseSecond = false, choseOp = false;
        firstNumber = null, operator = null, secondNumber = null;
        lastOperator = null, lastSecondNumber = null;
        roundDecimals = [];
    });
}

function populateDisplay() {
    getFirstNumber();
    getOperator();
    getSecondNumber();
    getResult();
    addDecimal();
    deleteLast();
    clearDisplay();
}
populateDisplay();
