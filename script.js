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
    }
    updateDisplay()
}


function getFirstNumber() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(!choseSecond) {
                if(displayValue === "0" || choseOp) {
                    displayValue = numbers[i].textContent;
                    choseOp = false;
                } else {
                    displayValue += numbers[i].textContent;
                }
                updateDisplay();
                firstNumber = Number(displayValue);
            }
        });

        window.addEventListener("keydown", (e) => {
            if(!choseSecond) {
                if(e.code === `Digit${numbers[i].textContent}` || e.code === `Numpad${numbers[i].textContent}`){
                    if(displayValue === "0" || choseOp) {
                        displayValue = numbers[i].textContent;
                        choseOp = false;
                    } else {
                        displayValue += numbers[i].textContent;
                    }
                    updateDisplay();
                    firstNumber = Number(displayValue);
                }
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

        window.addEventListener("keydown", (e) => {
            if(e.key === operators[i].textContent) {
                if(!choseOp) {
                    operator = operators[i].textContent;
                    choseSecond = true;
                    decimal.disabled = false;
                }
            }
        });
    }
}



function getSecondNumber() {
    let check = false;
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(choseSecond) {
                if(alreadyPressed) {
                    displayValue = "";
                    display.textContent = numbers[i].textContent;   
                    displayValue = display.textContent;
                    alreadyPressed = false;
                } else {
                    if(displayValue === String(firstNumber) && !check) {
                        displayValue = numbers[i].textContent;  
                        check = true;
                    } else {
                        displayValue += numbers[i].textContent;
                    }
                    updateDisplay();
                    secondNumber = Number(displayValue); 
                    choseOp = true;
                }
            }
            
        });

        window.addEventListener("keydown", (e) => {
            if(choseSecond) {
                if(e.code === `Digit${numbers[i].textContent}` || e.code === `Numpad${numbers[i].textContent}`){
                    if(alreadyPressed) {
                        displayValue = "";
                        display.textContent = numbers[i].textContent;   
                        displayValue = display.textContent;
                        alreadyPressed = false;
                    } else {
                        if(displayValue === String(firstNumber) && !check) {
                            displayValue = numbers[i].textContent;  
                            check = true;
                        } else {
                            displayValue += numbers[i].textContent;
                        }
                        updateDisplay();
                        secondNumber = Number(displayValue); 
                        choseOp = true;
                    }
                }
            }
        });
    }
}

function getResultWithOpFunc() {
    if(choseOp) {
        displayValue = operate(firstNumber, operator, secondNumber);
        roundDecimals = String(displayValue).split(".");
        if(roundDecimals[1] !== undefined) {
            shortenDecimal();
        } else {
            updateDisplay();
        }
        display.textContent = displayValue;
        firstNumber = Number(displayValue);
        operator = operators[i].textContent;
        lastOperator = operator;
        lastSecondNumber = secondNumber;
        choseOp = false;
        displayValue = "";
    }
}

function getResultFunc() {
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
                updateDisplay();
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
            updateDisplay();
        }
        display.textContent = displayValue;
        firstNumber = Number(displayValue);
        alreadyPressed = true;
    }
}

function getResult() {
    equals.addEventListener("click", () => {
        getResultFunc();
    });

    window.addEventListener("keydown", (e) => {
        if(e.code === "NumpadEnter" || e.code === "Equal") {
            getResultFunc();
        }
    });

    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            getResultWithOpFunc();
        });

        window.addEventListener("keydown", (e) => {
            if(e.key === operators[i].textContent) {
                getResultWithOpFunc();
            }
        });
    }
}

function addDecimal() {
    decimal.addEventListener("click", () => {
        if(!displayValue.includes(".")) {
            displayValue += decimal.textContent;
            updateDisplay();
            decimal.disabled = true;
        }
    });
}

function deleteLastFunc() {
    if(displayValue.substring(0, displayValue.length - 1) === "") {
        displayValue = "0";
    } else {
        displayValue = displayValue.substring(0, displayValue.length - 1);
    }
    updateDisplay();
    
    if(choseSecond) {
        secondNumber = Number(displayValue); 
    } else {
        firstNumber = Number(displayValue);
    }
}

function deleteLast() {
    delBtn.addEventListener("click", () => {
        deleteLastFunc();
    });

    window.addEventListener("keydown", (e) => {
        if(e.code === "Backspace") {
            deleteLastFunc();
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

function updateDisplay() {
    display.textContent = displayValue;
    if(displayValue.length > 9) {
        display.textContent = displayValue.substring(0, 9);
    }
}

function populateDisplay() {
    getFirstNumber();
    getOperator();
    getSecondNumber();
    getResult();
    addDecimal();
    deleteLast();
    clearDisplay();
    updateDisplay();
}
populateDisplay();
