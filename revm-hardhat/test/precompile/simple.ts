import { expect } from "chai";
import { network } from "hardhat";
import { createClient } from "polkadot-api"
import { getWsProvider } from 'polkadot-api/ws-provider';
import { devnet, MultiAddress } from "@polkadot-api/descriptors"
import { getAlice, convertPublicKeyToSs58 } from "../substrate.js"
import { getPolkadotSigner } from "polkadot-api/signer";
import { readFileSync } from "fs";
const { ethers } = await network.connect();
const url = "http://127.0.0.1:9944"

const provider = getWsProvider(url);
const client = createClient(provider);
const api = client.getTypedApi(devnet)
const alice = getAlice()
const signer = getPolkadotSigner(alice.publicKey, "Sr25519", alice.sign);

const asset = "0x0000000100000000000000000000000000010000"
const currentDir = process.cwd();
console.log("Current directory: ", currentDir);

const abi = readFileSync("MY_ERC20.json", "utf8")

async function getContract() {
    const abiJson = JSON.parse(abi)
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
    // provider.
    const contract = new ethers.Contract(asset, abiJson["abi"], ethers.provider)
    const signer = await ethers.provider.getSigner()
    console.log("Signer: ", signer);
    const balance = await ethers.provider.getBalance(signer.address);
    console.log("Balance: ", balance);
    return contract;
}

describe("Precompile", function () {

    before(async function () {
        console.log("================== Precompile test to make sure the deployment is working ==================");
    });

    it("Should", async function () {

        const [account] = await ethers.getSigners();
        console.log(account);
        const address = await account.getAddress();
        console.log(`Address: ${address}`);
        const balance = await ethers.provider.getBalance(address);
        console.log(`Alithe Balance: ${balance}`);

        let data = await api.query.System.Account.getValue(convertPublicKeyToSs58(alice.publicKey));
        console.log("Alice's balance is ", data.data.free);

        const ss58Address = convertPublicKeyToSs58(alice.publicKey);
        let tx = api.tx.Assets.create({
            id: 1,
            admin: MultiAddress.Id(ss58Address),
            min_balance: BigInt(100),
        })

        let result = await tx.signAndSubmit(signer);
        console.log("Result: ", result);

        let asset = await api.query.Assets.Asset.getValue(1);
        console.log("Asset: ", asset);

        const contract = await getContract();

        // Call view functions (they should work with provider)
        const totalSupply = await contract.totalSupply();
        console.log("Total Supply: ", totalSupply);

        // there is no name for precompile ERC20 or asset
        // const name = await contract.name();
        // console.log("Name: ", name);

    });
});