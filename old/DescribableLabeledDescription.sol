pragma solidity ^0.4.18;

import "./Describable.sol";


/**
 * @title Describable
 * @dev A describable contract can be described by the owner.
 */
contract DescribedLabeledDescription is Describable {

  /**
    * @dev Allows the owner to describe their contract.
    * @param description A description of the contract.
    */
    function describe(bytes32 description) onlyOwner public {
      log1(description, bytes32("description"))
    }

    /**
      * @dev Allows the owner to describe their contract.
      * @param description A description of the contract.
      */
    function describeWithLabel(bytes32 description, bytes32 label) onlyOwner public {
      log1(description, bytes32("description"), label)
    }
}
