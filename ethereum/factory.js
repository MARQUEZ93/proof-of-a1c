import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';
import { factoryAddress } from './factoryAddress';

// TODO need to switch before production release
const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  factoryAddress
);

export default instance;
