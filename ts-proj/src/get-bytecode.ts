import * as fs from "fs";
import * as path from "path";

// Use require for solc as it may not have proper TypeScript types
const solc = require("solc");

async function main() {
  console.log("Compiling Counter.sol...");

  const contractPath = path.join(__dirname, "..", "contracts", "Counter.sol");
  const source = fs.readFileSync(contractPath, "utf-8");

  const input = {
    language: "Solidity",
    sources: {
      "Counter.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors) {
    const errors = output.errors.filter((e: any) => e.severity === "error");
    if (errors.length > 0) {
      console.error("Compilation errors:");
      errors.forEach((error: any) => {
        console.error(error.formattedMessage || error.message);
      });
      process.exit(1);
    }
  }

  const contract = output.contracts["Counter.sol"]["Counter"];
  const bytecode = contract.evm.bytecode.object;
  const abi = contract.abi;

  console.log("\n=== Bytecode ===");
  console.log("0x" + bytecode);
  console.log("\n=== ABI ===");
  console.log(JSON.stringify(abi, null, 2));

  // Save to files
  const buildDir = path.join(__dirname, "..", "build");
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(buildDir, "Counter.bytecode"),
    "0x" + bytecode
  );
  fs.writeFileSync(
    path.join(buildDir, "Counter.abi.json"),
    JSON.stringify(abi, null, 2)
  );

  console.log("\nBytecode and ABI saved to build/ directory");
  console.log("\nUpdate src/deploy.ts with the bytecode above");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Compilation failed:", error);
    process.exit(1);
  });
