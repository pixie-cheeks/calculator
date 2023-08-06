let firstNum;
let secondNum;
let operator;

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
		case '-':
			return subtract(firstNum, secondNum);
		case '*':
			return multiply(firstNum, secondNum);
		case '/':
			return divide(firstNum, secondNum);
		default:
			return 'Error from operate()'
	}
}