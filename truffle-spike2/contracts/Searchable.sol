pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Searchable is Ownable {
  event AddSearchTerm(string indexed term);
  event RemoveSearchTerm(string indexed term);

  function Searchable (string searchTerm) public {
    AddSearchTerm(searchTerm);
  }

  function addSearchTerm (string term) public onlyOwner {
    AddSearchTerm(term);
  }

  function removeSearchTerm (string term) public onlyOwner {
    RemoveSearchTerm(term);
  }
}
