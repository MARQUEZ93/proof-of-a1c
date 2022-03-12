import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// HARD CODE THE FACTORY ADDRESS HERE
//TODO need to switch before production release
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x8e252162eDeCA79a67527aDfD976B45c3D86D969'
);

export default instance;
