pragma solidity ^0.4.18;


import "zeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Labeled
 * @dev Allows a contract owner to associate
 * @dev information and searchwords with their contract.
 */
contract Labeled is Ownable {

  /**
   * @dev Allows contract owner to add search terms and descriptions.
   * @dev Allows contract owner to label their contract with searchwords and description.
   * @param description The description to be added.
   * @param term The search term to be added.
   */


  /**
   * @dev Allows contract owner to label their contract with information.
   * @param information The Information to be added.
   */
  function addInformation (
    bytes32 information
  )
    public onlyOwner
  {
    log1(information, bytes32("information"))
  }

  function addInformation (
    bytes32 information,
    bytes32 searchword
  )
    public onlyOwner
  {
    log2(information, bytes32("information"), searchword)
  }

  function addInformation (
    bytes32 description,
    bytes32 term0,
    bytes32 term1
  )
    public onlyOwner
  {
    log3(description, bytes32("information"), term0, term1)
  }

  function addInformation (
    bytes32 description,
    bytes32 term0,
    bytes32 term1,
    bytes32 term2
  )
    public onlyOwner
  {
    log4(description, bytes32("information"), term0, term1, term2)
  }


  /**
   * @dev Allows contract owner to remove a search term.
   * @param term The search term to be removed.
   */
  function removeSearchTerm (bytes32 term) public onlyOwner {
    RemoveSearchTerm(term);
  }

  function removeSearchTerm (bytes32 term0, bytes32 term1) public onlyOwner {
    RemoveSearchTerm(term0);
    RemoveSearchTerm(term1);
  }

  function removeSearchTerm (bytes32 term0, bytes32 term1, bytes32 term2) public onlyOwner {
    RemoveSearchTerm(term0);
    RemoveSearchTerm(term1);
    RemoveSearchTerm(term2);
  }

}
