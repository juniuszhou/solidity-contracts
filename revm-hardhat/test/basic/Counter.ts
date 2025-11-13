import { expect } from "chai";
import { network } from "hardhat";
import { createClient } from "polkadot-api"
const { ethers } = await network.connect();

describe("Counter", function () {
  it("Should emit the Increment event when calling the inc() function", async function () {
    console.log("================== Basic Counter test to make sure the deployment is working ==================");
    const counter = await ethers.deployContract("Counter");
    const deployTx = counter.deploymentTransaction();
    if (deployTx) {
      const deployReceipt = await deployTx.wait();
      console.log(`\n📦 Deployment gas: ${deployReceipt.gasUsed.toString()}`);
    }

    const tx = await counter.inc();
    const receipt = await tx.wait();

    console.log(`⛽ Gas used for inc(): ${receipt?.gasUsed?.toString()}`);

    await expect(tx).to.emit(counter, "Increment").withArgs(1n);
  });

  it("The sum of the Increment events should match the current value", async function () {
    const counter = await ethers.deployContract("Counter");
    const deployTx = counter.deploymentTransaction();
    if (deployTx) {
      const deployReceipt = await deployTx.wait();
      console.log(`\n📦 Deployment gas: ${deployReceipt.gasUsed.toString()}`);
    }
    const deploymentBlockNumber = await ethers.provider.getBlockNumber();

    // run a series of increments
    console.log("\n⛽ Gas Report:");
    let totalGas = 0n;
    for (let i = 1; i <= 10; i++) {
      const tx = await counter.incBy(i);
      const receipt = await tx.wait();
      if (receipt?.gasUsed) {
        totalGas += receipt.gasUsed;
        console.log(`  incBy(${i}): ${receipt.gasUsed.toString()} gas`);
      }
    }
    console.log(`\n📊 Total gas used for all incBy calls: ${totalGas.toString()}`);

    const events = await counter.queryFilter(
      counter.filters.Increment(),
      deploymentBlockNumber,
      "latest",
    );

    // check that the aggregated events match the current value
    let total = 0n;
    for (const event of events) {
      total += event.args.by;
    }

    expect(await counter.x()).to.equal(total);
  });
});
