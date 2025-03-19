// scripts/deploy.ts
import { ethers } from "ethers";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("MyToken", "MTK");
    await token.deployed();
    console.log("Token deployed to:", token.address);

    // Deploy Marketplace contract with the token address
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(token.address);
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);

    // Optionally save addresses to a JSON file
    const fs = require('fs');
    const addresses = {
        token: token.address,
        marketplace: marketplace.address,
    };
    fs.writeFileSync('deployedAddresses.json', JSON.stringify(addresses, null, 2));
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


