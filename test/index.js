import chalk from "chalk";
import path from "node:path";
import * as data from "../package.json" with { type: "json" };

console.log(chalk.green("\nWelcome to the Kickstart Native CLI!\n"));
console.log(path.resolve("demo.js"));
console.log("version", data.default.version);
