// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;

    address public owner;
    string public endpoint; 

    constructor(string memory url) {
        owner = msg.sender;
        endpoint = url; 
    }
    function createProofOfA1C() public {
        require(!diabetics[msg.sender]);
        ProofOfA1C newProofOfA1C = new ProofOfA1C(msg.sender, owner, endpoint);
        deployedContracts.push(address(newProofOfA1C));
        diabetics[msg.sender] = true;
    }
    function getDeployedContracts() public view returns (address[] memory) { 
        return deployedContracts;
    }
    function destroyContract(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);
    }
}
contract ProofOfA1C is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address public diabetic;
    address public owner;

    uint256 public a1c;
    uint256 public timeRange;

    string public endpoint; 

    uint256 public amountRewarded;
    uint256 public totalDonations;

    // atm, only allow POA1C site to withdraw link & run interactions b/w 

    constructor(address creator, address factory, string memory url) {
        diabetic = creator;
        owner = factory;
        endpoint = url; 
        setPublicChainlinkToken();
    }
    // function appendFourStrings(string memory a, string memory b, string memory c, string memory d) internal pure returns (string memory) {
    //     return string(abi.encodePacked(a, b, c, d));
    // }
    // function requestProofOfA1C(address _oracle, bytes32 _jobId, uint256 _payment, string dateString) public returns (bytes32 requestId) {
    //     // TODO require endDateTimestamp is more than 3 months older than last time query got run
    //     string userAddress = abi.encodePacked(diabetic);
    //     Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
    //     string endpoint = appendFourStrings(url, userAddress, "/", dateString);
    //     request.add("get", endpoint);
    //     timeRange = dateString;

    //     request.add("path", "data.value");
        
    //     // Multiply the result by 1000000000000000000 to remove decimals
    //     int timesAmount = 10**18;
    //     //TODO confirm this is 0.1
    //     request.addInt("times", timesAmount);
        
    //     // Sends the request
    //     return sendChainlinkRequestTo(_oracle, request, _payment);
    // }
    // function fulfill(bytes32 _requestId, uint256 _mean) public recordChainlinkFulfillment(_requestId) {
    //     a1c = _mean;
    //     if (a1c < 7){
    //         // divide contract amount by 4
    //         // rewardDiabetic(amount here);
    //     }
    // }
    // function getSlice(uint256 begin, uint256 end, string memory text) public pure returns (string memory) {
    //     bytes memory a = new bytes(end-begin+1);
    //     for(uint i=0;i<=end-begin;i++){
    //         a[i] = bytes(text)[i+begin-1];
    //     }
    //     return string(a);    
    // }
    
    modifier onlyOwners() {
        require(msg.sender == owner || msg.sender == diabetic);
        _;
    }
    function destroyContract(address payable _to) public onlyOwners{
        selfdestruct(_to);
    }
    function withdrawAllMoney(address payable _to) public onlyOwners{
        _to.transfer(address(this).balance);
    }
  
}


