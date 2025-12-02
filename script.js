const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// basic math functions
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

// update display
function updateDisplay(value) {
  display.textContent = value;
}

// number button events
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

// operator button events
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

// equals
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

// clear
document.querySelector(".clear").addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
});
