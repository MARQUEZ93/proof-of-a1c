import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x0A1A988be431deB0E93760aB9Bf421B78704C56E'
);

// FACTORY ADDRESS ^ WILL NEED 2 CHANGE

export default instance;
