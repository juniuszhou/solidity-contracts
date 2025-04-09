import { config } from "dotenv"
import { privateKeyToAccount } from "viem/accounts"
import { PublicClient, createPublicClient, defineChain, http } from "viem"

export const localChain = (url: string) => defineChain({
    id: 31337,
    name: 'Testnet',
    network: 'Testnet',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [url],
        },
    },
    testnet: true,
})

function toViemAddress(address: string): string {
    return address.startsWith("0x") ? address : `0x${address}`
}

async function main() {
    config()
    const url = "https://westend-asset-hub-eth-rpc.polkadot.io"
    const privKey = process.env.AH_PRIV_KEY

    const publicClient = createPublicClient({ chain: localChain(url), transport: http() })

    if (!privKey) {
        throw new Error("Invalid private key. Ensure it is set and in the correct format.");
    }

    const withoutPrefix = privKey.replace(/^0x/, "");

    const account = privateKeyToAccount(`0x${withoutPrefix}`)
    console.log(account.address)

    const nonce = await publicClient.getTransactionCount({ address: account.address })
    console.log(nonce)

    console.log("Hello world")

}

main()