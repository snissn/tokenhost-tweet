import Web3 from 'web3'
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

export var w3 = new Web3()

function generateKeys() {
  var privateKey = w3.utils.randomHex(32)
  const key = privateKey.toString('hex')
  const ephemPrivKey = ec.keyFromPrivate(privateKey)
  const ephemPubKey = ephemPrivKey.getPublic()
  const pub = Buffer.from(ephemPubKey.encode()).toString('hex')
  const address = w3.eth.accounts.privateKeyToAccount(privateKey).address
  return { pub, key, address }
}

export { generateKeys }
