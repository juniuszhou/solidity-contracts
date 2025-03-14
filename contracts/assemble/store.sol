// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title AssemblyExample
 * @dev Demonstrates the use of various assembly instructions
 */
contract AssemblyExample {
    uint256 public storedData;

    /**
     * @dev Store a value using assembly
     * @param x The value to store
     */
    function store(uint256 x) public {
        assembly {
            sstore(storedData.slot, x) // Store x in the storage slot of storedData
        }
    }

    /**
     * @dev Retrieve the stored value using assembly
     * @return The stored value
     */
    function retrieve() public view returns (uint256) {
        uint256 result;
        assembly {
            result := sload(storedData.slot) // Load the value from the storage slot of storedData
        }
        return result;
    }

    function storeMemory() public pure returns (uint) {
        uint result;
        assembly {
            let ptr := mload(0x40) // Load free memory pointer (e.g., 0x80)
            mstore(ptr, 42) // Store 42 at ptr (0x80)
            mstore(0x40, add(ptr, 32)) // Update free memory pointer
            result := mload(ptr) // Read it back
        }
        return result; // Returns 42
    }
}
