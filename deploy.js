const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'mnenomic',
  'https://kovan.infura.io/v3/41b8297a96814900b29adb99d458a2f5'
);

console.log(process.env.CRYPTO_SEED_BRAVE_WALLET)
