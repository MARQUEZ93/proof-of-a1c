import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// HARD CODE THE FACTORY ADDRESS HERE
//TODO need to switch before production release
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0xb210DC30Fe9830968fc6E33576ce2Dc78c12CC53'
);

export default instance;
