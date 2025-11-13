import { sr25519CreateDerive } from "@polkadot-labs/hdkd"
import { DEV_PHRASE, entropyToMiniSecret, mnemonicToEntropy, KeyPair } from "@polkadot-labs/hdkd-helpers"


export function getKeypairFromPath(path: string) {
    const entropy = mnemonicToEntropy(DEV_PHRASE)
    const miniSecret = entropyToMiniSecret(entropy)
    const derive = sr25519CreateDerive(miniSecret)
    const hdkdKeyPair = derive(path)

    return hdkdKeyPair
}

export const getAlice = () => getKeypairFromPath("//Alice")

