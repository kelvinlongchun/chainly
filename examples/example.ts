import chainly from "chainly";

// Build the chain
const numberChain = chainly.createChain({
  add: (value: number) => (num: number) => value + num,
  minus: (value: number) => (num: number) => value - num,
  multiply: (value: number) => (num: number) => value * num,
  divide: (value: number) => (num: number) => value / num,
});

// Initiate the data
const num1 = 100;
const num2 = numberChain(num1);

// Read the data
console.log(num2.value);

// value is immutable
num2.value = 10; // Return Error

// Use the methods in a chain
const num3 = num2.add(10).minus(1).multiply(5).divide(10); // Value = (100 + 10 - 1) * 5 / 10 = 54.5

// Function map
const num4 = num2.map((n) => n * n); // Value = 100 * 100 = 10000

// Function trace
const num5 = num2
  .add(10)
  .trace() // Console: 110
  .minus(1)
  .trace() // Console: 109
  .multiply(5)
  .trace() // Console: 545
  .divide(10);
