const chalk = require("chalk");
const path = require("node:path");

console.log(chalk.green("\nWelcome to the Kickstart Native CLI!\n"));
console.log(path.resolve(__dirname, "demo.js"));
