import { ethers } from "ethers";
import { readFileSync } from "fs";
const abi = readFileSync("MY_ERC20.json", "utf8")

const asset = "0x0000000100000000000000000000000000010000"

async function getContract() {
    const abiJson = JSON.parse(abi)
    const contract = new ethers.Contract(asset, abiJson["abi"], ethers.provider)
    return contract;
}

async function main() {
    const url = "http://127.0.0.1:8545"
    const provider = new ethers.JsonRpcProvider(url);
    const contract = await getContract();
}