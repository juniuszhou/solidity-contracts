import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleERC20 } from "../typechain-types/MiniDex.sol/SimpleERC20";

describe("Storage", function () {
  let erc20: SimpleERC20;
  const initialValue: number = 100;

  beforeEach(async () => {
    const SimpleERC20 = await ethers.getContractFactory("SimpleERC20");
    console.log("Deploying Storage contract...", SimpleERC20);
    erc20 = await SimpleERC20.deploy("name", "symbol", 18, initialValue);
    let firstAddress = await erc20.getAddress();
    await erc20.waitForDeployment();
  });

  it("Should return the initial value", async function () {
    expect(await erc20.name()).to.equal("name");
  });

});
