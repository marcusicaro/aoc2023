const fs = require('fs');
const path = require('path');
const inputArr = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')
  .split('\n');
let pattern = /\d+/g;
let nonNumberPattern = /[^0-9.]/;
let sum = 0;

for (let i = 0; i < inputArr.length; i++) {
  let row = inputArr[i];
  let numbers = [];
  let match;

  while ((match = pattern.exec(row))) {
    numbers.push({
      start: match.index,
      end: pattern.lastIndex,
      value: match[0],
    });
  }

  for (let l = 0; l < numbers.length; l++) {
    let number = numbers[l];
    let shouldSum = false;
    for (let y = i - 1; y <= i + 1; y++) {
      for (let x = number.start - 1; x <= number.end; x++) {
        if (y >= 0 && y < inputArr.length && x >= 0 && inputArr[i].length > x) {
          if (
            nonNumberPattern.test(inputArr[y][x])
          ) {
            shouldSum = true;
          }
        }
      }
    }
    if (shouldSum) sum += parseInt(number.value);
  }
}

console.log('sum: ', sum);