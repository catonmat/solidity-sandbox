const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // get eth accounts from web3 lib
  accounts = await web3.eth.getAccounts();

  // use an account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Initial messgae passed to inbox smart contract... Hi!']})
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log('account: ', accounts);
    console.log('inbox: ', inbox);
  });
});
