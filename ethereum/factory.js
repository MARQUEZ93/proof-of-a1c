import web3 from './web3';
import ProofOfA1CFactory from './build/ProofOfA1CFactory.json';

const instance = new web3.eth.Contract(
  ProofOfA1CFactory["abi"],
  "0xb218baD2AA889A6a4b2fcCd0D930066196FDb680"
);

export default instance;
