import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  resolc: {
    compilerSource: "npm",
    settings: {
      optimizer: {
        enabled: true,
        runs: 400,
      },
      evmVersion: "istanbul",
      compilerPath: "~/.cargo/bin/resolc",
    },
  },
  networks: {
    hardhat: {
      polkavm: true,
      forking: {
        url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      },
      adapterConfig: {
        adapterBinaryPath: "./bin/eth-rpc",
        dev: true,
      },
    },
    passetHub: {
      polkavm: true,
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [vars.get("PASSET_HUB_PRIVATE_KEY")],
    },
  },
};

export default config;
