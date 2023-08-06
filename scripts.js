let firstNum;
let secondNum;
let operator;

// input limit at 25 characters
// output limit at 12 characters

const displayInput = document.querySelector('.screen-input');
const displayOutput = document.querySelector('.screen-result');
const displayMessage = document.querySelector('.screen-messages');
const inputBtns = document.querySelectorAll('button:not(.meta)');

inputBtns.forEach(button => {
	if (button.className.includes('operator')) {
		button.addEventListener('click', inputOperators);
	} else {
		button.addEventListener('click', inputDigits);
	}
});

function add(addendOne, addendTwo) {
	return addendOne + addendTwo;
}

function subtract(minuend, subtrahend) {
	return minuend - subtrahend;
}

function multiply(factorOne, factorTwo) {
	return factorOne * factorTwo;
}

function divide(dividend, divisor) {
	return dividend / divisor;
}

function operate(operator, firstNum, secondNum) {
	switch (operator) {
		case '+':
			return add(firstNum, secondNum);
		case '−':
			return subtract(firstNum, secondNum);
		case '×':
			return multiply(firstNum, secondNum);
		case '÷':
			return divide(firstNum, secondNum);
		default:
			return 'Error from operate()'
	}
}

function inputDigits(event) {
	const display = displayInput.textContent;
	const button = event.target.textContent;

	if (display.length === 25) {
		displayMessage.textContent = 'Max Char limit reached.';
		return;
	} else if (button === '.' && display.includes('.')) {
		return;
	} else if (isNaN(+display.charAt(display.length - 1))) {
		displayInput.textContent += ' ' + button;
		displayMessage.textContent = '';
	} else {
		displayInput.textContent += button;
		displayMessage.textContent = '';
	}
}

function inputOperators(event) {
	const display = displayInput.textContent;
	const button = event.target.textContent;

	if (display.length === 25) {
		displayMessage.textContent = 'Max Char limit reached.';
		return;
	} else if (display.length === 0) {
		return;
	} else if (isNaN(+display.charAt(display.length - 1))) {
		if (display.charAt(display.length - 1) === button) return;
		displayInput.textContent = display.slice(0, display.length - 1) + button;
		displayMessage.textContent = '';
	} else  {
		displayInput.textContent += ' ' +button;
		displayMessage.textContent = '';
	}
}