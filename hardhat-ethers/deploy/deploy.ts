import { ethers } from "hardhat"


async function main() {
    const Lock = await ethers.getContractFactory("Lock");
    const initialValue = 42;

    const lock = await Lock.deploy(initialValue);
    await lock.waitForDeployment();

    const contractAddress = await lock.getAddress();

    console.log("Lock deployed to:", contractAddress);

    const tx = await lock.withdraw();
    await tx.wait();
    const owner = await lock.owner();

    console.log(`Current owner in contract: ${owner.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


