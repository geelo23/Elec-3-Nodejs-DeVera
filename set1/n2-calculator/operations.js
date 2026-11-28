function add(numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

function subtract(numbers) {
  return numbers.slice(1).reduce((result, number) => result - number, numbers[0]);
}

function multiply(numbers) {
  return numbers.reduce((result, number) => result * number, 1);
}

function divide(numbers) {
  if (numbers.slice(1).some((number) => number === 0)) {
    throw new Error('Division by zero is not allowed.');
  }

  return numbers.slice(1).reduce((result, number) => result / number, numbers[0]);
}

function average(numbers) {
  return add(numbers) / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
