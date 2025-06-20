// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {}
}
