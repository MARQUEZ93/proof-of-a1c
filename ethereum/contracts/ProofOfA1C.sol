pragma solidity ^0.8.7;

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;

    function createProofOfA1C() public {
        // require(!diabetics[msg.sender]);
        ProofOfA1C newProofOfA1C = new ProofOfA1C(msg.sender);
        deployedContracts.push(address(newProofOfA1C));
        diabetics[msg.sender] = true;
    }

    function getDeployedContracts() public view returns (address[] memory) { 
        return deployedContracts;
    }
}

contract ProofOfA1C {
    address public diabetic;
    uint public amountRewarded;
    uint public lastProofOfA1C;

    constructor(address creator) {
        diabetic = creator;
    }
}
