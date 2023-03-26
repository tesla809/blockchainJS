const Blockchain = require('./Blockchain');
const Block = require('./Block');
const { expect } = require('chai');

describe('Blockchain', function() {
  let ethereum; 
  beforeEach('Create a new blockchain instance', function() {
    // runs before each test
    ethereum = new Blockchain();

    ethereum.addBlock([1,2,3], '0');
    ethereum.addBlock([4,5,6], 'af21239d');
    ethereum.addBlock([7,8,9], 'f1232a23');
  });

  it('should create a genesis block', function() {
    expect(ethereum.getGenesisBlock().hash).to.equal(0);
  });

  it('should create a new transaction and add to the mempool', function() {
    const newTransaction = ethereum.createTransaction(100, 10, 'Alice', 'Bob');
    const firstTransaction = ethereum.pendingTransactionsQueue[0];

    expect(firstTransaction).to.equal(newTransaction);
  });

  it('should create add new blocks', function() {
    ethereum.addBlock([10,11,12], 'f1232a23');
    ethereum.addBlock([13,14,15], 'ca21239d');
    ethereum.addBlock([16,17,18], 'ef323d13');

    expect(ethereum.chain).to.have.lengthOf(7); // 1 extra due to genesis block
  });
  
  it('should get the last block on the blockchain', function() {
    ethereum.addBlock([19,20,21], 'cab20b4e');

    const latestBlock = ethereum.getLastBlock();
    // comparing identical object arrays returns false, so requires string comparison
    const latestBlockTransactions = latestBlock.transactions.toString();
    const valueToConfirm = [19, 20, 21].toString();

    expect(latestBlockTransactions).to.have.equal(valueToConfirm);
  });

  it('should generate proof of work', function() {
    const block = ethereum.getLastBlock();
    block.timeStamp = '1679517559'; // override time to assure we can test hashing consistently
    ethereum.proofOfWorkTarget = 1; // set target to assure we can test correclty

    const { hash, nonce } = ethereum.generateProofOfWork(block);

    expect(hash).to.have.equal('0605ff9b41624664b7e20799d4d600f05cd52f97c8338759fd228c831579096f');
    expect(nonce).to.have.equal(22);
  });
  
});

describe('Block', function() {
  let block;

  beforeEach('Create a new block instance',function() {
    // runs before each test
    block = new Block(['hello world'], 'ffffff');
    block.timeStamp = '1679517559'; // override time to assure we can test hashing consistently
  });

  it('should generate a hash', function() {
    const blockHash = block.generateHash(0);

    expect(blockHash).to.be.equal('5ce0d2ba32f796369bb2f70f35f8556903d6f153d1c2ec72ab0a77461128e54a');
  });

  it('should generate a hash in hexadecimal form', function() {
    const blockHash = block.generateHash(0);
    const isHex = /^[0-9a-f]+$/i.test(blockHash)? true : false;

    expect(isHex).to.be.equal(true);
  });
});

// console.log(blockHash);
// console.log(typeof blockHash);

/*
Use mocha and chia for testing
*/