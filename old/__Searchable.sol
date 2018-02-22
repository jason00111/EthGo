pragma solidity ^0.4.18;

/* import "./Ownable.sol"; */
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Searchable
 * @dev Allows the owner to associate searchwords and
 *         messages with their contract.
 */
contract Searchable is Ownable {

  /**
    * @dev Allows the owner to associate a searchword and
    *         message with their contract.
    * @param searchword A word which can be searched for.
    *         Will be associated with this contract and message.
    * @param message A message or description to be associated
    *         with this contract and searchword.
    */
  function addMessageAndSearchword(
    bytes32 searchword,
    bytes32 message
  )
    onlyOwner public
  {
    log2(message, bytes32("message"), searchword);
  }
}
