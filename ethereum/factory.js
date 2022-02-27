import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// HARD CODE THE FACTORY ADDRESS HERE
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x0d70d9ad7797BF869587FB3cCAff4bD41939aa5A'
);

export default instance;
