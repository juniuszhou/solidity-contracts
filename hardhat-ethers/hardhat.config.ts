import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts"
  },

  networks: {
    hardhat: {

    },

    sepolia: {
      url: vars.get("SEPOLIA_URL") || "",
      accounts: [vars.get("SEPOLIA_PRIVATE_KEY") ?? "", vars.get("SEPOLIA_PRIVATE_KEY2") ?? ""],
      chainId: 11155111,
    },

  },
};

export default config;