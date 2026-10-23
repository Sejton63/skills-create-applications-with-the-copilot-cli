#!/usr/bin/env node

// Supported operations: arithmetic (+, -, *, /, %), power, and square root.
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Cannot calculate modulo by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

const OPERATIONS = {
  add: (left, right) => left + right,
  "+": (left, right) => left + right,
  subtract: (left, right) => left - right,
  "-": (left, right) => left - right,
  multiply: (left, right) => left * right,
  "*": (left, right) => left * right,
  divide: (left, right) => left / right,
  "/": (left, right) => left / right,
  modulo,
  "%": modulo,
  power,
  "^": power,
  "**": power,
  squareRoot: (n) => squareRoot(n),
  sqrt: (n) => squareRoot(n),
};

function calculate(operation, left, right) {
  if (!Object.hasOwn(OPERATIONS, operation)) {
    throw new Error(`Unsupported operation: ${operation}`);
  }
  const calculateOperation = OPERATIONS[operation];
  if (operation === "squareRoot" || operation === "sqrt") {
    return calculateOperation(left);
  }
  if (operation === "divide" || operation === "/") {
    // Avoid returning Infinity for a zero divisor.
    if (right === 0) {
      throw new Error("Cannot divide by zero.");
    }
  }
  if (operation === "modulo" || operation === "%") {
    return calculateOperation(left, right);
  }
  return calculateOperation(left, right);
}

function main(args) {
  const unaryOperation = args[0] === "squareRoot" || args[0] === "sqrt";
  if (args.length !== (unaryOperation ? 2 : 3)) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power|squareRoot|+|-|*|/|%|^|**|sqrt> <number> [number]",
    );
  }

  const [operation, leftInput, rightInput] = args;
  const left = Number(leftInput);
  const right = unaryOperation ? undefined : Number(rightInput);
  if (
    leftInput.trim() === "" ||
    !Number.isFinite(left) ||
    (!unaryOperation &&
      (rightInput.trim() === "" || !Number.isFinite(right)))
  ) {
    throw new Error(
      unaryOperation
        ? "The operand must be a finite number."
        : "Both operands must be finite numbers.",
    );
  }

  console.log(calculate(operation, left, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
