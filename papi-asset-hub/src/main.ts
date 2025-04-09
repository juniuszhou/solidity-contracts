import { config } from "dotenv"
import { u8aToHex } from '@polkadot/util'
// import { mnemonicToMiniSecret, sr25519PairFromSeed, cryptoWaitReady } from "@polkadot/util-crypto";


import { DEV_PHRASE, entropyToMiniSecret, mnemonicToEntropy, KeyPair } from "@polkadot-labs/hdkd-helpers"

import { sr25519CreateDerive } from "@polkadot-labs/hdkd"

import { getWsProvider } from 'polkadot-api/ws-provider/web';
import { createClient } from "polkadot-api"
import { ss58Address } from "@polkadot-labs/hdkd-helpers";
import { hub } from "@polkadot-api/descriptors"
import { readFileSync } from 'fs';
import { Binary } from 'polkadot-api'
import { getPolkadotSigner } from "polkadot-api/signer"

const SS58_PREFIX = 42;
export function convertPublicKeyToSs58(publickey: Uint8Array) {
    return ss58Address(publickey, SS58_PREFIX);
}

async function main() {
    config()
    const url = "wss://westend-asset-hub-rpc.polkadot.io"
    const secret = process.env.SECRET

    const provider = getWsProvider(url);
    const client = createClient(provider);

    console.log(secret)

    if (!secret) {
        throw new Error("SECRET environment variable is not set.");
    }

    const entropy = mnemonicToEntropy(secret)
    const miniSecret = entropyToMiniSecret(entropy)
    const derive = sr25519CreateDerive(miniSecret)
    const hdkdKeyPair = derive("")

    // const publicKeyHex = u8aToHex(hdkdKeyPair.publicKey);    // 64 characters + 0x prefix
    const ss58Address = convertPublicKeyToSs58(hdkdKeyPair.publicKey)
    console.log("ss58 is ", ss58Address)

    const api = client.getTypedApi(hub)
    const account = await api.query.System.Account.getValue(ss58Address)
    console.log("balance is ", account.data.free)
    // const nonce = await api.query.System.Account.getValue(ss58Address)
    console.log(account.nonce)

    const path = "/home/user/github/junius/jam/rust-contract-template/contract.polkavm"
    const binaryData = readFileSync(path);

    // submit code
    const tx = api.tx.Revive.instantiate_with_code({
        data: Binary.fromHex("0x"),
        value: BigInt(0),
        gas_limit: {
            ref_time: BigInt(1000000),
            proof_size: BigInt(1000000),
        },
        storage_deposit_limit: BigInt(100000000),
        code: Binary.fromBytes(binaryData),
        salt: undefined
    })

    const signer = getPolkadotSigner(
        hdkdKeyPair.publicKey,
        "Sr25519",
        hdkdKeyPair.sign,
    )

    let result = await tx.signAndSubmit(signer)
    console.log(result)
    console.log(result.dispatchError?.value)

    client.destroy()

}

main()