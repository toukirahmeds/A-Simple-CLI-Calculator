const ACCEPTED_CHARS = "0123456789+-*/()";
const OPERATORS = ["*", "/", "+", "-"];

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
 * Checks if its a valid arithmetic expression.
 * 
 * @param {Array<string>} exprArr 
 */
const getIsValidArithmeticExpr = exprArr => {
    let operator, opIndex;

    for (let i = 0; i < OPERATORS.length; i++) {
        operator = OPERATORS[i];
        opIndex = exprArr.indexOf(operator);
        
        while (opIndex >= 0 && opIndex < exprArr.length) {
            if (
                opIndex === 0 ||
                opIndex === exprArr.length - 1 ||
                exprArr[opIndex - 1] === "(" ||
                exprArr[opIndex + 1] === ")"
            ) {
                return false;
            }

            opIndex = exprArr.indexOf(operator, opIndex + 1);
        }
    }

    return true;
};

/**
 * Check if there's any empty parentheses.
 * 
 * @param {Array<string>} exprArr 
 */
const hasEmptyParentheses = exprArr => exprArr.join("").indexOf("()") >= 0;

/**
 * Check if the expression is valid.
 * 
 * @param {Array<string>} exprArr 
 */
const checkIsValid = exprArr => {
    let isValid = true;

    if (!getHasAcceptableChars(exprArr)) {
        console.error("Unacceptable characters.");
        isValid = false;
    }

    if (!getIsSymmetric(exprArr)) {
        console.error("Expression is not symmetric.");
        isValid = false;
    }

    if (!getIsValidArithmeticExpr(exprArr)) {
        console.error("Not a valid arithmetic expression.");
        isValid = false;
    }

    if (hasEmptyParentheses(exprArr)) {
        console.error("Has empty parentheses.");
        isValid = false;
    }

    return isValid;
};

/**
 * Get the unnecessary extra parentheses merged.
 * 
 * @param {Array<string>} exprArr 
 */
const getMergedParentheses = exprArr => {
    const openPIndArr = [], closePIndArr = [];

    exprArr.forEach((item, index) => {
        if (item === "(") {
            openPIndArr.push(index);
        } else if (item === ")") {
            closePIndArr.push(index);
        }
    });

    console.log(openPIndArr, closePIndArr);

    let startOPInd = 0,
        startCPInd = 0,
        count = 1,
        currentInd = 1;
    const deletionIndArr = [];

    while (currentInd < openPIndArr.length) {
        if (
            (openPIndArr[currentInd] === openPIndArr[startOPInd] + count) &&
            (closePIndArr[currentInd] === closePIndArr[startCPInd] + count)
        ) {
            deletionIndArr.push(openPIndArr[currentInd]);
            deletionIndArr.push(closePIndArr[currentInd]);
        }

        if (
            (openPIndArr[currentInd] !== openPIndArr[startOPInd] + count) &&
            (closePIndArr[currentInd] !== closePIndArr[startCPInd] + count)
        ) {
            startOPInd = currentInd;
            startCPInd = currentInd;
            count = 0;
        }

        count++;
        currentInd = startOPInd + count;
    }

    return exprArr.map(
        (value, index) => deletionIndArr.includes(index) ? null: value
    ).filter(value => value);
}

/**
 * Get the numbers merged.
 * 
 * @param {Array<string>} exprArr 
 */
const getMergedParsedNumArr = exprArr => {
    const mergedNumArr = [];
    let currentNum = "";

    exprArr.forEach(value => {
        if (!isNaN(value)) {
            currentNum += value;
        } else {
            if (currentNum) {
                mergedNumArr.push(parseFloat(currentNum));
                currentNum = "";
            }

            mergedNumArr.push(value);
        }
    });

    if (currentNum) {
        mergedNumArr.push(parseFloat(currentNum));
    }

    return mergedNumArr;
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
