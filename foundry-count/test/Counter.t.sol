// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter, ICounter} from "../src/Counter.sol";
import {ERC1967Proxy} from "openzeppelin-contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract CounterImpl is ICounter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}

contract CounterTest is Test {
    Counter public impl;
    ICounter public counter;

    function setUp() public {
        impl = new Counter();
        bytes memory initData = abi.encodeWithSelector(
            Counter.initialize.selector,
            0
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        counter = ICounter(address(proxy));
    }

    function test_Increment() public {
        counter.setNumber(1);
        assertEq(counter.getNumber(), 1);
        counter.increment();
        assertEq(counter.getNumber(), 2);
    }

    function test_SetNumber() public {
        counter.setNumber(42);
        assertEq(counter.getNumber(), 42);
    }
}
