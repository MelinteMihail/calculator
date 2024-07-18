const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
let displayValue = document.querySelector("input");


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

let firstNumber, operator, secondNumber;

function operate(firstNumber, operator, secondNumber) {
    switch(operator) {
        case "+":
            return add(firstNumber,secondNumber);
    
        
        case "-":
            return subtract(firstNumber,secondNumber);


        case "*":
            return multiply(firstNumber,secondNumber);


        case "/":
            return divide(firstNumber,secondNumber);
    }
}


for(let i = 0; i < digits.length; i++) {
    digits[i].addEventListener("click", () => {
        displayValue.value += i+1;
    });
}

for(let j = 0; j < operators.length; j++) {
    operators[j].addEventListener("click", () => {
        firstNumber = Number(displayValue.value);
        operator = operators[j].textContent;
        displayValue.value = "";
    });
}

equals.addEventListener("click", () => {
    secondNumber = Number(displayValue.value);
    let result = operate(firstNumber, operator, secondNumber);
    displayValue.value = result;
});
