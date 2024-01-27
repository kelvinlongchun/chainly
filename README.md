# Overview

This npm module converts your functions to a method chain.

# Why should I use this?

1. Method chaining is one of the promgamming styles. For me, it is more readable.
2. By using one simple function, you don't need to define any class any more for implementing method chaining.
3. The data in the chain object is immutable (Just like using functions `map`, `filters`, `slice` in arrays). It's functional-programming-friendly.

# Get Started

## Setup

You need to install module `chainly` first.

```
npm i chainly
```

Import the module

```ts
import chainly from "chainly";
```

## Create a method chain

You can use function `createChain(funcs)` to create a chain for a specific data type. In the below example, I will use `number`.

Parameter `funcs` should be an object of curried functions. Which means for each curried function, there are 2 groups of parameter(s). The type signature of the function is `(value: T) => (...args: any) => T`.

The chain will return a function. If we want to use the chain, we need to put the data to the chain (Please see the detail in the next part).

```ts
// Build the chain
const numberChain = chainly.createChain({
  add: (value: number) => (num: number) => value + num,
  minus: (value: number) => (num: number) => value - num,
  multiply: (value: number) => (num: number) => value * num,
  divide: (value: number) => (num: number) => value / num,
});
```

## Add the data to initiate the chain

The chain actually is a function. When we want to use the chain, we need to put the data to the chain. After that, we will get a chain object. The reason why we set the chain as a function is to make the code more reusable.

In the below case, we put number `num1` into chain `numberChain`. `num2` now is a chain object.

```ts
// Initiate the data
const num1 = 100;
const num2 = numberChain(num1);
```

## Read the data

In the chain object, we can use property `value` to get the value. (Please note that this value is immutable.)

```ts
// Read the data
console.log(num2.value);

// value is immutable
num2.value = 10; // Return Error
```

## Use the chain

```ts
// Use the methods in a chain
const num3 = num2.add(10).minus(1).multiply(5).divide(10); // Value = (100 + 10 - 1) * 5 / 10 = 54.5
```

# Built-ins

There are 2 built-in functions you can use in chain objects.

## `map(callback)`

Like arrays' function `map`, function `map(callback)` will copy the data and return a new chain object. You can put a callback function into the parameter for update the value.

```ts
// Function map
const num4 = num2.map((n) => n * n); // Value = 100 * 100 = 10000
```

## `trace()`

Function `trace()` is a debug function. Which will print the current value if we call it in the chain.

```ts
// Function trace
const num5 = num2
  .add(10)
  .trace() // Console: 110
  .minus(1)
  .trace() // Console: 109
  .multiply(5)
  .trace() // Console: 545
  .divide(10);
```

# Example

Please check the code in [/src/examples/exmaple.ts](https://github.com/kelvinlongchun/chainly/blob/main/examples/example.ts)
