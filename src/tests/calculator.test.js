const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { calculate } = require("../calculator.js");

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

  it("rejects unsupported operations", () => {
    assert.throws(
      () => calculate("%", 10, 3),
      { message: "Unsupported operation: %" },
    );
  });
});
