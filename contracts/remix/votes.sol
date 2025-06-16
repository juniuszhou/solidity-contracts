// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.3.0/contracts/token/ERC20/extensions/ERC20Votes.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.3.0/contracts/token/ERC20/ERC20.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.3.0/contracts/governance/utils/Votes.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.3.0/contracts/utils/cryptography/EIP712.sol";

contract PVMERC20Votes is ERC20Votes {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        string memory name2,
        string memory version
    ) ERC20(name, symbol) ERC20Votes() EIP712(name2, version) {
        _mint(_msgSender(), totalSupply);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._update(from, to, amount);
    }
}
