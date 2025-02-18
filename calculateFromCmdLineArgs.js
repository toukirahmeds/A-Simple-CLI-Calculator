const calculateFromExpr = require("./calculateFromExpr");

/**
 * Calculates the expression from command-line arguments.
 * 
 * @param {string} commandLineExpr 
 */
const calculateFromCmdLineArgs = (commandLineExpr) => {
    return calculateFromExpr(commandLineExpr);
};

module.exports = calculateFromCmdLineArgs;
