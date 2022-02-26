// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;

    address public provider;
    string public endpoint; 

    constructor(string memory url) {
        provider = msg.sender;
        endpoint = url; 
    }
    function createProofOfA1C() public {
        require(!diabetics[msg.sender]);
        ProofOfA1C newProofOfA1C = new ProofOfA1C(provider, msg.sender, endpoint);
        deployedContracts.push(address(newProofOfA1C));
        diabetics[msg.sender] = true;
    }
    function getDeployedContracts() public view returns (address[] memory) { 
        return deployedContracts;
    }
    function destroyContract(address payable _to) public {
        require(msg.sender == provider, "You are not the owner");
        selfdestruct(_to);
    }
}

contract ProofOfA1C is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address public diabetic;
    address public payer;

    uint256 public a1c;
    uint256 public lastFulfill;
    string public lastTimeRange;

    string public api; 

    uint256 public totalRewarded;

    constructor(address factory, address deployer, string memory endpointUrl) {
        setPublicChainlinkToken();
        payer = factory;
        diabetic = deployer;
        api = endpointUrl;
    }
    function concatenate(string memory a,string memory b, string memory c, string memory d) public pure returns (string memory){
        return string(bytes.concat(bytes(a), bytes(b), bytes(c), bytes(d)));
    }
    function addressToString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    
    }
    function requestProofOfA1C(string memory timeRange) public onlyPayer returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest("d5270d1c311941d0b08bead21fea7747", address(this), this.fulfill.selector);
        string memory getUrl = concatenate(api, addressToString(address(this)), "/", timeRange);
        request.add("get", getUrl);
        request.add("path", "data.value");

        lastTimeRange = timeRange;
        
        return sendChainlinkRequestTo(0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8, request, 0.1 * 10 ** 18);
    }
    function fulfill(bytes32 _requestId, uint256 _value) public recordChainlinkFulfillment(_requestId) {
        a1c = _value;
        lastFulfill = block.timestamp;
    }
    modifier onlyPayer() {
        require(msg.sender == payer);
        _;
    }

    function destroyContract(address payable _to) public onlyPayer{
        selfdestruct(_to);
    }
    receive() external payable {}
    fallback() external payable {}
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    function withdrawLink(address payable _to) public onlyPayer {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(_to, link.balanceOf(address(this))), "Unable to transfer");
    }
    function rewardDiabetic(address payable _to) public payable onlyPayer {
        require(a1c < 154);
        totalRewarded+=getBalance();
        (bool sent, bytes memory data) = _to.call{value: getBalance()}("");
        require(sent, "Failed to send Ether");
    }
}