const os = require('node:os');
const path = require('node:path');
const operations = require('./operations');
const formatResult = require('./formatter');

const [operation, ...rawNumbers] = process.argv.slice(2);
const supportedOperations = Object.keys(operations);

if (!supportedOperations.includes(operation)) {
  console.error(`Error: unknown operation "${operation || ''}". Use: ${supportedOperations.join(', ')}.`);
  process.exitCode = 1;
} else if (rawNumbers.length < 2 || rawNumbers.some((value) => value.trim() === '' || !Number.isFinite(Number(value)))) {
  console.error('Error: provide at least two valid numbers.');
  process.exitCode = 1;
} else {
  const numbers = rawNumbers.map(Number);

  try {
    const result = operations[operation](numbers);
    console.log(`${path.basename(process.argv[1])} on ${os.platform()}: ${formatResult(operation, numbers, result)}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}
