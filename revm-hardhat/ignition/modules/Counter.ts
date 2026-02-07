import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

export default buildModule("CounterModule", (m) => {
  const deployer = m.getAccount(0);
  
  // Try to get and print account address synchronously
  try {
    const hre = require("hardhat");
    const networkName = hre.network?.name || "hardhat";
    const networkConfig = hre.config?.networks?.[networkName];
    
    if (networkConfig?.accounts && Array.isArray(networkConfig.accounts) && networkConfig.accounts.length > 0) {
      const firstAccount = networkConfig.accounts[0];
      if (typeof firstAccount === "string" && firstAccount.startsWith("0x")) {
        // It's a private key, derive the address
        const wallet = new ethers.Wallet(firstAccount);
        console.log("Deployer address:", wallet.address);
      } else {
        console.log("Account index 0 will be used (address not available synchronously)");
      }
    } else {
      console.log("Using default account for deployment");
    }
  } catch (e) {
    console.log("Account index 0 will be used for deployment");
  }
  
  const counter = m.contract("Counter");

  m.call(counter, "incBy", [5n]);

  return { counter };
});
