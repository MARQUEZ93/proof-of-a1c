pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;
    address public owner;
    address public oracle;
    string public jobId; 
    string public url; 
    uint256 public fee;

    constructor(address creator, string siteUrl, address oracleAddress, uint256 job, uint256 fee) {
        owner = creator;
        url = siteUrl; 
        jobId = "c637797f3e9a468489e88d5441a16a3e";
        oracle = "0xAE143B0f369Cf31eBcA724e473c9810A76aF80B5";
        fee = fee * 10 ** 18;
    }

    function createProofOfA1C() public {
        // require(!diabetics[msg.sender]);
        ProofOfA1C newProofOfA1C = new ProofOfA1C(msg.sender, owner, oracle, jobId, url);
        deployedContracts.push(address(newProofOfA1C));
        diabetics[msg.sender] = true;
    }

    function getDeployedContracts() public view returns (address[] memory) { 
        return deployedContracts;
    }
}

contract ProofOfA1C is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address public diabetic;
    address public owner;

    uint256 public amountRewarded;
    uint256 public latestProofOfA1C;
    uint256 public lastQuery;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // atm, only allow POA1C site to withdraw link & run interactions b/w 

    constructor(address diabetic, address siteOwner, address oracleAddress, uint256 job, uint256 fee) {
        diabetic = creator;
        owner = siteOwner;
        oracle = oracleAddress;
        jobId = job;
        setPublicChainlinkToken();
    }
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only site owner can call this function."
        );
        _;
    }
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }
    function destroySmartContract(address payable _to) public {
        require(msg.sender == diabetic, "You are not the owner");
        selfdestruct(_to);
    }
    function withdrawLink() external {

    }
    function appendThreeStrings(string a, string b, string c, string d, string e) internal pure returns (string) {
        return string(abi.encodePacked(a, b, c, d, e));
    }
    function requestProofOfA1C(string dateStringWithSlash, string endDateTimestamp) public returns (bytes32 requestId) 
    {
        // TODO require endDateTimestamp is more than a month older than last time query got run
        endDateTimestamp
        userAddress = abi.encodePacked(diabetic);
        Chainlink.Request memory request = 
        buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        endpoint = append(url, userAddress, dateStringWithSlash)
        request.add("get", endpoint);

        request.add("path", "RAW.DATA.VALUE");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**17;
        //TODO confirm this is 0.1
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        latestProofOfA1C = _volume;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}


