// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var web3 = new Web3(web3)

var wordInput = document.getElementsByClassName('word-input')[0]
var messageInput = document.getElementsByClassName('message-input')[0]
var addressInput = document.getElementsByClassName('address-input')[0]
var abiInput = document.getElementsByClassName('abi-input')[0]

function addRemove(type) {
  var methodName =
    type === 'add'
      ? 'addSearchTerm'
      : 'removeSearchTerm'

  var word = wordInput.value.split(' ')[0]
  // add warning if they type multiple words
  var message = messageInput.value
  var address = addressInput.value

  var contract = new web3.eth.Contract(
    JSON.parse(abiInput.value),
    addressInput.value
  )

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log('error:', error)
    } else {
      (
        type === 'add'
          ? contract.methods[methodName](word, message)
          : contract.methods[methodName](word)
      )
      .send({ from: accounts[0] }, function(error, tx) {
        if (error) {
          console.log('error:', error)
        } else {
          console.log('transaction sent:', tx)

          var resultDiv = document.createElement('div')
          var resultText = document.createTextNode(
            `${word} was ${type === 'add' ? 'added to' : 'removed from'} ${address} `
          )

          var etherscanLink = document.createElement('a')
          etherscanLink.href = 'https://ropsten.etherscan.io/tx/' + tx
          var etherscanText = document.createTextNode('etherscan')
          etherscanLink.appendChild(etherscanText)

          resultDiv.appendChild(resultText)
          resultDiv.appendChild(etherscanLink)
          document.body.appendChild(resultDiv)
        }
      })
    }
  })
}

function add() {
  addRemove('add')
}

function remove() {
  addRemove('remove')
}
