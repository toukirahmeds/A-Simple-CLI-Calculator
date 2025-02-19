const calculateFromCmdLineArgs = require("./calculateFromCmdLineArgs");
const calculateFromConsoleInput = require("./calculateFromConsoleInput");
const { printManualAndExit } = require("./utils");

const commandLineExpr = process.argv[2];

const main = async () => {
    let result;

    if (commandLineExpr === "--help") {
        printManualAndExit();
    }

    if (commandLineExpr) {
        result = calculateFromCmdLineArgs(commandLineExpr);
    } else {
        result = await calculateFromConsoleInput();
    }

    console.log(`Output: ${result}`);
};

main();
