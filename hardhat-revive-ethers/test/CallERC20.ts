import hre from "hardhat";
import { expect } from "chai";
import { CallERC20 } from "../typechain-types";
// import { ethers } from "hardhat"

describe("CallERC20", () => {
    let token: CallERC20;
    let owner: hre.ethers.Signer;

    const toWei = (value: string) => hre.ethers.parseUnits(value, 18);

    beforeEach(async () => {
        [owner] = await hre.ethers.getSigners();

        let nonce = await hre.ethers.provider.getTransactionCount(owner.address);
        console.log(nonce);
        let balance = await hre.ethers.provider.getBalance(owner.address);
        console.log(balance);

        const CallERC20 = await hre.ethers.getContractFactory("CallERC20");
        token = await CallERC20.deploy();
        await token.waitForDeployment();
    });

    it("assigns initial supply to deployer", async () => {
        const balance = await token.getBalance();
        expect(balance).to.equal(toWei("1000000"));

        // let nonce = await hre.ethers.provider.getTransactionCount(owner.address);
        // console.log(nonce);
        // let ethBalance = await hre.ethers.provider.getBalance(owner.address);
        // console.log(ethBalance);
    });
});
