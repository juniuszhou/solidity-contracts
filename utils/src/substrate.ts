import { devnet, MultiAddress } from '@polkadot-api/descriptors';
import { TypedApi, Transaction, PolkadotSigner, Binary } from 'polkadot-api';
import { sr25519CreateDerive } from "@polkadot-labs/hdkd"
import { DEV_PHRASE, entropyToMiniSecret, mnemonicToEntropy, KeyPair } from "@polkadot-labs/hdkd-helpers"
import { getPolkadotSigner } from "polkadot-api/signer"
import { randomBytes } from 'crypto';
import { Keyring } from '@polkadot/keyring';
import { SS58_PREFIX, TX_TIMEOUT } from "./config";
import { getClient } from "./setup"

let api: TypedApi<typeof devnet> | undefined = undefined

SS58_PREFIX = 42
// define url string as type to extend in the future
// export type ClientUrlType = 'ws://localhost:9944' | 'wss://test.finney.opentensor.ai:443' | 'wss://dev.chain.opentensor.ai:443' | 'wss://archive.chain.opentensor.ai';
export type ClientUrlType = 'ws://localhost:9944'

export async function getDevnetApi() {
    if (api === undefined) {
        let client = await getClient()

        api = client.getTypedApi(devnet)
    }
    return api
}

export function getKeypairFromPath(path: string) {
    const entropy = mnemonicToEntropy(DEV_PHRASE)
    const miniSecret = entropyToMiniSecret(entropy)
    const derive = sr25519CreateDerive(miniSecret)
    const hdkdKeyPair = derive(path)

    return hdkdKeyPair
}

export const getAlice = () => getKeypairFromPath("//Alice")
export const getBob = () => getKeypairFromPath("//Bob")
export const getCharlie = () => getKeypairFromPath("//Charlie")
export const getDave = () => getKeypairFromPath("//Dave")

export function getSignerFromPath(path: string) {
    const keypair = getKeypairFromPath(path)
    const polkadotSigner = getPolkadotSigner(
        keypair.publicKey,
        "Sr25519",
        keypair.sign,
    )

    return polkadotSigner
}

export const getAliceSigner = () => getSignerFromPath("//Alice")
export const getBobSigner = () => getSignerFromPath("//Bob")
export const getCharlieSigner = () => getSignerFromPath("//Charlie")
export const getDaveSigner = () => getSignerFromPath("//Dave")

export function getRandomSubstrateSigner() {
    const keypair = getRandomSubstrateKeypair();
    return getSignerFromKeypair(keypair)
}

export function getSignerFromKeypair(keypair: KeyPair) {
    const polkadotSigner = getPolkadotSigner(
        keypair.publicKey,
        "Sr25519",
        keypair.sign,
    )
    return polkadotSigner
}

export function getRandomSubstrateKeypair() {
    const seed = randomBytes(32);
    const miniSecret = entropyToMiniSecret(seed)
    const derive = sr25519CreateDerive(miniSecret)
    const hdkdKeyPair = derive("")

    return hdkdKeyPair
}

export async function getBalance(api: TypedApi<typeof devnet>) {
    const value = await api.query.Balances.Account.getValue("")
    return value
}

export async function getNonce(api: TypedApi<typeof devnet>, ss58Address: string): Promise<number> {
    const value = await api.query.System.Account.getValue(ss58Address);
    return value.nonce
}