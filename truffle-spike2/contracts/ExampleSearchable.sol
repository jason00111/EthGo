pragma solidity ^0.4.18;

import "./Searchable.sol";

contract ExampleSearchable is Searchable {

  function ExampleSearchable(bytes32 searchword, bytes32 message) public {
    addSearchwordAndMessage(searchword, message);
  }
}
