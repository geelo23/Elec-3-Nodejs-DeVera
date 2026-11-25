function formatResult(operation, numbers, result) {
  const symbols = {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    average: 'avg'
  };
  const expression = operation === 'average'
    ? `avg(${numbers.join(', ')})`
    : numbers.join(` ${symbols[operation]} `);

  return `${expression} = ${result}`;
}

module.exports = formatResult;
