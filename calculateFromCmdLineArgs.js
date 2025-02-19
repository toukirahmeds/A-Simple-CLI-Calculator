const calculateFromExpr = require("./calculateFromExpr");

/**
 * Calculates the value of arithmetic expression
 * from command-line argument.
 * 
 * @param {Array<string>} commandLineExpr 
 * @returns {number}
 */
const calculateFromCmdLineArgs =
    commandLineExpr => calculateFromExpr(commandLineExpr);

module.exports = calculateFromCmdLineArgs;
