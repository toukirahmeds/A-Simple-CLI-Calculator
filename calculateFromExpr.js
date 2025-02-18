const {
    checkIsValid,
    getMergedParentheses,
    getMergedParsedNumArr
} = require("./utils");

/**
 * Calculates using PEMDAS rule.
 * 
 * @param {Array<number|string>} parsedArr
 * @returns {number}
 */
const calculateUsingPemdas = (parsedArr) => {
    console.log(parsedArr);
};

/**
 * Calculates the result from the provided expression.
 * 
 * @param {string} expr 
 */
const calculateFromExpr = (expr) => {
    const trimmedArr = expr.split("").filter(elem => elem.trim());
    console.log(trimmedArr);
    if (!checkIsValid(trimmedArr)) {
        console.error("Invalid expression.");
        process.exit();
    }

    const mergedPArr = getMergedParentheses(trimmedArr);
    const mergedParsedNumArr = getMergedParsedNumArr(mergedPArr);
    console.log(mergedParsedNumArr);

    // calculateUsingPemdas(parsedArr);
};

module.exports = calculateFromExpr;
