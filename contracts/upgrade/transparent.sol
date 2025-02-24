// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract TransparentProxy {
    address public implementation;
    address public admin;

    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not an admin");
        _;
    }

    function upgrade(address _newImplementation) public onlyAdmin {
        implementation = _newImplementation;
    }

    // In Solidity, the fallback() function is a special function that is executed under specific conditions
    // when a contract receives a call that does not match any of its existing functions.
    fallback() external payable {
        (bool success, bytes memory data) = implementation.delegatecall(
            msg.data
        );
        require(success, "Delegatecall failed");
    }
}

contract Implementation {
    uint256 public value;

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
