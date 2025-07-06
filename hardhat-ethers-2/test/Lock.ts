import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { Signer } from "ethers";
import { Lock } from "../typechain-types/Lock"

describe("Lock", function () {
  let lock: Lock;
  let owner: Signer

  before(async function () {
    [owner] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Lock");
    lock = await Lock.deploy();
    // lock.getEvent()
    console.log(await lock.getAddress())

    const a = BigInt(await lock.getNumber());
    console.log(a)
    expect(a).to.equal(1);

  })

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      // const a = await lock.getNumber();
      // console.log(a)
      expect(0).to.equal(1);
    });
  });
});
