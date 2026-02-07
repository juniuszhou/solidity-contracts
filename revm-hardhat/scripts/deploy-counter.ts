import { network } from "hardhat";
import CounterModule from "../ignition/modules/Counter";

async function main() {
  const { ethers } = await network.connect({
    network: "hardhatMainnet",
    chainType: "l1",
  });

  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const connection = await network.connect({
    network: "hardhatMainnet",
    chainType: "l1",
  });

  const { counter } = await connection.ignition.deploy(CounterModule);
  console.log("Counter deployed at:", counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
