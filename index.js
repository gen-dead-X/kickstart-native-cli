#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import degit from "degit"; // CommonJS module
import { execSync } from "node:child_process";

const program = new Command();

program
  .name("kickstart-native-cli")
  .description(
    "A CLI to bootstrap a React Native starter template with custom options"
  )
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new React Native project")
  .action(async () => {
    console.log(chalk.green("\nWelcome to the Kickstart Native CLI!\n"));

    // Step 1: Ask user for project name
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "MyReactNativeApp",
      },
    ]);

    // Step 2: Ask user for features
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

    // Step 3: Clone the boilerplate
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

    // Step 4: Install dependencies
    console.log(chalk.blue("\nInstalling dependencies..."));
    try {
      execSync(`cd ${projectName} && yarn install`, { stdio: "inherit" });
    } catch (error) {
      console.error(chalk.red("\nError installing dependencies:"), error);
      return;
    }

    // Step 5: Configure features
    console.log(chalk.yellow("\nConfiguring selected features..."));
    if (features.includes("mmkv")) {
      console.log(chalk.green("- Adding MMKV setup..."));
      // Add Redux setup logic here
    }
    if (features.includes("zustand")) {
      console.log(chalk.green("- Adding Zustand setup..."));
      // Add Zustand setup logic here
    }
    if (features.includes("navigation")) {
      console.log(chalk.green("- Adding React Navigation setup..."));
      // Add React Navigation setup logic here
    }
    if (features.includes("nativewind")) {
      console.log(
        chalk.green("- Adding Nativewind Support Components setup...")
      );
      // Add Styled Components setup logic here
    }

    console.log(
      chalk.green(`\nYour project '${projectName}' is ready! Happy coding!\n`)
    );
  });

program.parse(process.argv);
