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

equalBtn.addEventListener('click', computeResult);

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
}

function handleOperators(screen) {
	if (screen.isAllDigits) {
		displayInput.textContent += ' ' + screen.button;
	} else if (screen.isOperatorAtEnd) {
		displayInput.textContent = screen.switchLast(screen.button);
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

function computeResult(event) {
	const operandOne = Number(displayInput.textContent.split(' ')[0]);
	const operandTwo = Number(displayInput.textContent.split(' ')[2]);
	const operator = displayInput.textContent.split(' ')[1];

	displayOutput.textContent = operate(operator, operandOne, operandTwo);
}