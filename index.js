const calculateFromCmdLineArgs = require("./calculateFromCmdLineArgs");
const calculateFromConsoleInput = require("./calculateFromConsoleInput");
const { printManualAndExit } = require("./utils");

const commandLineExpr = process.argv[2];

/**
 * Starts the application.
 */
const main = async () => {
    let result;

    // Print manual and exit if command-line argument is '--help'
    if (commandLineExpr === "--help") {
        printManualAndExit();
    }

    /**
     * If arithmetic expression is passed as command-line argument,
     * then calculate the value from command-line argument.
     * Otherwise, get arithmetic expression as console input and
     * calculate the value.
     */
    if (commandLineExpr) {
        result = calculateFromCmdLineArgs(commandLineExpr);
    } else {
        result = await calculateFromConsoleInput();
    }

    console.log(`Output: ${result}`);
};

main();
