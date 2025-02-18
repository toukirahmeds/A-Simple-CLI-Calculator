const ACCEPTED_CHARS = "0123456789+-*/()";

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
 * Check if all the characters are acceptable.
 * 
 * @param {Array<string>} exprArr 
 */
const getHasAcceptableChars = (exprArr) => exprArr.every(
    elem => ACCEPTED_CHARS.includes(elem)
);

/**
 * Check if the parentheses are in symmetric.
 * 
 * @param {Array<string>} exprArr 
 */
const getIsSymmetric = (exprArr) => {
    const stack = [];
    let elem;

    for (let i = 0; i < exprArr.length; i++) {
        elem = exprArr[i];

        if (elem === "(") {
            stack.push(elem);
        } else if (elem === ")") {
            if (stack.length === 0) {
                return false;
            }

            if (stack[stack.length - 1] === "(") {
                stack.pop();
            }
        }
    }

    if (stack.length > 0) {
        return false;
    }

    return true;
};

/**
 * Check if the expression is valid.
 * 
 * @param {Array<string>} exprArr 
 */
const checkIsValid = (exprArr) => {
    if (!getHasAcceptableChars(exprArr)) {
        console.error("Unacceptable characters.");
        return false;
    }

    if (!getIsSymmetric(exprArr)) {
        console.error("Expression is not symmetric.");
        return false;
    }

    return true;
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

    // calculateUsingPemdas(parsedArr);
};

module.exports = calculateFromExpr;
