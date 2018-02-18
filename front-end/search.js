var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/CTNrMRz6lyyxOxddWG7y'))

var inputField = document.getElementsByClassName('search-input')[0]
var resultsSection = document.getElementsByClassName('results')[0]

var addEventHash = web3.utils.sha3('AddSearchTerm(string)')
var removeEventHash = web3.utils.sha3('RemoveSearchTerm(string)')

var searchResults = {}

function getLogs(searchTerm, wordHash) {
  web3.eth.getPastLogs({
    fromBlock: '0x1',
    toBlock: 'latest',
    topics: [addEventHash, wordHash]
  }, function(error, foundLogs) {
    if (error) {
      console.log('error:', error)
    } else {
      foundLogs.forEach(function(log) {
        searchResults[log.address] = log.blockNumber
      })

      getRemoves(searchTerm, wordHash)
    }
  })
}

function getRemoves(searchTerm, wordHash) {
  web3.eth.getPastLogs({
    fromBlock: '0x1',
    toBlock: 'latest',
    topics: [removeEventHash, wordHash]
  }, function(error, foundLogs) {
    if (error) {
      console.log('error:', error)
    } else {
      foundLogs.forEach(function(log) {
        if (searchResults[log.address] < log.blockNumber) {
          delete searchResults[log.address]
        }
      })
      displayResults()
    }
  })
}

function displayResults() {
  console.log('searchResults:', searchResults)

  Object.keys(searchResults).forEach(function(address) {
    var rowDiv = document.createElement('div')
    rowDiv.className = 'row'

    var addressDiv = document.createElement('pre')
    var addressText = document.createTextNode(address)
    addressDiv.appendChild(addressText)

    var etherscanDiv = document.createElement('span')
    console.log('etherscanDiv:', etherscanDiv)
    var etherscanLink = document.createElement('a')
    etherscanLink.href = 'https://etherscan.io/tx/' + address
    console.log('etherscanLink:', etherscanLink)
    var etherscanText = document.createTextNode('etherscan')
    etherscanLink.appendChild(etherscanText)

    etherscanDiv.appendChild(etherscanLink)

    rowDiv.appendChild(addressDiv)
    rowDiv.appendChild(etherscanDiv)

    resultsSection.appendChild(rowDiv)
  })
}

function search() {
  resultsSection.innerHTML = ''
  searchResults = {}

  var searchInput = inputField.value
  var searchTerm = searchInput.split(' ')[0]
  var wordHash = web3.utils.sha3(searchTerm)

  getLogs(searchTerm, wordHash)
}




// foundLogs.forEach(function(log) {
//   if (searchResults[log.address]) {
//     if (!searchResults[log.address].includes(searchTerm)) {
//       searchResults[log.address].push(searchTerm)
//     }
//   } else {
//     searchResults[log.address] = [searchTerm]
//   }
// })
