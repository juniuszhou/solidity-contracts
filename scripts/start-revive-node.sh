pkill substrate-node
pkill eth-rpc
cd /home/user/github/polkadot-sdk
cargo build --release -p revive-dev-node
cd /home/user/github/junius/jam
rm local-logs/node.log
rm local-logs/rpc.log
RUST_LOG="evm=debug,sc_rpc_server=info,runtime::revive=debug,polkavm=debug" /home/user/github/polkadot-sdk/target/release/revive-dev-node --dev --tmp --unsafe-rpc-external &>local-logs/node.log &
sleep 1
RUST_LOG="debug" /home/user/github/polkadot-sdk/target/release/eth-rpc &>local-logs/rpc.log &
