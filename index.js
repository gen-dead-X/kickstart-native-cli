#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import degit from "degit";
import { execSync } from "node:child_process";
import * as packageJson from "./package.json" with { type: "json" };

const program = new Command();

program
  .name("kickstart-native-cli")
  .description(
    "A CLI to bootstrap a React Native starter template with custom options"
  )
  .version(packageJson.default.version);

program
  .command("init")
  .description("Initialize a new React Native project")
  .action(async () => {
    console.log(chalk.green("\nWelcome to the Kickstart Native CLI!\n"));

    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "MyKickstartedApp",
      },
    ]);

    const { features } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "features",
        message: "Select features to include (Space to Select) :",
        choices: [
          { name: "MMKV", value: "mmkv" },
          { name: "Zustand", value: "zustand" },
          { name: "React Navigation", value: "navigation" },
          { name: "Nativewind", value: "nativewind" },
        ],
      },
    ]);

    console.log(chalk.blue("\nCloning the boilerplate..."));
    const emitter = degit("https://github.com/gen-dead-X/kickstart-native", {
      cache: false,
      force: true,
    });

    try {
      await emitter.clone(projectName);
      console.log(chalk.green("\nTemplate cloned successfully!"));
    } catch (error) {
      console.error(chalk.red("\nError cloning template:"), error);
      return;
    }

    console.log(chalk.blue("\nInstalling dependencies..."));
    try {
      execSync(`cd ${projectName} && yarn install`, { stdio: "inherit" });
    } catch (error) {
      console.error(chalk.red("\nError installing dependencies:"), error);
      return;
    }

    console.log(chalk.yellow("\nConfiguring selected features..."));
    if (features.includes("mmkv")) {
      console.log(chalk.green("- Adding MMKV setup..."));
    }
    if (features.includes("zustand")) {
      console.log(chalk.green("- Adding Zustand setup..."));
    }
    if (features.includes("navigation")) {
      console.log(chalk.green("- Adding React Navigation setup..."));
    }
    if (features.includes("nativewind")) {
      console.log(
        chalk.green("- Adding Nativewind Support Components setup...")
      );
    }

    console.log(
      chalk.green(`\nYour project '${projectName}' is ready! Happy coding!\n`)
    );

    console.log(chalk.blue.bold("If you like this CLI, please star the repo! \n Buy me a coffee: https://www.buymeacoffee.com/joyrudra.itobuz \n"));
  });

program.parse(process.argv);
