const calculateFromCmdLineArgs = require("./calculateFromCmdLineArgs");
const calculateFromConsoleInput = require("./calculateFromConsoleInput");

const commandLineExpr = process.argv[2];

const main = () => {
    if (commandLineExpr) {
        calculateFromCmdLineArgs(commandLineExpr);
    } else {
        calculateFromConsoleInput();
    }
};

main();
