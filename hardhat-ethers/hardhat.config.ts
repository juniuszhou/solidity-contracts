import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";

// task("hello", "Prints an account's balance").setAction(async () => {
//   console.log("Hello world")
// });

// import hello world task
import "./tasks/hello"

const config: HardhatUserConfig = {
  solidity: "0.8.28", // solidity version

  paths: {
    sources: "./contracts",      // Directory containing your Solidity contracts
    artifacts: "./artifacts",    // Directory for compiled artifacts
    cache: "./cache",           // Directory for cache files
    tests: "./test",            // Directory for test files
    root: "./",                 // Root directory of your project
  },
};

export default config;
