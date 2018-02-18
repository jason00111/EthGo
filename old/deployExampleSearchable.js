const fs = require('fs')
const solc = require('solc')
const Web3 = require('web3')

// const source = fs.readFileSync('./Contracts/ExampleSearchable.sol', 'utf-8')

const inputs = {
  'Searchable.sol': fs.readFileSync('Contracts/Searchable.sol'),
  'ExampleSearchable.sol': fs.readFileSync('Contracts/ExampleSearchable.sol'),
}

const output = solc.compile({ sources: inputs }, 1)

console.log('output:', output)
//
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
//
// const abi = output.contracts[':ExampleSearchable'].interface
// const bytecode = output.contracts[':ExampleSearchable'].bytecode
//
// console.log('abi vvvvvvvvvvvvv')
// console.log(abi)
// console.log('abi ^^^^^^^^^^^^^')
//
// const gasEstimate = web3.eth.estimateGas({data: bytecode})
//
// const deployingAddress = '627306090abaB3A6e1400e9345bC60c78a8BEf57'
//
// const SearchableContract = new web3.eth.Contract(
//   JSON.parse(abi),
//   {
//     from: deployingAddress,
//     data: bytecode,
//     gas: gasEstimate,
//   }
// )
//
// SearchableContract.deploy({arguments: ['cake', 'buy salt here']})
// .send({
//     from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
//     gas: 1500000,
//     gasPrice: '30000000000000'
// })
// .then(result => console.log('result:', result))
