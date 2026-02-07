// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface ILoop {
    function callLoop() external;
}

contract Loop {
    address public loop;

    function setLoop(address _loop) public {
        loop = _loop;
    }

    function callLoop() public {
        ILoop(loop).callLoop();
    }
}
