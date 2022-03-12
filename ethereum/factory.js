import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

// HARD CODE THE FACTORY ADDRESS HERE
//TODO need to switch before production release
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  '0x79807B9c286760E1028335Ad6E88ce6D3De105E8'
);

export default instance;
