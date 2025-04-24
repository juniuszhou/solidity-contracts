require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("hardhat-revive-node")
require("dotenv").config();

const USE_RESOLC = process.env.USE_RESOLC === 'true';
if (USE_RESOLC) {
  require("hardhat-resolc");
}


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      polkavm: true,
      nodeConfig: {
        nodeBinaryPath: "../../../polkadot-sdk/target/debug/substrate-node",
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath: "../../../polkadot-sdk/target/debug/eth-rpc",
        dev: true,
      },
    },
    polkavm: {
      polkavm: true,
      url: "http://127.0.0.1:8545",
      accounts: [process.env.LOCAL_PRIV_KEY],
    },
    // polkavm: { url: "http://127.0.0.1:8545" },
    ah: {
      url: "https://westend-asset-hub-eth-rpc.polkadot.io",
      accounts: [process.env.AH_PRIV_KEY],
    },
  },

    resolc: {
      compilerSource: "binary",
      settings: {
        optimizer: {
          enabled: true,
          runs: 400,
        },
        evmVersion: "istanbul",
        compilerPath: "~/.cargo/bin/resolc",
        standardJson: true,
      },
    },
  };