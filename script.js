const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
  if (b === 0) return "Nice Try 😉"; 
  return a / b; 
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
  }
}

function updateDisplay(value) {
  display.textContent = value;
}

document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = btn.textContent;
      shouldResetDisplay = false;
    } else {
      display.textContent += btn.textContent;
    }
  });
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentOperator && !shouldResetDisplay) {
      secondNumber = display.textContent;
      let result = operate(currentOperator, firstNumber, secondNumber);
      result = typeof result === "number" ? Math.round(result * 1000) / 1000 : result;
      updateDisplay(result);
      firstNumber = result;
    } else {
      firstNumber = display.textContent;
    }

    currentOperator = btn.textContent;
    shouldResetDisplay = true;
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (!currentOperator) return;
  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);
  result = typeof result === "number" ? Math.round(result * 1000) / 1000 : result;
  updateDisplay(result);

  firstNumber = result;
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = true;
});

document.querySelector(".clear").addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
});
