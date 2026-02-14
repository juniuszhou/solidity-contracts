# Sample Polkadot Hardhat Project

This project demonstrates how to use Hardhat with Polkadot. It includes a cross-vm example.
The deployed EVM contract can be called from PVM contract, and vice versa.

There are two simple contracts.

- Counter.sol: store a counter and can increase via inc function
- CallCounter.sol: call Counter's inc via address of deployed Counter

## run scripts to show everything

```shell
npx hardhat run scripts/cross-vm.ts --network hub
```
