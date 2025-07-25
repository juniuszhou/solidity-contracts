pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

contract CallERC20 {
    event TotalSupply(uint256 supply);

    // Address of the ECRecover precompile
    address constant EC_RECOVER_ADDRESS =
        address(0x0000000700000000000000000000000000100000);
    bytes public result;

    function callECRecover() public {}

    function getBalance() public view returns (uint256) {
        IERC20 erc20 = IERC20(EC_RECOVER_ADDRESS);
        uint256 supply = erc20.totalSupply();
        return supply;
    }
}
