pkill substrate-node
pkill eth-rpc
rm local-logs/node.log
rm local-logs/rpc.log
/home/user/github/junius/polkadot-sdk-junius/target/release/substrate-node --dev --tmp --unsafe-rpc-external &>local-logs/node.log &
sleep 1
/home/user/github/junius/polkadot-sdk-junius/target/release/eth-rpc --unsafe-rpc-external --rpc-cors all &>local-logs/rpc.log &
