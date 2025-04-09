
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-viem";

const config: HardhatUserConfig = {
  typechain: {
    outDir: 'typechain-types', // Where to save the generated types (default: "typechain")
    target: 'ethers-v6', // Target library (e.g., "ethers-v6", "ethers-v5", "truffle-v5")
  },
  solidity: "0.8.28",

};

export default config;
