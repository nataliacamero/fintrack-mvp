import { validateAmount } from "./validators";
import { describe, expect, test } from "vitest";
import { MAX_AMOUNT, MIN_AMOUNT } from "./constants";

/**
 * Tests must have this steps:
 * // 1. Arrange (Set up the data)
 * const input: string = "    123.45    ";
 *
 * // 2. Act (Execute the function)
 * const result = validateAmount(input);
 *
 * // 3. Assert (Check EVERYTHING that matters)
 * expect(result.amount).toEqual(123.45);
 */

/**
 * I have to validate the limits: valores limite 2-numbers: invalid-valid-valid-invalid
 * Hapy path: valid number: positive, negative, and between inferior and superior limits. with and without decimals (max 2 decimals).
 * Sad path: invalid numbers by type. More than two decimals. Zero values and values up and down off the limits.
 * Edge cases: string or empty values, trimed values.
 */

/**
 * Hapy paths validations:
 * - Sanitiztion case (Trim, etc)
 * - Positive integer
 * - Negative integer
 * - Positive decimal
 * - Negative decimal
 * - Minus sign integer
 */

/**
 * Sad paths validations:
 * - Empty value
 * - Zero value
 * - More than two decimals
 * - Value out of limits (up)
 * - Value out of limits (down)
 */

describe("Happy paths TC-HU001: Amount validations.", () => {
  test("Positive amount is sanitized, removing spaces before processing", () => {
    const input: string = "    123.45    ";
    const result = validateAmount(input);
    expect(result.amount).toEqual(123.45);
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.amountType).toBe("income");
    expect(result.msg).toBe("");
  });
  test("Positive value without decimals.", () => {
    // Arrange
    const input: string = "3000";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBe(3000);
    expect(result.amountType).toBe("income");
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.msg).toBe("");
  });
  test("Positive value with only one decimal.", () => {
    // Arrange
    const input = " 2016.3";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBe(2016.3);
    expect(result.amountType).toBe("income");
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.msg).toBe("");
  });
  test("Positive value with two decimals.", () => {
    // Arrange
    const input = "27.16 ";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBe(27.16);
    expect(result.amountType).toBe("income");
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.msg).toBe("");
  });
  test("Negative value with two decimals.", () => {
    // Arrange
    const input = "-51.99";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBe(-51.99);
    expect(result.amountType).toBe("expense");
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.msg).toBe("");
  });
  test("Negative integer.", () => {
    // Arrange
    const input = "-500";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBe(-500);
    expect(result.amountType).toBe("expense");
    expect(result.isInvalidTransaction).toBe(false);
    expect(result.msg).toBe("");
  });
});

describe("Sad paths TC-HU001: Amount validations.", () => {
  test("Zero negative value, without decimals.", () => {
    // Arrange
    const input = "-0";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toBe("Empty or null value: -0");
  });
  test("Zero positive value, with two decimals.", () => {
    // Arrange
    const input = "0.00";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toBe("Empty or null value: 0.00");
  });
  test("Only spaces input.", () => {
    // Arrange
    const input = "   ";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toBe("Empty string value is not a valid amount: ");
  });
  test("Should reject numbers with internal spaces.", () => {
    // Arrange
    const input = "2 7.1 6 ";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
  });
  test("Should reject not a real numbers at left side.", () => {
    // Arrange
    const input = "abc.123";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.amountType).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toContain("Invalid number: NaN NaN");
  });
  test("Should reject not a real numbers at right side.", () => {
    // Arrange
    const input = "123.abc";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.amountType).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toContain("Invalid number: NaN NaN");
  });
  test("Should reject inputs like 12.34.55", () => {
    // Arrange
    const input = "-12.34.55";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.amountType).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toContain("Invalid number: NaN NaN");
  });
  test("Should reject symbols like /*,.&%$", () => {
    // Arrange
    const input = "/*,.&%$";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.amountType).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toContain("Invalid number: NaN NaN");
  });
  test("Should reject input with letters like abc", () => {
    // Arrange
    const input = "abc";
    // Act
    const result = validateAmount(input);
    // Assert
    expect(result.amount).toBeUndefined();
    expect(result.amountType).toBeUndefined();
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toContain("Invalid number: NaN NaN");
  });
  test("Should reject input with more than two decimals, and display an error message.", () => {
    // 1. Arrange (Set up the data)
    const input: string = "10.7898546";
    // 2. Act (Execute the function)
    const result = validateAmount(input);
      
    // 3. Assert (Check EVERYTHING that matters)
    expect(result.isInvalidTransaction).toBeTruthy();
    expect(result.msg).toBe("Has more than 2 decimals");
  });
});

describe("BVA TC-001: Limit boundaries.", () => {
  test("Should reject one unit above the maximum limit", () => {
    const invalidMaximum = (MAX_AMOUNT + 1).toString();
    const message = `Amount ${invalidMaximum} is out of limits: minimum: ${MIN_AMOUNT}, maximum: ${MAX_AMOUNT}`;
    const result = validateAmount(invalidMaximum);
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toBeDefined();
    expect(result.msg).toContain(message);
    expect(result.msg).toBe(message);
  });
  test("Should accept the exact maximum limit", () => {
    const result = validateAmount(MAX_AMOUNT.toString());
    expect(result.amount).toBe(MAX_AMOUNT);
    expect(result.amountType).toBe("income");
    expect(result.isInvalidTransaction).toBe(false);
  });
  test("Should accept the exact minimum limit", () => {
    const result = validateAmount(MIN_AMOUNT.toString());
    expect(result.amount).toBe(MIN_AMOUNT);
    expect(result.amountType).toBe("expense");
    expect(result.isInvalidTransaction).toBe(false);
  });
  test("Should reject one unit below the minimum limit", () => {
    const invalidMinimum = (MIN_AMOUNT - 1).toString();
    const expectedMessage = `Amount ${invalidMinimum} is out of limits: minimum: ${MIN_AMOUNT}, maximum: ${MAX_AMOUNT}`;
    const result = validateAmount(invalidMinimum);
    expect(result.isInvalidTransaction).toBe(true);
    expect(result.msg).toBeDefined();
    expect(result.msg).toContain(expectedMessage);
    expect(result.msg).toBe(expectedMessage);
  });
});
