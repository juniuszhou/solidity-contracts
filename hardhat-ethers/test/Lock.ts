
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { Lock } from "../typechain-types/Lock"
import { expect } from "chai";
import hre from "hardhat";
import { Signer } from "ethers";

describe("Lock", function () {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

  const unlockTime = ONE_YEAR_IN_SECS;
  let lock: Lock;
  let owner: Signer

  before(async function () {
    [owner] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Lock");
    lock = await Lock.deploy();
    // lock.getEvent()
    console.log(await lock.getAddress())

  })

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const number = await lock.getNumber();
      console.log(number)
      expect(number).to.equal(1);
    });



  });
});
