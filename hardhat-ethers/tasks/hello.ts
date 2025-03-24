import { task } from "hardhat/config"
import { readFileSync } from 'fs'
import { join } from 'path'
import { HardhatRuntimeEnvironment } from "hardhat/types";


task("hello-world", "Prints a greeting")
    .addOptionalParam("greeting", "The greeting to print", "Hello, World!")
    .setAction(async ({ greeting }) => console.log(greeting));

