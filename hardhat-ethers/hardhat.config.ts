import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";

// task("hello", "Prints an account's balance").setAction(async () => {
//   console.log("Hello world")
// });

// import hello world task
import "./tasks/hello"

const config: HardhatUserConfig = {
  solidity: "0.8.28",
};

export default config;
