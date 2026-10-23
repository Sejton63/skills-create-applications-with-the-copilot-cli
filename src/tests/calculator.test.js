const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { calculate, modulo, power, squareRoot } = require("../calculator.js");

describe("calculator", () => {
  describe("addition", () => {
    it("adds the example operands", () => {
      assert.equal(calculate("+", 2, 3), 5);
    });

    it("supports the named operation and negative and decimal numbers", () => {
      assert.equal(calculate("add", -2.5, 1), -1.5);
    });
  });

  describe("subtraction", () => {
    it("subtracts the example operands", () => {
      assert.equal(calculate("-", 10, 4), 6);
    });

    it("supports the named operation and negative results", () => {
      assert.equal(calculate("subtract", 3, 8), -5);
    });
  });

  describe("multiplication", () => {
    it("multiplies the example operands", () => {
      assert.equal(calculate("*", 45, 2), 90);
    });

    it("supports the named operation and zero", () => {
      assert.equal(calculate("multiply", 7, 0), 0);
    });
  });

  describe("division", () => {
    it("divides the example operands", () => {
      assert.equal(calculate("/", 20, 5), 4);
    });

    it("supports the named operation and fractional results", () => {
      assert.equal(calculate("divide", 7, 2), 3.5);
    });

    it("throws a clear error when dividing by zero", () => {
      assert.throws(
        () => calculate("/", 20, 0),
        { message: "Cannot divide by zero." },
      );
      assert.throws(
        () => calculate("divide", 20, 0),
        { message: "Cannot divide by zero." },
      );
    });
  });

  describe("modulo", () => {
    it("calculates the example remainder", () => {
      assert.equal(modulo(5, 2), 1);
      assert.equal(calculate("%", 5, 2), 1);
      assert.equal(calculate("modulo", 5, 2), 1);
    });

    it("returns zero when the dividend is evenly divisible", () => {
      assert.equal(modulo(6, 3), 0);
    });

    it("preserves the dividend's sign for negative dividends", () => {
      assert.equal(modulo(-5, 2), -1);
    });

    it("throws a clear error when the divisor is zero", () => {
      assert.throws(() => modulo(10, 0), {
        message: "Cannot calculate modulo by zero.",
      });
    });
  });

  describe("power", () => {
    it("calculates the example power", () => {
      assert.equal(power(2, 3), 8);
      assert.equal(calculate("power", 2, 3), 8);
      assert.equal(calculate("^", 2, 3), 8);
    });

    it("returns one for an exponent of zero", () => {
      assert.equal(power(5, 0), 1);
    });
  });

  describe("square root", () => {
    it("calculates the example square root", () => {
      assert.equal(squareRoot(16), 4);
      assert.equal(calculate("squareRoot", 16), 4);
      assert.equal(calculate("sqrt", 16), 4);
    });

    it("returns zero for zero", () => {
      assert.equal(squareRoot(0), 0);
    });

    it("throws a clear error for negative numbers", () => {
      assert.throws(() => squareRoot(-1), {
        message: "Cannot calculate the square root of a negative number.",
      });
    });
  });

  it("rejects unsupported operations", () => {
    assert.throws(
      () => calculate("unknown", 10, 3),
      { message: "Unsupported operation: unknown" },
    );
  });
});
