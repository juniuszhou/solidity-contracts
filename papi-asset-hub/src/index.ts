import { ss58ToEthAddress } from "./convert"

function main() {
    const ss58 = "5HFF42Lew3aWoEkyzntjjCV41aXkGVjVBJdS7s5MwJcAF4d9"
    const ethAddress = ss58ToEthAddress(ss58)
    console.log(ethAddress)

}

main()