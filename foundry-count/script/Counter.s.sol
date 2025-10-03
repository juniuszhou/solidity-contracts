// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import {ERC1967Proxy} from "openzeppelin-contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract CounterScript is Script {
    address public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Counter impl = new Counter();
        bytes memory initData = abi.encodeWithSelector(
            Counter.initialize.selector,
            0
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        counter = address(proxy);

        vm.stopBroadcast();
    }
}
