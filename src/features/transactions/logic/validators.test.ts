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
 * - Minus sign decimal
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
        const input: string = "    123.45    "
        const result = validateAmount(input);
        expect(result.amount).toEqual(123.45);
        expect(result.isInvalidTransaction).toBe(false);
        expect(result.amountType).toBe("income");
        expect(result.msg).toBe("");
    });
});
