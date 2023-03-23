const Block = require('./Block');

/** Class representing a Blockchain. */
class Blockchain {
 /**
  * Create a Blockchain
  * @constructor
  */
  constructor() {
    this.chain = []; // stores all blocks mined
    this.newTransactions = []; // mempool (memory pool) to transactions before being added to a block for mining  
    this.genesisBlock(); // create genesis block
  }


/**
  * Creates Genesis Block and adds it to the blockchain
  * @return {Block} returns Block class representing the Genesis Block aka first block in the chain
  */
  genesisBlock() {
    const transactions = {};
    const genesisBlockVal = new Block(transactions, "", 0);
    genesisBlockVal.hash = 0; // hard code 0 value to make genesis block easy to find
    this.chain.push(genesisBlockVal);
  }

 /**
  * Creates and adds a new Block to the blockchain
  * @param {array} _transactions - transactions to be included in block
  * @param {string} _previousBlockHashng - previous block's hash to link to current block to form a highly immutable chain
  * @return {Block} returns Block class representing individual block in blockchain
  */
  // replace previousBlockHash -> previous.hash, hash -> current.hash
  addBlock(_transactions, _previousBlockHash) {
    // create a new block for our blockchain
    const blockIndex = this.chain.length + 1
    const newBlock = new Block(_transactions, _previousBlockHash, blockIndex);

    // clear new tx and add
    // can be modified based on fee
    this.newTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
  }

/**
  * Get latest Block on blockchain
  * @return {Block} returns last Block in blockchain 
  */
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

}

module.exports = Blockchain;

/*
Overview of Blockchain Class Properties
1. this.chain - holds all our blocks created and mined

2. this.newTransactions - mempool (memory pool) that 
holds our transactions before being added 
to a block for mining


Overview of Block Class Property
1. index - the position of our block in the blockchain
2. timestamp - the time block was created. Essential since blockchains 
for our purposes need to be organized in chronological order.
3. transactions - holds new transactions from the blockchain's mempool
4. hash - the "digital safety seal" aka checksum that can be used 
to check for data manipulation or fraud
5. previousBlockHash - the checksum from the previous block. 
This is hashed along with the current block's information.
Doing so does three things:
- creates a link between the blocks. 
If blockN is altered, blockN+1 is altered.
Because all blocks are linked via hashes
this sets off a domino effect of broken blocks
The further the altered block is, 
the bigger the domino effect
- This domino effect, combined with the costliness of 
proof of work, creates one part of the
"immutability" properties that make blockchains so powerful
The data in the blocks are effectively sealed away 
from manipulation.
- Comparing the hashes allows the chain to check for fraud.

*/