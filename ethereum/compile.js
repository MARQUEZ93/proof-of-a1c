const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const proofOfA1CPath = path.resolve(__dirname, 'contracts', 'ProofOfA1C.sol');
const source = fs.readFileSync(proofOfA1CPath, 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    'ProofOfA1C.sol' : {
      content: source
    }
  },
  settings: {
    outputSelection: {
        '*': {
            '*': [ '*' ]
        }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['ProofOfA1C.sol'];

const keys = Object.keys(output);

for (const key of keys) {
  fs.outputJsonSync(
    path.resolve(buildPath, key.replace(':', '') + '.json'),
    output[key]
  );
}