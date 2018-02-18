var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/CTNrMRz6lyyxOxddWG7y'))

var wordInput = document.getElementsByClassName('word-input')[0]
var addressInput = document.getElementsByClassName('address-input')[0]
var abiInput = document.getElementsByClassName('abi-input')[0]

function addRemove(type) {
  var methodName =
    type === 'add'
      ? 'addSearchTerm'
      : 'removeSearchTerm'

  var word = wordInput.value.split(' ')[0]
  var address = addressInput.value
  // add warning if they type multiple words

  var contract = new web3.eth.Contract(
    JSON.parse(abiInput.value),
    addressInput.value
  )

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log('error:', error)
    } else {
      contract.methods[methodName](word)
        .send({ from: accounts[0] }, function(error, result) {
          if (error) {
            console.log('error:', error)
          } else {
            console.log('send transaction result:', result)
          }
        })
    }
  })

  var resultDiv = document.createElement('div')
  var resultText = document.createTextNode(
    `${word} was ${type === 'add' ? 'added to' : 'removed from'} ${address}`
  )
  resultDiv.appendChild(resultText)
  document.body.appendChild(resultDiv)
}

function add() {
  addRemove('add')
}

function remove() {
  addRemove('remove')
}
