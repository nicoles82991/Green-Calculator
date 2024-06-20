const display = document.getElementById("display");

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "0" && this.currentOperand === "") return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "sqrt":
        computation = Math.sqrt(prev);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }
  updateDisplay() {
    this.displayElement.value = this.currentOperand;
  }
}

const calculator = new Calculator(display);

document.querySelectorAll("[data-number]").forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  })
);

document.querySelectorAll("[data-operation]").forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  })
);

document.querySelector("[data-equals]").addEventListener("click", () => {
  calculator.compute();
});

document.querySelector("[data-clear]").addEventListener("click", () => {
  calculator.clear();
});
