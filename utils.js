const ACCEPTED_CHARS = "0123456789+-*/()";
const PEMDASPriorityOp = ["*", "/", "+", "-"];

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

    for (let i = 0; i < PEMDASPriorityOp.length; i++) {
        operator = PEMDASPriorityOp[i];
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
    
    let errorMessage = "";

    if (!getHasAcceptableChars(exprArr)) {
        errorMessage += "Unacceptable characters.";
        errorMessage += `\nOnly supports characters in '${ACCEPTED_CHARS}'`;
        isValid = false;
    }

    if (!getIsSymmetric(exprArr)) {
        errorMessage += "Expression is not symmetric.";
        isValid = false;
    }

    if (!getIsValidArithmeticExpr(exprArr)) {
        errorMessage += "Not a valid arithmetic expression.";
        isValid = false;
    }

    if (hasEmptyParentheses(exprArr)) {
        errorMessage += "Has empty parentheses.";
        isValid = false;
    }

    if (errorMessage) {
        console.error("\nInvalid Expression: ", errorMessage);
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

const operate = (arr, opInd1, operatorInd, opInd2) => {
    let result;

    switch (arr[operatorInd]) {
        case "*":
        case "x":
            result = arr[opInd1] * arr[opInd2];
            break;
        case "/":
            result = arr[opInd1] / arr[opInd2];
            break;
        case "+":
            result = arr[opInd1] + arr[opInd2];
            break;
        case "-":
            result = arr[opInd1] - arr[opInd2];
            break;
        default:
    }

    return result;
};

const printManualAndExit = () => {
    console.log(`
        Calculates value of arithmetic expressions.

        Usage: node index.js '[arithmetic expression]'
        Example: node index.js '(2*4)*2/2'
        
        Accepted Characters: 0123456789+-*/()
        Must always be a valid arithmetic expression.
    `)

    process.exit();
};

module.exports = {
    PEMDASPriorityOp,
    checkIsValid,
    getMergedParentheses,
    getMergedParsedNumArr,
    operate,
    printManualAndExit
};
