import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ProofOfA1CFactory.interface),
  process.env.FACTORY
);

export default instance;
