// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface ICounter {
    function inc() external;
}

contract CallCounter {
    function callInc(address counter) public {
        ICounter(counter).inc();
    }
}
