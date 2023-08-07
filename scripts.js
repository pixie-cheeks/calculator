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
			return 'Error from operate()';
	}
}

function populateInput(event) {
	const scrnInfo = {
		event: event,
		text: displayInput.textContent,
		button: event.target.textContent,
		className: event.target.className,
		exprLength: displayInput.textContent.split(' ').length,
		isScrnEmpty: displayInput.textContent === '',
	}
	scrnInfo.isOperatorAtEnd = scrnInfo.exprLength === 2;
	scrnInfo.isOperatorOnScrn = scrnInfo.exprLength > 1 && !scrnInfo.isOperatorAtEnd;
	scrnInfo.isBtnDigit = /\d/.test(scrnInfo.button);
	scrnInfo.isBtnOperator = scrnInfo.className.includes('operator');
	scrnInfo.isAllDigits = /^[\d\.]+$/.test(scrnInfo.text);
	scrnInfo.switchLast = button => scrnInfo.text.replace(/.$/, button);


	if (scrnInfo.text.length === 25) {
		displayMessage.textContent = 'Max Char limit reached.';
	} else if (scrnInfo.isBtnDigit) {
		handleDigits(scrnInfo);
	} else if (scrnInfo.isBtnOperator) {
		handleOperators(scrnInfo);
	} else {
		handleDecimal(scrnInfo);
	}
}

function handleDigits(screen) {
	if (screen.isScrnEmpty) {
		displayInput.textContent = screen.button;
	} else if (screen.isOperatorAtEnd) {
		displayInput.textContent += ' ' + screen.button;
	} else {
		displayInput.textContent += screen.button;
	}
	displayMessage.textContent = '';
}

function handleOperators(screen) {
	if (screen.isAllDigits) {
		displayInput.textContent += ' ' + screen.button;
	} else if (screen.isOperatorAtEnd) {
		displayInput.textContent = screen.switchLast(screen.button);
	} else if (screen.isOperatorOnScrn) {
		resultFromChaining(screen);
	}
}

function handleDecimal(screen) {
	const isDecimalInNumOne = screen.text.split(' ')[0].includes('.');
	const isDecimalInNumTwo = `${screen.text.split(' ')[2]}`.includes('.');
	if (screen.isAllDigits && !isDecimalInNumOne) {
		displayInput.textContent += screen.button;
	} else if (screen.isOperatorOnScrn && !isDecimalInNumTwo) {
		displayInput.textContent += screen.button;
	}
}

function clearInput(event) {
	const button = event.target;
	const text = displayInput.textContent.replace();
	const isOutputEmpty = displayOutput.textContent === '';
	if (button.className.includes('clear')) {
		displayInput.textContent = '';
		displayOutput.textContent = '';
	} else {
		if (isOutputEmpty) {
			displayInput.textContent = handleCE(text);
		} else {
			displayInput.textContent = handleCE(text);
			displayOutput.textContent = '';
		}
	}
	displayMessage.textContent = '';

	function handleCE(string) {
		const targetChar = string.charAt(string.length - 1);
		const isNotDigit = /[ \D]/.test(targetChar);
		if (isNotDigit) {
			return string.replace(/[ \D]+/g, '');
		} else {
			return string.slice(0, string.length - 1);
		}
	}
}

function resultFromEqual() {
	const operandOne = Number(displayInput.textContent.split(' ')[0]);
	const operandTwo = Number(displayInput.textContent.split(' ')[2]);
	const operator = displayInput.textContent.split(' ')[1];
	const result = operate(operator, operandOne, operandTwo);

	const isZero = operandTwo === 0;
	const isDivision = operator === '÷';
	const isOuputValid = !isNaN(+result);
	const isAllDigits = /^\d+$/.test(displayInput.textContent);

	if (isDivision && isZero) {
		displayMessage.textContent = 'Division by zero is undefined.';
	} else if (isOuputValid) {
		displayResult(result);
	} else if (isAllDigits) {
		displayResult(Number(displayInput.textContent));
	} else {
		displayMessage.textContent = 'Invalid input.';
	}
}

function resultFromChaining(screen) {
	const operandOne = Number(displayInput.textContent.split(' ')[0]);
	const operandTwo = Number(displayInput.textContent.split(' ')[2]);
	const operator = displayInput.textContent.split(' ')[1];

	const result = operate(operator, operandOne, operandTwo);
	displayInput.textContent = result + ' ' + screen.button;

	displayResult(result);
}

function displayResult(result) {
	if (result.toString().length > 12) {
		handleOverflow(result);
	} else {
		displayOutput.textContent = result;
	}
}

function handleOverflow(answer) {
	let output = parseFloat(answer.toFixed(11));
	if (output.toString().length > 12) {
		displayMessage.textContent = 'Maximum limit exceeded.';
	} else {
		displayOutput.textContent = output;
		displayMessage.textContent = '';
	}
}

function attachKeyboard(event) {
	const validKeys = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'.', 'Enter', '+', '-', '*', '/', 'C', 'Backspace'
	];
	if (!validKeys.includes(event.key)) return;

	const easyToMap = document.querySelectorAll('button:not(.meta, .operator)');
	easyToMap.forEach(button => {
		if (button.textContent === event.key) {
			button.click();
		}
	});

	const harderToMap = document.querySelectorAll('.meta, .operator');
	harderToMap.forEach(button => {
		if (button.id === event.key) {
			button.click();
		}
	});
}

// input limit at 25 characters
// output limit at 12 characters

const displayInput = document.querySelector('.screen-input');
const displayOutput = document.querySelector('.screen-result');
const displayMessage = document.querySelector('.screen-messages');
const inputBtns = document.querySelectorAll('button:not(.meta)');
const clearBtns = document.querySelectorAll('.meta:not(.equal)')
const equalBtn = document.querySelector('.equal');

inputBtns.forEach(button => {
	button.addEventListener('click', populateInput);
});
clearBtns.forEach(button => button.addEventListener('click', clearInput));
equalBtn.addEventListener('click', resultFromEqual);

const calculator = document.querySelector('.calculator-card');

calculator.addEventListener('click', () => calculator.focus);

calculator.addEventListener('keydown', attachKeyboard);
