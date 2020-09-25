pragma solidity ^0.4.25;

contract Inbox {
  // attr accessor for message on the smart contract
  string public message;

  function Inbox(string initialMessage) public {
    message = initialMessage;
  }

  function setMessage(string newMessage) public {
    message = newMessage;
  }
}
