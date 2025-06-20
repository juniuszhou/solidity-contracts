// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const PVMERC20VotesModule = buildModule("PVMERC20Votes", (m) => {
    const name = m.getParameter("name", "name");
    const symbol = m.getParameter("symbol", "symbol");
    const initialSupply = m.getParameter("initialSupply", 1_000_000n * 10n ** 18n)
    const name2 = m.getParameter("name2", "name2");
    const version = m.getParameter("version", "version");

    const token = m.contract("PVMERC20Votes", [name, symbol, initialSupply, name2, version])

    return { token }
})

export default PVMERC20VotesModule

