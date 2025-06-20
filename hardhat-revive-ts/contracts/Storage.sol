pragma solidity ^0.8.19;

contract Storage {
    string public number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(string memory num, string memory a) public {
        number = num;
        number = a;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (string memory) {
        return number;
    }
}