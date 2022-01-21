import web3 from './web3';
import ProofOfA1C from './build/ProofOfA1C.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(ProofOfA1C.interface), address);
};
