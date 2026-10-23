#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
const OPERATIONS = {
  add: (left, right) => left + right,
  "+": (left, right) => left + right,
  subtract: (left, right) => left - right,
  "-": (left, right) => left - right,
  multiply: (left, right) => left * right,
  "*": (left, right) => left * right,
  divide: (left, right) => left / right,
  "/": (left, right) => left / right,
};

function calculate(operation, left, right) {
  if (!Object.hasOwn(OPERATIONS, operation)) {
    throw new Error(`Unsupported operation: ${operation}`);
  }
  const calculateOperation = OPERATIONS[operation];
  if (operation === "divide" || operation === "/") {
    if (right === 0) {
      throw new Error("Cannot divide by zero.");
    }
  }
  return calculateOperation(left, right);
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide|+|-|*|/> <number> <number>",
    );
  }

  const [operation, leftInput, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);
  if (
    leftInput.trim() === "" ||
    rightInput.trim() === "" ||
    !Number.isFinite(left) ||
    !Number.isFinite(right)
  ) {
    throw new Error("Both operands must be finite numbers.");
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

module.exports = { calculate };
