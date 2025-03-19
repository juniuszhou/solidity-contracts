// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title AssemblyExample
 * @dev Demonstrates the use of various assembly instructions
 */
contract AssemblyExample {
    /**
     * @dev Add two numbers using assembly
     * @param a First number
     * @param b Second number
     * @return The sum of a and b
     */
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 sum;
        assembly {
            sum := add(a, b) // Add a and b
        }
        return sum;
    }

    /**
     * @dev Subtract two numbers using assembly
     * @param a First number
     * @param b Second number
     * @return The result of a - b
     */
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 difference;
        assembly {
            difference := sub(a, b) // Subtract b from a
        }
        return difference;
    }

    /**
     * @dev Multiply two numbers using assembly
     * @param a First number
     * @param b Second number
     * @return The product of a and b
     */
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 product;
        assembly {
            product := mul(a, b) // Multiply a and b
        }
        return product;
    }

    /**
     * @dev Divide two numbers using assembly
     * @param a First number
     * @param b Second number
     * @return The result of a / b
     */
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b > 0, "Division by zero");
        uint256 quotient;
        assembly {
            quotient := div(a, b) // Divide a by b
        }
        return quotient;
    }
}
