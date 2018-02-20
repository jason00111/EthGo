pragma solidity ^0.4.18;

import "./Ownable.sol";


/**
 * @title Describable
 * @dev A describable contract can be described by the owner.
 */
contract Describable is Ownable {

  /**
    * @dev Allows the owner to describe their contract.
    * @param description A description of the contract.
    */
    function describe(bytes32 description) onlyOwner public {
      log1(description, bytes32("description"))
    }
}
