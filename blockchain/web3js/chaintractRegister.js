const Web3 = require('web3');
const ENDPOINT = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

const serialNum = "2022032700000001";
const encryptedCode = "0xa100000000000000000000000000000000000000000000000000000000000000";

// 2022033000000001 : 0xa100000000000000000000000000000000000000000000000000000000000000 (registered)
// 2022033000000002 : 0xb200000000000000000000000000000000000000000000000000000000000000
// 2022033000000003 : 0xc300000000000000000000000000000000000000000000000000000000000000
// 2022033000000004 : 0xd400000000000000000000000000000000000000000000000000000000000000
// account[3] : 0xa6e96c314aa5e1a829e2eaa0be76ed1577900979 (deployer)
// account[4] : 0x38A951C86DD11F8229DafE88106096879f1f413f

const address = "0xa6e96c314aa5e1a829e2eaa0be76ed1577900979"
const CA = "0xCBD51e49D0b6Fbc3550F88Ae2b08f0ebF9667649"
const ABI = [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "serialNum",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "encrypted",
                            "type": "bytes32"
                        }
                    ],
                    "name": "register",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "serialNum",
                            "type": "uint256"
                        }
                    ],
                    "name": "verify",
                    "outputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

const register = () => {
    const CONTRACT_ADDRESS = CA;
    const fromAddress = address;
    const test001contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    test001contract.methods.register(serialNum, encryptedCode)
    .send({from: fromAddress})
    .then(console.log("Chaintract No.", serialNum, "is registered."));
};

register()



