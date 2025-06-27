import hre from "hardhat";
import { expect } from "chai";

describe("MyToken", () => {
  let token: any;
  let owner: any;

  const toWei = (value: string) => hre.ethers.parseUnits(value, 18);

  beforeEach(async () => {
    [owner] = await hre.ethers.getSigners();

    let nonce = await hre.ethers.provider.getTransactionCount(owner.address);
    console.log(nonce);

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    token = await MyToken.deploy(toWei("1000000"));
    await token.waitForDeployment();
  });

  it("assigns initial supply to deployer", async () => {
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(toWei("1000000"));

    let nonce = await hre.ethers.provider.getTransactionCount(owner.address);
    console.log(nonce);
  });
});
