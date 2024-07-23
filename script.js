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

const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
let displayValue = "0";
let choseSecond = false, choseOp = false;
let firstNumber = null, operator = null, secondNumber = null;

function populateDisplay() {
    getFirstNumber();

    getOperator();

    getSecondNumber();

    getResult();
}

function getFirstNumber() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            if(!choseSecond) {
                if(displayValue === "0") {
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue;
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
            }
        });
    
    }
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
        })
    }
}

function getResult() {
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(choseOp) {
                displayValue = operate(firstNumber, operator, secondNumber);
                display.textContent = displayValue;
                firstNumber = Number(display.textContent);
                operator = operators[i].textContent;
                choseOp = false;
                displayValue = "";
            }
        });
    }
}
populateDisplay();



























































/* function pickFirst(display) {
    for(let i = 0; i < numbers.length; i++) {  
        numbers[i].addEventListener("click", () => {
            if(!choseSecond) {
                if(displayValue === "0") {
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue; 
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue; 
                }
                firstNumber = Number(display.textContent);
            }
        });
    }
}

function pickOperator() {
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(firstNumber !== null) {
                operator = operators[i].textContent;
                choseSecond = true;
            }
        });
    }
}

function pickSecond(display) {
    for(let i = 0; i < numbers.length; i++) {
        let check = false;
        numbers[i].addEventListener("click", () => {
            if(choseSecond) {
                if(display.textContent === String(firstNumber) && check === false){
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue;
                    check = true;
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue;
                }
                secondNumber = Number(display.textContent);
            }
        });
    }
}

function calculateResult(display) {
    equals.addEventListener("click", () => {
        if(firstNumber !== null && operator !== null && secondNumber !== null) {
            displayValue = operate(firstNumber, operator, secondNumber);
            display.textContent = displayValue;
            firstNumber = Number(display.textContent);
            
        } else {
            display.textContent = "NaN";
        }
    });
}


function populateDisplay() {
    const display = document.querySelector(".display");
    for(let i = 0; i < numbers.length; i++) {  
        numbers[i].addEventListener("click", () => {
            if(!choseSecond) {
                if(displayValue === "0") {
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue; 
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue; 
                }
                firstNumber = Number(display.textContent);
            }
        });
    }
    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", () => {
            if(firstNumber !== null) {
                operator = operators[i].textContent;
                choseSecond = true;
            }
        });
    }
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", () => {
            let check = false;
            if(choseSecond) {
                if(display.textContent === String(firstNumber) && check === false){
                    displayValue = numbers[i].textContent;
                    display.textContent = displayValue;
                    check = true;
                } else {
                    displayValue += numbers[i].textContent;
                    display.textContent = displayValue;
                }
                secondNumber = Number(display.textContent);
            }
        });
    }
    equals.addEventListener("click", () => {
        if(firstNumber !== null && operator !== null && secondNumber !== null) {
            displayValue = operate(firstNumber, operator, secondNumber);
            display.textContent = displayValue;
            firstNumber = Number(display.textContent);
            
        } else {
            display.textContent = "NaN";
        }
    });
    
    
    
    
    
    
    
    
    
    
    
    
    pickFirst(display);
    pickOperator();
    pickSecond(display);
    equals.addEventListener("click", () => {
        displayValue = operate(firstNumber, operator, secondNumber);
        display.textContent = displayValue;
    }) 

populateDisplay();
*/
