import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { LoopAbi, LoopEVMBytecode, LoopPVMBytecode } from "./contract";

dotenv.config();

async function deployLoop(wallet: ethers.Wallet, loopBytecode: string) {
    const factory = new ethers.ContractFactory(LoopAbi, loopBytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    console.log(`Contract deployed at: ${contract.target}`);
    return contract.target;
}

async function main() {
    const URL = "https://services.polkadothub-rpc.com/testnet"
    const provider = new ethers.JsonRpcProvider(URL);
    const privateKey = process.env.POLKADOT_HUB_TESTNET_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey?.toString() ?? "", provider);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance: ${balance}`);
    console.log("Hello, world!");

    const loopEVMAddress = await deployLoop(wallet, LoopEVMBytecode);
    const loopPVMAddress = await deployLoop(wallet, LoopPVMBytecode);

    const loopEVM = new ethers.Contract(loopEVMAddress, LoopAbi, wallet);
    const loopPVM = new ethers.Contract(loopPVMAddress, LoopAbi, wallet);

    const evmTx = await loopEVM.setLoop(loopPVMAddress);
    await evmTx.wait();

    const pvmTx = await loopPVM.setLoop(loopEVMAddress);
    await pvmTx.wait();

    const loopTx = await loopEVM.callLoop();
    await loopTx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

