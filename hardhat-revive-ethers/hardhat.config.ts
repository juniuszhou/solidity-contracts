import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    resolc: {
        compilerSource: "npm",
        // use local binary for resolc
        // compilerSource: "binary",
        // settings: {
        //     optimizer: {
        //         enabled: true,
        //         runs: 400,
        //     },
        //     evmVersion: "istanbul",
        //     compilerPath: "~/.cargo/bin/resolc",
        // },
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
        // local
        local: {
            polkavm: true,
            url: "http://127.0.0.1:8545",
            accounts: [
                vars.get("SUBSTRATE_LOCAL_PRIVATE_KEY"),
                vars.get("SUBSTRATE_LOCAL_PRIVATE_KEY2"),
            ],
        },
        // passetHub
        ph: {
            polkavm: true,
            url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
            accounts: [
                vars.get("PASSET_HUB_PRIVATE_KEY"),
                vars.get("PASSET_HUB_PRIVATE_KEY2"),
            ],
        },
        kusama: {
            polkavm: true,
            url: "https://kusama-asset-hub-eth-rpc.polkadot.io",
            // blockscout-kusama-asset-hub.parity-chains-scw.parity.io
            // https://kusama-asset-hub-rpc.polkadot.io/
            chainId: 420420418
        },
    },
};

export default config;
