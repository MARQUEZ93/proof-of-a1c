import crypto from 'crypto';
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledProofOfA1C = require('../ethereum/build/ProofOfA1C.json');

export const utilsService = {
    encryptTokens,
    decryptToken,
    sendChain,
    requestProofOfA1C,
    sendEth,
    connectWallet
};
async function encryptTokens ({access_token, refresh_token}) {
    const { algorithm, secretKey, iv } = getCipherArguments();

    const accessCipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const accessEncrypted = Buffer.concat([accessCipher.update(access_token), accessCipher.final()]);

    const refreshCipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const refreshEncrypted = Buffer.concat([refreshCipher.update(refresh_token), refreshCipher.final()]);

    const accessToken = {
        iv: iv.toString('hex'),
        content: accessEncrypted.toString('hex')
    };
    const refreshToken = {
        iv: iv.toString('hex'),
        content: refreshEncrypted.toString('hex')
    };
    return {accessToken, refreshToken};
};
async function decryptToken(content, iv){
    const { algorithm, secretKey } = getCipherArguments();
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
};

function getCipherArguments(){
    const algorithm = 'aes-256-ctr';
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);
    return {algorithm, secretKey, iv};
}

async function getContract(address, web3){
  return new web3.eth.Contract(
    compiledProofOfA1C["abi"], address
  );
}

async function requestProofOfA1C(address, lastA1C, web3){
  const proof_of_a1c = await getContract(address, web3);

  const accounts = await web3.eth.getAccounts();

  const result = await proof_of_a1c.methods.requestProofOfA1C(lastA1C).send
    ({ from: accounts[0], gas: '1000000' });

}

async function sendEth(contractAddress, web3){
  const proof_of_a1c = await getContract(contractAddress, web3);

  const accounts = await web3.eth.getAccounts();

  await web3.eth.sendTransaction({ from:accounts[0], to: contractAddress, 
    value: web3.utils.toWei("0.001", "ether")});
}
async function connectWallet(){
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: process.env.PAYER_PHRASE
    },
    providerOrUrl: process.env.INFURA
  });
    
  const web3 = await new Web3(provider);
  return { web3 };
}


async function sendChain(toAddress, web3){
  // rinkeby
  // https://docs.chain.link/docs/link-token-contracts/#ethereum
  let tokenAddress = process.env.LINK;
  // Use BigNumber
  // critical: this corresponds to a 0.01 CHAINLINK fee
  let decimals = web3.utils.toBN(16);
  // LINK Fee for operator
  let amount = web3.utils.toBN(1);
  let minABI = [
    // transfer
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
  ];
  // this corresponds to a 0.01 CHAINLINK fee
  let value = amount.mul(web3.utils.toBN(10).pow(decimals));
  const accounts = await web3.eth.getAccounts();
  let chainContract = await new web3.eth.Contract(minABI, tokenAddress);
  const result = await chainContract.methods.transfer(toAddress, value).
    send({
          from: accounts[0]
    });
}