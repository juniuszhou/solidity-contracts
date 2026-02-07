# TypeScript Project - Counter Contract Deployment

This project demonstrates how to deploy and interact with a Counter smart contract using ethers.js and TypeScript on the Polkadot Asset Hub testnet.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A funded account on the testnet (for gas fees)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Edit `.env` and add your private key:

```
POLKADOT_HUB_TESTNET_PRIVATE_KEY=your_private_key_here
```

**Important**: Make sure the account associated with your private key has funds on the testnet. You can get testnet tokens from a faucet if needed.

## Compiling the Contract

Before deploying, you need to compile the Counter contract:

```bash
npm run compile
```

This will:

- Compile `contracts/Counter.sol` using solc
- Generate `build/Counter.bytecode` and `build/Counter.abi.json`
- The deployment script will automatically use the compiled bytecode

Alternatively, you can use:

- **Hardhat**: `npx hardhat compile` (then copy bytecode manually)
- **solc CLI**: `solc --bin contracts/Counter.sol -o build/`
- **Remix IDE**: Compile online and copy the bytecode

## Usage

### Deploy the Contract

```bash
npm run deploy
```

This will:

- Connect to the testnet RPC
- Deploy the Counter contract
- Save deployment information to `deployment.json`
- Display the contract address

### Interact with the Contract

```bash
npm run interact
```

This will:

- Connect to the deployed contract
- Read the current counter value
- Call `inc()` to increment by 1
- Call `incBy(5)` to increment by 5
- Display the final counter value
- Listen for Increment events

## Project Structure

```
ts-proj/
├── contracts/
│   └── Counter.sol          # Counter smart contract
├── src/
│   ├── deploy.ts            # Deployment script
│   ├── interact.ts          # Interaction script
│   ├── get-bytecode.ts      # Compilation script
│   └── compile.ts           # Compilation helper
├── build/                    # Compiled contract artifacts (generated)
│   ├── Counter.bytecode
│   └── Counter.abi.json
├── dist/                     # Compiled TypeScript (generated)
├── package.json
├── tsconfig.json
├── .env                      # Environment variables (create from .env.example)
├── deployment.json           # Deployment info (generated after deployment)
└── README.md
```

## Network Information

- **RPC URL**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Network**: Polkadot Asset Hub Testnet
- **Chain ID**: (check network documentation)

## Notes

- Run `npm run compile` before deploying to generate the contract bytecode.
- Make sure your account has sufficient balance for gas fees on the testnet.
- The deployment info is saved to `deployment.json` for use by the interaction script.
- The deployment script automatically loads bytecode from `build/Counter.bytecode` if available.

## Troubleshooting

1. **"Account has no balance"**: Fund your account with testnet tokens.
2. **"Contract address not found"**: Make sure you've deployed the contract first.
3. **Compilation errors**: Ensure you have the correct Solidity compiler version (^0.8.28).
