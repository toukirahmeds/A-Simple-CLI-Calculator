const calculateFromExpr = require("./calculateFromExpr");

/**
 * Calculates the expression from command-line arguments.
 * 
 * @param {string} commandLineExpr 
 */
const calculateFromCmdLineArgs =
    commandLineExpr => calculateFromExpr(commandLineExpr);

module.exports = calculateFromCmdLineArgs;
