// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Initializable} from "openzeppelin-contracts-upgradeable/proxy/utils/Initializable.sol";

interface ICounter {
    function setNumber(uint256 newNumber) external;
    function increment() external;
    function getNumber() external view returns (uint256);
}

/**
 * @title Counter (Upgradeable Implementation)
 * @dev Upgradeable implementation storing state in proxy. No constructors.
 */
contract Counter is Initializable {
    uint256 public number;
    address public counter;

    function initialize(
        uint256 initialNumber,
        address _counter
    ) public initializer {
        number = initialNumber;
        counter = _counter;
    }

    function setNumber(uint256 newNumber) public {
        bytes memory data = abi.encodeWithSelector(
            ICounter.setNumber.selector,
            newNumber
        );
        (bool success, ) = counter.delegatecall{gas: gasleft()}(data);
        require(success, "Delegatecall failed");
    }

    function increment() public {
        bytes memory data = abi.encodeWithSelector(ICounter.increment.selector);
        (bool success, ) = counter.delegatecall{gas: gasleft()}(data);
        require(success, "Delegatecall failed");
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
