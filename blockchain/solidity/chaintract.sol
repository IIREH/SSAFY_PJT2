// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Chaintract_001 {

    uint256[] chaintractSerialNumbers;
    address manager;
    constructor () {
        manager = msg.sender;
    }
    mapping(uint256 => bytes32) serialNumberToEncryptedCode;


    modifier onlyManagerRegister() {
        require(msg.sender == manager, "Only manager can register constracts.");
        _;
    }
    function register(uint256 serialNum, bytes32 encrypted) public onlyManagerRegister {
        require(serialNumberToEncryptedCode[serialNum] == 0);
        chaintractSerialNumbers.push(serialNum);
        serialNumberToEncryptedCode[serialNum] = encrypted;
    }


    function verify(uint256 serialNum) public view returns(bytes32) {
        return serialNumberToEncryptedCode[serialNum];
    }



}
