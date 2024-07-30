const numbers = document.querySelectorAll(".operand");
const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const delBtn = document.querySelector(".delete");
const signBtn = document.querySelector(".sign");
let displayValue = "0";
let choseSecond = false, choseOp = false;
let firstNumber = null, operator = null, secondNumber = null;
let lastOperator = null, lastSecondNumber = null;
let roundDecimals = [], alreadyPressed = false;
let result = null;
let check = false;

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
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(choseSecond) {
                if(alreadyPressed) {
                    displayValue = "";
                    display.textContent = numbers[i].textContent;   
                    displayValue = display.textContent;
                    alreadyPressed = false;
                    secondNumber = Number(displayValue);
                    choseOp = true;
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


function getResultFunc() {
    if(choseOp) {
        result = String(operate(firstNumber, operator, secondNumber));
        displayValue = result;
        if(operator === "/" && String(secondNumber) === "0") {
            displayValue = "";
            display.textContent = "You can't divide by 0!";
            disableButtons();
            setTimeout(() => {
                resetAll();
                enableButtons();
            }, 2500);
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
        result = String(operate(firstNumber, lastOperator, lastSecondNumber));
        displayValue = result;
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
            if(choseOp) {
                result = String(operate(firstNumber, operator, secondNumber));
                displayValue = result;
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
        });
        window.addEventListener("keydown", (e) => {
            if(e.key === operators[i].textContent) {
                if(choseOp) {
                    result = String(operate(firstNumber, operator, secondNumber));
                    displayValue = result;
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

    window.addEventListener("keydown", (e) => {
        if(e.key === decimal.textContent) {
            if(!displayValue.includes(".")) {
                displayValue += decimal.textContent;
                updateDisplay();
                decimal.disabled = true;
            }
        }
    });
}

function resetAll() {
    displayValue = "0";
    updateDisplay();
    choseSecond = false, choseOp = false;
    firstNumber = null, operator = null, secondNumber = null;
    lastOperator = null, lastSecondNumber = null;
    roundDecimals = [];
    result = null;
    check = false;
}

function deleteLastFunc() {
    if(display.textContent === result) {
        resetAll();
    } else {
        if(displayValue.substring(0, displayValue.length - 1) === "") {
            displayValue = "0";
        } else {
            displayValue = displayValue.substring(0, displayValue.length - 1);
        }
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
        resetAll();
    });
}

function updateDisplay() {
    display.textContent = displayValue;
    if(displayValue.includes(".")){
        if(displayValue.length > 14 ) {
            display.textContent = displayValue.substring(0, 14);
        }
    } else {
        if(displayValue.length > 9 ) {
            display.textContent = displayValue.substring(0, 9);
        }
    }
}

function changeSign() {
    signBtn.addEventListener("click", () => {
        displayValue = String(Number(displayValue) * -1);
        display.textContent = displayValue;

        if(choseSecond) {
            secondNumber = Number(displayValue);
        } else {
            firstNumber = Number(displayValue);
        }
    });
}

function addTransition() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.transition = "all 0.3s";
    }
}

function disableButtons() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].style.transition = "all 0.5s";
    }
}

function enableButtons() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    addTransition();
}

function shortenDecimal() {
    if(roundDecimals[1].length > 3) {
        displayValue = String(Number(displayValue).toFixed(5));
    }
    updateDisplay()
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
    changeSign();
    addTransition();
}
populateDisplay();
