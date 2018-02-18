var Searchable = artifacts.require("./Searchable.sol");
var ExampleSearchable = artifacts.require("./ExampleSearchable.sol");

module.exports = function(deployer) {
  deployer.deploy(ExampleSearchable, 'bannanna');
};
