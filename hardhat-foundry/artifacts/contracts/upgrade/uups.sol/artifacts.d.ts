// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { Implementation$Type } from "./Implementation";
import { UUPSProxy$Type } from "./UUPSProxy";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["Implementation"]: Implementation$Type;
    ["UUPSProxy"]: UUPSProxy$Type;
    ["contracts/upgrade/uups.sol:Implementation"]: Implementation$Type;
    ["contracts/upgrade/uups.sol:UUPSProxy"]: UUPSProxy$Type;
  }

  interface ContractTypesMap {
    ["Implementation"]: GetContractReturnType<Implementation$Type["abi"]>;
    ["UUPSProxy"]: GetContractReturnType<UUPSProxy$Type["abi"]>;
    ["contracts/upgrade/uups.sol:Implementation"]: GetContractReturnType<Implementation$Type["abi"]>;
    ["contracts/upgrade/uups.sol:UUPSProxy"]: GetContractReturnType<UUPSProxy$Type["abi"]>;
  }
}
