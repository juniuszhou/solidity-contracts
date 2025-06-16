import { config } from "dotenv";
import { privateKeyToAccount } from "viem/accounts";
import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
  PublicClient,
} from "viem";
import { ethers } from "ethers";
import {
  BRIDGE_TOKEN_CONTRACT_ABI,
  BRIDGE_TOKEN_CONTRACT_BYTECODE,
} from "./bridge";

const ETH_LOCAL_URL = "https://rpc.api.moonbase.moonbeam.network";
export const localChain = (url: string) =>
  defineChain({
    id: 31337,
    name: "Testnet",
    network: "Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [url],
      },
    },
    testnet: true,
  });

const moonbase = defineChain({
  id: 1287,
  name: "moonbase",
  network: "moonbase",
  nativeCurrency: {
    name: "DEV",
    symbol: "DEV",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbase.moonbeam.network"],
    },
  },
  testnet: false,
});

function toViemAddress(address: string): string {
  return address.startsWith("0x") ? address : `0x${address}`;
}

async function getWallet(privateKey: string) {
  const provider = new ethers.JsonRpcProvider(ETH_LOCAL_URL);

  const wallet = new ethers.Wallet(privateKey, provider);
  return wallet;
}

async function deployContract(privateKey: string) {
  const provider = new ethers.JsonRpcProvider(ETH_LOCAL_URL);

  const wallet = new ethers.Wallet(privateKey, provider);
  const contractFactory = new ethers.ContractFactory(
    BRIDGE_TOKEN_CONTRACT_ABI,
    BRIDGE_TOKEN_CONTRACT_BYTECODE,
    wallet,
  );
  const contract = await contractFactory.deploy(
  );
  await contract.waitForDeployment();

  return await contract.getAddress();
}

async function main() {
  config();
  // const url = "https://westend-asset-hub-eth-rpc.polkadot.io"
  const privKey = process.env.AH_PRIV_KEY;

  const publicClient = createPublicClient({
    chain: moonbase,
    transport: http(),
  });

  if (!privKey) {
    throw new Error(
      "Invalid private key. Ensure it is set and in the correct format.",
    );
  }

  const withoutPrefix = privKey.replace(/^0x/, "");

  const account = privateKeyToAccount(`0x${withoutPrefix}`);
  console.log(account.address);

  const walletClient = createWalletClient({
    account: privateKeyToAccount(`0x${withoutPrefix}`),
    chain: moonbase,
    transport: http(),
  });

  //   await walletClient.sendTransaction({
  //     account: account,
  //     to: "0xbe76F847BE61bd84bd2138F4E12F98FbFA785Ffe",
  //     value: BigInt(100000000000000), // 0.01 ETH in wei
  //   });

  // const nonce = await publicClient.getTransactionCount({ address: account.address })
  // console.log(nonce)

  // const balance = await publicClient.getBalance({ address: account.address })
  // console.log(`Balance: ${balance} wei`)

  const contractAddress = await deployContract(privKey);
  console.log(`Contract deployed at address: ${contractAddress}`);
  //   const contractAddress = "0xbe76F847BE61bd84bd2138F4E12F98FbFA785Ffe";

  // const balance1 = await publicClient.getBalance({ address: contractAddress })
  // console.log(`Balance: ${balance1} wei`)

  // const etherWallet = await getWallet(withoutPrefix)
  // console.log(etherWallet.address)

  // const transfer = {
  //     to: contractAddress,
  //     value: ethers.parseEther("0.02").toString(),

  // }
  // const tx = await etherWallet.sendTransaction(transfer)
  // console.log(`Transaction sent: ${tx.hash}`)
  // const receipt = await tx.wait()

  //   const balance2 = await publicClient.getBalance({ address: contractAddress });
  //   console.log(`Balance: ${balance2} wei`);
}

main();
