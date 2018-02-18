pragma solidity ^0.4.18;

import "./Searchable.sol";

contract ExampleSearchable is Searchable {
  function ExampleSearchable(string searchTerm) Searchable(searchTerm) public {}
}
