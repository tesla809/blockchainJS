const Blockchain = require('./Blockchain');
const Block = require('./Block');
const { expect } = require('chai');

describe('Blockchain', function() {
  let ethereum; 
  beforeEach('Create a new blockchain instance', function() {
    // runs before each test
    ethereum = new Blockchain();

    ethereum.addBlock([1,2,3], 'af21239d', 'ff2019dw');
    ethereum.addBlock([4,5,6], 'f1232a23', 'cab12313');
    ethereum.addBlock([7,8,9], '029318ab3', '99123bda');
  });

  it('should create a genesis block', function() {
    expect(ethereum.chain[0].hash).to.equal(0);
  });

  it('should create add new blocks', function() {
    ethereum.addBlock([10,11,12], 'fa21239d', 'e1fsdf21');
    ethereum.addBlock([13,14,15], 'af323d13', 'c2123da2');
    ethereum.addBlock([16,17,18], 'e240d032', 'f1230af1');

    expect(ethereum.chain).to.have.lengthOf(7); // 1 extra due to genesis block
  });

  it('should get the last block on the blockchain', function() {
    ethereum.addBlock([19,20,21], 'aba301ab', 'cab20b4e');

    const latestBlock = ethereum.getLastBlock();
    // comparing identical object arrays returns false, so requires string comparison
    const latestBlockTransactions = latestBlock.transactions.toString();
    const valueToConfirm = [19, 20, 21].toString();

    expect(latestBlockTransactions).to.have.equal(valueToConfirm);
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
    const blockHash = block.generateHash();

    expect(blockHash).to.be.equal('5ce0d2ba32f796369bb2f70f35f8556903d6f153d1c2ec72ab0a77461128e54a');
  });

  it('should generate a hash in hexadecimal form', function() {
    const blockHash = block.generateHash();
    const isHex = /^[0-9a-f]+$/i.test(blockHash)? true : false;

    expect(isHex).to.be.equal(true);
  });
});





// console.log(blockHash);
// console.log(typeof blockHash);

/*
Use mocha and chia for testing
*/