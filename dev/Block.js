const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex } = require("ethereum-cryptography/utils"); 

/** Class representing a Block in a blockchain. */
class Block {
 /**
  * Create a Block
  * Used in a Blockchain class
  * @constructor
  * @param {array} _transactions - transactions to be included in block
  * @param {string} _previousBlockHash - hash of previous block to link blocks in a chain
  */
  constructor(_transactions, _previousBlockHash, _blockIndex) {
    this.blockIndex = _blockIndex;  // optional: might remove
    this.timeStamp = Date.now();
    this.transactions = _transactions;
    this.previousBlockHash = _previousBlockHash;
    this.nonce = 0;
    this.hash = '';
  }

 // STATIC HELPER METHODS
 /**
  * Transform a string into a Uint8Array 
  * @param {string} _string - transactions to be included in block
  * @return {Uint8Array} The Uint8Array representing inputted string
  */
  static stringToArray(_string) {
    // TextEncoder interface takes a stream of code points as input and emits a stream of UTF-8 bytes.
    // .encode() - takes a string as input, and returns a Uint8Array containing UTF-8 encoded text.
    let uint8Array = new TextEncoder("utf-8").encode(_string);
	  return uint8Array;
  }
  
 /**
  * Transform an Uint8Array into a string
  * @param {Uint8Array} _uint8Array - transactions to be included in block
  * @return {string} The Uint8Array representing inputted string
  */
  static arrayToString(_uint8Array) {
    // .decode() - Returns a string containing the text decoded 
    // with the method of the specific TextDecoder object.
    return new TextDecoder("utf-8").decode(_uint8Array);
  }

 // CLASS METHODS
 /**
  * Generate the block's hash from the block's metadata
  * @param {string} _nonce - incremented value used to find target value during proof of work.
  * @return {string} The hexadecimal hash value representing the block
  */
  generateHash(_nonce) {
    this.nonce = _nonce;

     // convert string -> Uint8Array for sha256()
    const blockHeader = Block.stringToArray(
                this.timeStamp.toString() 
                + this.transactions.toString()
                + this.previousBlockHash.toString()
                + this.nonce.toString());

    // toHex() transforms uint8Array-based hash
    // to hexadecimal number
    const hash = toHex(sha256(blockHeader)); 

    return hash;
  }
}

module.exports = Block;

/*
Using ethereum-cryptography library to:
- hash blocks with sha256()
- Turn into hex with toHex

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
the bigger the domino effect.

- This domino effect, combined with the costliness of 
proof of work, creates one part of the
"immutability" properties that make blockchains so powerful
The data in the blocks are effectively sealed away 
from manipulation.

- Comparing the hashes allows the chain to check for fraud.
*/