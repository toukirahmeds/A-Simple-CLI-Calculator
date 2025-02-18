const readline = require("readline").promises;

const calculateFromExpr = require("./calculateFromExpr");

const calculateFromConsoleInput = async () => {
    const rlInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const expr = await rlInterface.question(
        "Arithmetic Expression: "
    );

    const result = calculateFromExpr(expr);

    rlInterface.close();

    return result;
};

module.exports = calculateFromConsoleInput;
