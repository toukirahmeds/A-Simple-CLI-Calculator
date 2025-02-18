const calculateFromCmdLineArgs = require("./calculateFromCmdLineArgs");
const calculateFromConsoleInput = require("./calculateFromConsoleInput");

const commandLineExpr = process.argv[2];

const main = async () => {
    let result;

    if (commandLineExpr) {
        result = calculateFromCmdLineArgs(commandLineExpr);
    } else {
        result = await calculateFromConsoleInput();
    }

    console.log(`Output: ${result}`);
};

main();
