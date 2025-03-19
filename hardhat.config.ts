import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    localhost: {},
    customNetwork: {
      url: "https://your-custom-network-url.com", // Replace with your network's RPC URL
      chainId: 1234, // Optional: specify the chain ID of your custom network
    },
    // You can add more networks here
  },
};

export default config;
