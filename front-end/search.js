var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/CTNrMRz6lyyxOxddWG7y'))

var inputField = document.getElementsByClassName('search-input')[0]
var resultsSection = document.getElementsByClassName('results')[0]

var addEventHash = web3.utils.sha3('AddSearchTerm(string,string)')
// var addEventMessageHash = web3.utils.sha3('AddSearchTerm(string,string)')
var removeEventHash = web3.utils.sha3('RemoveSearchTerm(string)')

var searchResults = {}

// function getLogs(eventSignature)

function getLogs(wordHash) {
  web3.eth.getPastLogs({
    fromBlock: '0x1',
    toBlock: 'latest',
    topics: [addEventHash, wordHash]
  }, function(error, foundLogs) {
    if (error) {
      console.log('error:', error)
    } else {
      console.log('foundLogs:', foundLogs)
      foundLogs.forEach(function(log) {
        var message =
          web3.utils.hexToUtf8(log.data)
            .split('')
            .reduce(
              (acc, char) => char.charCodeAt(0) ? acc.concat(char) : acc,
              ''
            )
            .slice(2)

        searchResults[log.address] = {
          blockNumber: log.blockNumber,
          message: message
        }
      })

      getRemoves(wordHash)
      // displayResults()
    }
  })
}

function getRemoves(wordHash) {
  web3.eth.getPastLogs({
    fromBlock: '0x1',
    toBlock: 'latest',
    topics: [removeEventHash, wordHash]
  }, function(error, foundLogs) {
    if (error) {
      console.log('error:', error)
    } else {
      foundLogs.forEach(function(log) {
        if (searchResults[log.address].blockNumber < log.blockNumber) {
          delete searchResults[log.address]
        }
      })
      displayResults()
    }
  })
}

function displayResults() {
  console.log('searchResults:', searchResults)

  if (Object.keys(searchResults).length === 0) {
      var noResultsDiv = document.createElement('div')
      noResultsDiv.className = 'no-results'
      var noResultsText = document.createTextNode('no matching contracts found')
      noResultsDiv.appendChild(noResultsText)
      resultsSection.appendChild(noResultsDiv)
  }

  Object.keys(searchResults).forEach(function(address) {
    var message = searchResults[address].message

    var rowDiv = document.createElement('div')
    rowDiv.className = 'row'

    var addressDiv = document.createElement('div')
    addressDiv.className = 'address'
    var addressText = document.createTextNode(address)
    addressDiv.appendChild(addressText)

    var messageDiv = document.createElement('div')
    messageDiv.className = 'message'
    var messageText = document.createTextNode(message)
    messageDiv.appendChild(messageText)

    var etherscanDiv = document.createElement('div')
    etherscanDiv.className = 'etherscan'
    var etherscanLink = document.createElement('a')
    etherscanLink.href = 'https://ropsten.etherscan.io/address/' + address
    var etherscanText = document.createTextNode('etherscan')
    etherscanLink.appendChild(etherscanText)
    etherscanDiv.appendChild(etherscanLink)

    rowDiv.appendChild(addressDiv)
    rowDiv.appendChild(etherscanDiv)
    rowDiv.appendChild(messageDiv)

    resultsSection.appendChild(rowDiv)
  })
}

function search() {
  resultsSection.innerHTML = ''
  searchResults = {}

  var searchInput = inputField.value
  var searchTerm = searchInput.split(' ')[0]
  var wordHash = web3.utils.sha3(searchTerm)

  getLogs(wordHash)
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
