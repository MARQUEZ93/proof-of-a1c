import crypto from 'crypto';
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

export const utilsService = {
    encryptTokens,
    decryptToken
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

async function getContract(address){

  const { provider, web3 } = connectWallet();

  return await new web3.eth.Contract(
    address
  );
}

async function requestProofOfA1C(address, lastA1C){
  const proof_of_a1c = getContract(address);

  const result = await proof_of_a1c.methods.requestProofOfA1C(lastA1C).send
    ({ gas: '1000000', from: process.env.PAYER });

  console.log('Requested proof of a1c', result.options.address);

}

async function rewardDiabetic(address) {

  const proof_of_a1c = getContract(address);

  const result = await proof_of_a1c.methods.rewardDiabetic().send
    ({ gas: '1000000', from: process.env.PAYER });

  console.log('Diabetic rewarded if eGV below 154', result.options.address);
}

async function connectWallet(){
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: process.env.PAYER_PHRASE
    },
    providerOrUrl: process.env.INFURA
  });
    
  const web3 = await new Web3(provider);
  return { web3, provider };
}


async function sendChain(toAddress){
  const { provider, web3 } = connectWallet();

  // kovan
  let tokenAddress = process.env.LINK;
  let fromAddress = process.env.PAYER;
  
  // Use BigNumber
  let decimals = web3.utils.toBN(18);
  let amount = web3.utils.toBN(0.1);
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
          "name": "",
          "type": "bool"
        }
      ],
      "type": "function"
    }
  ];
  // Get ERC20 Token contract instance
  let contract = new web3.eth.Contract(minABI, tokenAddress);
  // calculate ERC20 token amount
  let value = amount.mul(web3.utils.toBN(10).pow(decimals));
  // call transfer function
  const result = contract.methods.transfer(toAddress, value).send({from: fromAddress})
  .on('transactionHash', function(hash){
    console.log(hash);
  });
  console.log('Sent LINK: ', result.options.address);
}