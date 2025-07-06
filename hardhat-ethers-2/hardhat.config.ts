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

    polkavm: {
      url: "http://127.0.0.1:8545",
      accounts: [vars.get("SUBSTRATE_LOCAL_PRIVATE_KEY") ?? "", vars.get("SUBSTRATE_LOCAL_PRIVATE_KEY2") ?? ""],
    },

  },
};

export default config;