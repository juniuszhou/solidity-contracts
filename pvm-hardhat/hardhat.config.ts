import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@parity/hardhat-polkadot"

import dotenv from "dotenv";
import { env } from "node:process";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        hardhat: {
            polkadot: {
                target: "pvm",
            },
            nodeConfig: {
                nodeBinaryPath: "./bin/dev-node",
                rpcPort: 8000,
                dev: true,
            },
            adapterConfig: {
                adapterBinaryPath: "./bin/eth-rpc",
                dev: true,
            },
        },
        localNode: {
            polkadot: {
                target: "pvm",
            },
            url: `http://127.0.0.1:8545`,
        },
        polkadotHubTestnet: {
            polkadot: {
                target: "pvm",
            },
            url: "https://services.polkadothub-rpc.com/testnet",
            accounts: [env.POLKADOT_HUB_TESTNET_PRIVATE_KEY ?? ""],
        },
    },
}

export default config
