'use strict';

class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.reset();
  }

  reset() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integer = parseFloat(stringNum.split('.')[0]);
    const decimal = stringNum.split('.')[1];
    let integerDisplay;
    if (isNaN(integer)) {
      integerDisplay = '';
    } else {
      integerDisplay = integer.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimal != null) {
      return `${integerDisplay}.${decimal}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentInput.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousInput.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousInput.innerText = '';
    }
  }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const resetBtn = document.querySelector('[data-reset]');
const deleteBtn = document.querySelector('[data-delete]');
const previousInput = document.querySelector('[data-previous]');
const currentInput = document.querySelector('[data-current]');
const themeOne = document.getElementById('one');
const themeTwo = document.getElementById('two');
const themeThree = document.getElementById('three');

const calculator = new Calculator(previousInput, currentInput);

numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', btn => {
  calculator.compute();
  calculator.updateDisplay();
});

resetBtn.addEventListener('click', btn => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', btn => {
  calculator.delete();
  calculator.updateDisplay();
});

themeOne.addEventListener('click', function (e) {
  document.body.classList = '';
  document.body.classList.add('theme1');
});

themeTwo.addEventListener('click', function (e) {
  document.body.classList = '';
  document.body.classList.add('theme2');
});

themeThree.addEventListener('click', function (e) {
  document.body.classList = '';
  document.body.classList.add('theme3');
});
