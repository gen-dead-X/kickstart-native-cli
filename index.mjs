#!/usr/bin/env node

import { Command } from "commander";
import { prompt } from "inquirer";
import { green, blue, red, yellow } from "chalk";
import degit from "degit";
import { execSync } from "node:child_process";

const program = new Command();

program
  .name("rn-starter-cli")
  .description(
    "A CLI to bootstrap a React Native starter template with custom options"
  )
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new React Native project")
  .action(async () => {
    console.log(green("\nWelcome to the Kickstart Native Starter CLI!\n"));

    // Step 1: Ask user for project name
    const { projectName } = await prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "MyReactNativeApp",
      },
    ]);

    // Step 2: Ask user for features
    const { features } = await prompt([
      {
        type: "checkbox",
        name: "features",
        message: "Select features to include:",
        choices: [
          { name: "Redux", value: "redux" },
          { name: "Zustand", value: "zustand" },
          { name: "React Navigation", value: "navigation" },
          { name: "Styled Components", value: "styled-components" },
        ],
      },
    ]);

    // Step 3: Clone the boilerplate
    console.log(blue("\nCloning the boilerplate..."));
    const emitter = degit("your-github-username/your-template-repo", {
      cache: false,
      force: true,
    });

    try {
      await emitter.clone(projectName);
      console.log(green("\nTemplate cloned successfully!"));
    } catch (error) {
      console.error(red("\nError cloning template:"), error);
      return;
    }

    // Step 4: Install dependencies
    console.log(blue("\nInstalling dependencies..."));
    try {
      execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
    } catch (error) {
      console.error(red("\nError installing dependencies:"), error);
      return;
    }

    // Step 5: Configure features
    console.log(yellow("\nConfiguring selected features..."));
    if (features.includes("redux")) {
      console.log(green("- Adding Redux setup..."));
      // Add Redux setup logic here
    }
    if (features.includes("zustand")) {
      console.log(green("- Adding Zustand setup..."));
      // Add Zustand setup logic here
    }
    if (features.includes("navigation")) {
      console.log(green("- Adding React Navigation setup..."));
      // Add React Navigation setup logic here
    }
    if (features.includes("styled-components")) {
      console.log(green("- Adding Styled Components setup..."));
      // Add Styled Components setup logic here
    }

    console.log(
      green(`\nYour project '${projectName}' is ready! Happy coding!\n`)
    );
  });

program.parse(process.argv);
