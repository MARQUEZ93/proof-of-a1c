// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;

    address public owner;
    string public endpoint; 
    address public oracle;
    string public jobId; 
    uint256 public fee;

    constructor(address creator, string url, address oracleAddress, uint256 job, uint256 cost) {
        owner = creator;
        endpoint = site; 
        oracle = oracleAddress;
        jobId = job;
        fee = fee * 10 ** 17;
    }

    function createProofOfA1C() public {
        require(!diabetics[msg.sender]);
        ProofOfA1C newProofOfA1C = new ProofOfA1C(msg.sender, owner, endpoint, oracle, jobId, fee);
        deployedContracts.push(address(newProofOfA1C));
        diabetics[msg.sender] = true;
    }

    function getDeployedContracts() public view returns (address[] memory) { 
        return deployedContracts;
    }
    function destroyContract(address payable _to) public {
        require(msg.sender == diabetic, "You are not the owner");
        selfdestruct(_to);
    }
}

contract ProofOfA1C is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address public diabetic;
    address public owner;

    uint256 public a1c;
    uint256 public timeRange;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // atm, only allow POA1C site to withdraw link & run interactions b/w 

    constructor(address creator, address factoryCreator, address oracleAddress, string url, uint256 job, uint256 cost) {
        diabetic = creator;
        owner = factoryCreator;
        endpoint = url; 
        oracle = oracleAddress;
        jobId = job;
        fee = cost; 
        setPublicChainlinkToken();
    }
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId){
        a1c = _volume;
    }
    function appendFourStrings(string a, string b, string c, string d) internal pure returns (string) {
        return string(abi.encodePacked(a, b, c, d));
    }
    function requestProofOfA1C(string dateString) public returns (bytes32 requestId) onlyOwners {
        // TODO require endDateTimestamp is more than a month older than last time query got run
        userAddress = abi.encodePacked(diabetic);
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        endpoint = appendFourStrings(url, userAddress, "/", dateString);
        request.add("get", endpoint);
        timeRange = dateString;

        request.add("path", "data.value");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        //TODO confirm this is 0.1
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function fulfill(bytes32 _requestId, uint256 _mean) public recordChainlinkFulfillment(_requestId) {
        a1c = _mean;
        if (a1c < 7){
            // divide contract amount by 4
            rewardDiabetic(amount here);
        }
    }
    function getSlice(uint256 begin, uint256 end, string text) public pure returns (string) {
        bytes memory a = new bytes(end-begin+1);
        for(uint i=0;i<=end-begin;i++){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);    
    }
    function deposit() public payable {}
    function destroyContract(address payable _to) public onlyOwners{
        selfdestruct(_to);
    }
    function withdrawAllMoney(address payable _to) public onlyOwners{
        _to.transfer(address(this).balance);
    }
    // Function to transfer Ether from this contract to address from input
    function rewardDiabetic(uint _amount) public {
        require(a1c)
        // Note that "to" is declared as payable
        (bool success, ) = _diabetic.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
    // withdrawLink allows the owner to withdraw any extra LINK on the contract
  function withdrawLink()
    public
    onlyOwners
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }
  
  modifier onlyOwners() {
    require(msg.sender == owner || msg.sender == diabetic);
    _;
  }
  
}


