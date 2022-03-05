import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// HARD CODE THE FACTORY ADDRESS HERE
//TODO need to switch before production release
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x85bE976b5bF502862Be18fa4b5e98865803c8e0e'
);

export default instance;
