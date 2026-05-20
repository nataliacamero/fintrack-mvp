import { MAX_AMOUNT, MIN_AMOUNT } from "./constants";

/**
 * Fase 1 (Entorno): Crear el archivo, entender el problema y escribir pseudocódigo (en
 * español).
 * Fase 2 (Solución): Implementar el algoritmo.
 * Fase 3 (Refinamiento): Probar casos borde (array vacío, negativos, números grandes).
 */

/**
 * We have to validate the amount of the transaction.
 * Wich are the valid values that we expected? the limits. the minor, the biger and not zero.
 * I know that first of all i have to sanitize the input, because it came from a input form, as string.
 * I have to convert to number: Number(amount), and delete blank spaces amount.trim()
 * 1. Not empty = c
 * 2. Valid numeric number: Number.isFinite(amount) && !Number.isNaN(amount) && typeof amount === 'number'
 * 3. Not zero: amount !== -0 && amount !== 0
 * 4. Max 2 decimals: How can I validate that the number has decimals in js. How can I validate the number of decimals?: Number.parseFloat(amount).toFixed(2);
 * 5. Not a big number?
 * For now i am analizyng some examples, It isn't the complete analisys.
 */

/**
 * First of all, we need to do, the validations in this way: (Is just analysis, the implementation comes next)
 * Sanitize the input, with amount.trim().
 * I have to validate none empty value.
 * Convert from string to a number.
 * Not Zero.
 * Validate Max 2 decimals.(We have toi define how to handle this), you said, i have to take 2 decimals after de dot, without change de data, it means, no toFixed.
 * Establish the inferior and superior limits.
 * If is a valide number: positive, negative, and between inferior and superior limits: it is a valid transaction amount.
 * Return an object like {amount: number, amountType: string, error: boolean, msg: string}
 * amountType: 'income' | 'expense': check if the input has an '+' or '-'. if is positive or negative.
 * We have to validate that there is an integuer value, it can't be zero.43434344?
 */

interface TransactionAmountInterface {
  amount?: number;
  amountType?: "income" | "expense";
  isInvalidTransaction?: boolean;
  msg?: string;
}

interface DecimalTreatmentInterface {
  amount?: string;
  error?: boolean;
  msg?: string;
}

// Decimals treatment.
const decimalsTreatment = (value: string): DecimalTreatmentInterface => {
  const hasDecimals = !!value.split(".")[1];
  const hasMoreThanTwoDecimals = value.split(".")[1]?.length > 2;

  if (hasDecimals && hasMoreThanTwoDecimals) {
    console.log("Has decimals and more than 2 decimals");
    return {
      amount: `${value.split(".")[0]}.${value.split(".")[1].slice(0, 2)}`,
      error: true,
      msg: "Has more than 2 decimals",
    };
  } else {
    console.log("No decimals or dcimals quantity ok");
    return { amount: value, error: false, msg: "" };
  }
};

const isExpense = (value: string) => {
  return value.startsWith("-");
};

const amountLimitsValidation = (inputValue: number) => {
  if (inputValue < MIN_AMOUNT || inputValue > MAX_AMOUNT) {
    return {
      error: true,
      msg: `Amount ${inputValue} is out of limits: minimun: ${MIN_AMOUNT}, maximun: ${MAX_AMOUNT}`,
    }
  }
}

function validateAmount(inputValue: string): TransactionAmountInterface {
  console.log(
    "---------------------- Code start from here...: ---------------------",
    inputValue,
  );
  // Sanitize the input
  const nonEmptySpaces = inputValue.trim();
  console.log("Trimed value: Step 1", nonEmptySpaces, typeof nonEmptySpaces);

  // Check allowed decimals
  const { error, msg, amount } = decimalsTreatment(nonEmptySpaces);

  console.log("Allowed decimals check: ", error, msg, amount);
  if (error) {
    return { isInvalidTransaction: error, msg };
  }

  // Convert string to number.
  const inputAsNumber = Number(nonEmptySpaces);

  // Check if the input is not empty
  if (nonEmptySpaces === "") {
    console.log(
      "Empty value is empty string: Step 2",
      nonEmptySpaces,
      typeof nonEmptySpaces,
    );
    return {
      isInvalidTransaction: true,
      msg: `Empty string value is not a valid amount: ${nonEmptySpaces}`,
    };
  }

  //Check if the input is NaN
  if (Number.isNaN(Number(nonEmptySpaces))) {
    console.log(
      "NaN number: Step 3",
      Number(nonEmptySpaces),
      typeof Number(nonEmptySpaces),
    );
    return {
      isInvalidTransaction: true,
      msg: `Invalid number: NaN ${Number(nonEmptySpaces)}`,
    };
  }



  //Check if the input is not zero
  if (typeof inputAsNumber === "number" && !inputAsNumber) {
    console.log(
      "Empty values detected Step 4:",
      inputAsNumber,
      typeof inputAsNumber,
    );
    return {
      isInvalidTransaction: true,
      msg: `Empty or null value: ${nonEmptySpaces}`,
    };
  } else {
    console.log(
      "Valid number detected Step 4:",
      inputAsNumber,
      typeof inputAsNumber,
    );

    const limitsError = amountLimitsValidation(inputAsNumber);
    if (limitsError) {
      return {
        isInvalidTransaction: true,
        msg: limitsError.msg,
      }
    }

    return {
      amount: Number(decimalsTreatment(nonEmptySpaces).amount),
      amountType: isExpense(nonEmptySpaces) ? "expense" : "income",
      isInvalidTransaction: error,
      msg: msg,
    };
  }
}

console.log("Validate Amount: ", validateAmount("999999")); // Max limit test valid
console.log("Validate Amount: ", validateAmount("1000000")); // Max limit test valid
console.log("Validate Amount: ", validateAmount("1000001")); // out of max limit test invalid
console.log("Validate Amount: ", validateAmount("-999999")); // Min limit test valid
console.log("Validate Amount: ", validateAmount("-1000000")); // Min limit test valid
console.log("Validate Amount: ", validateAmount("-1000001")); // out of min limit test invalid
console.log("Validate Amount: ", validateAmount("12345.12312312313"));
console.log("Validate Amount: ", validateAmount("1234512312312313"));
console.log("Validate Amount: ", validateAmount(".98764234")); // We have to validate that there is an integuer value, it can't be zero.43434344?
console.log("Validate Amount: ", validateAmount("10.0"));// Problem here, when is converted to number, gives the integer, not de decimal part.
console.log("Validate Amount: ", validateAmount("989879.0997636"));
console.log("Validate Amount: ", validateAmount("10.00")); // bad return 10.
console.log("Validate Amount: ", validateAmount("-10.00")); // bad return -10.
console.log("Validate Amount: ", validateAmount("-.20")); // bad return -.2.
console.log("Validate Amount: ", validateAmount("-")); // NaN bad
console.log("Validate Amount: ", validateAmount("asfasASA")); // NaN bad
console.log("Validate Amount: ", validateAmount(""));
console.log("Validate Amount: ", validateAmount(" "));
console.log("Validate Amount: ", validateAmount("0"));
console.log("Validate Amount: ", validateAmount("-0"));
console.log("Validate Amount, no argument: ", validateAmount("/*,.&%$·"));
console.log("Validate Amount: ", validateAmount("12"));
console.log("Validate Amount: ", validateAmount("-12"));
