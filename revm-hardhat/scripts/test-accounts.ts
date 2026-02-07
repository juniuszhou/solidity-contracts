import { network } from "hardhat";


async function testAccounts(networkName: string) {
    const { ethers } = await network.connect({
        network: networkName,
        chainType: "l1",
    });


    const [sender] = await ethers.getSigners();
    const balance = await ethers.provider.getBalance(sender.address);
    console.log("Balance of", sender.address, "is", balance);

}

async function main() {
    await testAccounts("passetHub");
    // await testAccounts("local");
}

main();