// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Storage {
    event CallPrecompile(bytes);
    bytes result;

    /**
     * @dev no return value
     */
    function callH256(bytes calldata input) public {
        // address of precopile h256
        address precompile = address(0x02);
        // result
        bool success;
        bytes memory resultInMemory;
        // just all it without selector
        (success, resultInMemory) = precompile.call{value: 0}(input);
        // emit the result
        if (success) {
            emit CallPrecompile(resultInMemory);
        }
        // put result in storage
        result = resultInMemory;
    }
}
