const calculateFromCmdLineArgs = require("./calculateFromCmdLineArgs");
const calculateFromConsoleInput = require("./calculateFromConsoleInput");

const commandLineExpr = process.argv[2];

const main = () => {
    let result;

    if (commandLineExpr) {
        result = calculateFromCmdLineArgs(commandLineExpr);
    } else {
        calculateFromConsoleInput();
    }

    console.log(`Output: ${result}`);
};

main();
