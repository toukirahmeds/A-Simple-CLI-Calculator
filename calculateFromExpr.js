const {
    PEMDASPriorityOp,
    checkIsValid,
    getMergedParentheses,
    getMergedParsedNumArr,
    operate,
    printManualAndExit
} = require("./utils");

/**
 * Get the current highest priority operator's index.
 * 
 * @param {Array<string>} parsedArr 
 * @returns {number}
 */
const getHighestPriorityOperatorInd = parsedArr => {
    let ind;

    for (let i = 0; i < PEMDASPriorityOp.length; i++) {
        ind = parsedArr.indexOf(PEMDASPriorityOp[i]);

        if (ind >= 0) {
            return ind;
        }
    }

    return -1;
};

/**
 * Evaluate the operation between two operands with
 * highest priority operator.
 * 
 * @param {Array<string|number>} parsedArr 
 * @returns {number}
 */
const evaluateExprArr = parsedArr => {
    let recurResult, hPOPInd;

    while (parsedArr.length !== 1) {
        hPOPInd = getHighestPriorityOperatorInd(parsedArr);

        recurResult = operate(
            parsedArr,
            hPOPInd - 1,
            hPOPInd,
            hPOPInd + 1
        );

        parsedArr.splice(hPOPInd - 1, 3);
        parsedArr.splice(hPOPInd - 1, 0, recurResult);
    }

    return parsedArr[0];
};

/**
 * Calculates the value of the arithmetic expression.
 * 
 * @param {Array<string|number>} parsedArr 
 * @returns {Array<string|number> | number}
 */
const processCalculation = parsedArr => {
    let oPInd = -1, cPInd = -1;

    for (let i = 0; i < parsedArr.length; i++) {
        if (parsedArr[i] === "(") {
            oPInd = i;
        }

        if (parsedArr[i] === ")") {
            cPInd = i;
            break;
        }
    }

    if (oPInd >= 0 && cPInd >= 0) {
        const innerExprArr = parsedArr.slice(oPInd + 1, cPInd);
        const result = processCalculation(innerExprArr);

        const addElemsArr = [result];
        
        parsedArr.splice(oPInd, cPInd - oPInd + 1);

        if (oPInd > 0) {
            if (
                !PEMDASPriorityOp.includes(parsedArr[oPInd - 1]) &&
                !isNaN(parsedArr[oPInd - 1])
            ) {
                addElemsArr.unshift("*");
            }

            if (
                !PEMDASPriorityOp.includes(parsedArr[oPInd]) &&
                !isNaN(parsedArr[oPInd])
            ) {
                addElemsArr.push("*");
            }
        }

        parsedArr.splice(oPInd, 0, ...addElemsArr);

        return processCalculation(parsedArr);
    }

    return evaluateExprArr(parsedArr);
};

/**
 * Calculates the result from the provided expression.
 * 
 * @param {string} expr 
 */
const calculateFromExpr = (expr) => {
    const trimmedArr = expr.split("").filter(elem => elem.trim());

    if (!checkIsValid(trimmedArr)) {
        printManualAndExit();
    }

    const mergedPArr = getMergedParentheses(trimmedArr);
    const mergedParsedNumArr = getMergedParsedNumArr(mergedPArr);

    return processCalculation(mergedParsedNumArr);
};

module.exports = calculateFromExpr;
