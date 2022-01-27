import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// factory contract address below

const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x0d70d9ad7797BF869587FB3cCAff4bD41939aa5A'
);

// FACTORY ADDRESS ^ WILL NEED 2 CHANGE

export default instance;
