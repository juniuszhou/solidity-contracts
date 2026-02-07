import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { CounterAbi, CounterEVMBytecode, CounterPVMBytecode } from "./contract";
import { CallCounterAbi, CallCounterEVMBytecode, CallCounterPVMBytecode } from "./contract";

dotenv.config();

// const pvmContractAddress = "0xDdEb06015294f42687f7a79ABC4bF5782AECB432";
// const evmContractAddress = "0x17281E5f7A6619a3c50291BcEe8bdBFbCF23D5C4";

async function deployCounter(wallet: ethers.Wallet, bytecode: string) {
    const factory = new ethers.ContractFactory(CounterAbi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    console.log(`Contract deployed at: ${contract.target}`);
    return contract.target.toString();
}

async function getValue(wallet: ethers.Wallet, contractAddress: string) {
    const contract = new ethers.Contract(contractAddress, CounterAbi, wallet);
    const value = await contract.x();
    console.log(`Value: ${value}`);
}

async function deployCallCounter(wallet: ethers.Wallet, bytecode: string, evmContractAddress: string, pvmContractAddress: string) {
    const factory = new ethers.ContractFactory(CallCounterAbi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    console.log(`Contract deployed at: ${contract.target}`);

    const callCounter = new ethers.Contract(contract.target, CallCounterAbi, wallet);
    const tx = await callCounter.callInc(evmContractAddress);
    await tx.wait();

    const tx2 = await callCounter.callInc(pvmContractAddress);
    await tx2.wait();
}

async function main() {
    const URL = "https://services.polkadothub-rpc.com/testnet"
    const provider = new ethers.JsonRpcProvider(URL);
    const privateKey = process.env.POLKADOT_HUB_TESTNET_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey?.toString() ?? "", provider);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance: ${balance}`);
    console.log("Hello, world!");

    const evmContractAddress = await deployCounter(wallet, CounterEVMBytecode);
    const pvmContractAddress = await deployCounter(wallet, CounterPVMBytecode);

    await getValue(wallet, evmContractAddress);
    await getValue(wallet, pvmContractAddress);
    await deployCallCounter(wallet, CallCounterEVMBytecode, evmContractAddress, pvmContractAddress);
    await getValue(wallet, evmContractAddress);
    await getValue(wallet, pvmContractAddress);

    await getValue(wallet, evmContractAddress);
    await getValue(wallet, evmContractAddress);
    await deployCallCounter(wallet, CallCounterPVMBytecode, evmContractAddress, pvmContractAddress);
    await getValue(wallet, evmContractAddress);
    await getValue(wallet, evmContractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

