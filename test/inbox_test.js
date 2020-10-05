const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Initial message passed to inbox smart contract... Hi!';

beforeEach(async () => {
  // get eth accounts from web3 lib
  accounts = await web3.eth.getAccounts();

  // use an account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_STRING]})
    .send({ from: accounts[0], gas: '1000000' })
  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log('account: ', accounts);
    console.log('inbox: ', inbox);

    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });

  it('can change the message using setMessage', async () => {
    const changedMessage = 'I CHANGED IT';
    // modifiying smart contract requires gas and user account
    await inbox.methods.setMessage(changedMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, changedMessage);
  });
});
