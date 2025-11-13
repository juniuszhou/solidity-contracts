import { expect } from "chai";
import { network } from "hardhat";
import { createClient } from "polkadot-api"
const { ethers } = await network.connect();
import { getWsProvider } from 'polkadot-api/ws-provider';
import { devnet } from "@polkadot-api/descriptors"
import { getAlice } from "../substrate.js"
const url = "http://127.0.0.1:8545"

const provider = getWsProvider(url);
const client = createClient(provider);
const api = client.getTypedApi(devnet)
const alice = getAlice()

describe("Precompile", function () {

    before(async function () {
        console.log("================== Precompile test to make sure the deployment is working ==================");
    });

    it("Should", async function () {

        const [account] = await ethers.getSigners();
        const address = account.address;
        console.log(`Address: ${address}`);
        const balance = await ethers.provider.getBalance(address);
        console.log(`Balance: ${balance}`);
        // const tx = await account.sendTransaction({
        //     to: address,
        //     value: balance,
        // });
        // await tx.wait();
        // console.log(`Transaction sent successfully`);
    });
});