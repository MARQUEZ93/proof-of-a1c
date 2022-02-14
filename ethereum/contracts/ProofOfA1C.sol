// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ProofOfA1CFactory {

    address[] public deployedContracts;
    mapping(address => bool) public diabetics;

    address public owner;
    string public endpoint; 
    address public notset;

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
    uint256 public lastProofOfA1C;

    string public endpoint; 

    uint256 public amountRewarded;
    uint256 public totalDonations;

    // atm, only allow POA1C site to withdraw link & run interactions b/w 

    constructor(address deployer, address factory, string memory url) {
        diabetic = deployer;
        owner = factory;
        endpoint = url; 
        setPublicChainlinkToken();
    }
    function appendFourStrings(string memory a, string memory b, string memory c, string memory d) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c, d));
    }
    function requestProofOfA1C(address _oracle, bytes32 _jobId, uint256 _payment, string memory dateString) public returns (bytes32 requestId) {
        // TODO require lastProofOfA1C is at least 3 months older than sliced dateString
        string memory userAddress = toAsciiString(diabetic);
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
        string memory url = appendFourStrings(endpoint, userAddress, "/", dateString);
        request.add("get", url);
        // TODO require dateString is 3 months older than lastProofOfA1C
        // lastProofOfA1C = getSlice(19, dateString);

        request.add("path", "data.value");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        //TODO confirm this is 0.1
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(_oracle, request, _payment);
    }
    function fulfill(bytes32 _requestId, uint256 _mean) public recordChainlinkFulfillment(_requestId) {
        a1c = _mean;
        lastProofOfA1C = block.timestamp; 
        // if (a1c < 7){
            //TODO if a1c below 7 then reqard diabetic
            //TODO ensure each function has proper protections like nonretretrant or private etc etc
            // divide contract amount by 4
            // rewardDiabetic(amount here);
        // }
    }
    // function getSlice(uint256 begin, uint256 end, string memory text) public pure returns (string memory) {
    //     bytes memory a = new bytes(end-begin+1);
    //     for(uint i=0;i<=end-begin;i++){
    //         a[i] = bytes(text)[i+begin-1];
    //     }
    //     return string(a);    
    // }
    modifier onlyDiabetic() {
        require(msg.sender == diabetic);
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier onlyContract() {
        require(msg.sender == address(this));
        _;
    }
    function destroyContract(address payable _to) public onlyOwner{
        selfdestruct(_to);
    }
    function toAsciiString(address x) internal pure returns (string memory) {
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
    // TODO test this ???
    receive() external payable {}
    // TODO figure out if i need this ??
    fallback() external payable {}
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // public function to return total of donations
    function getTotalDonations() view public returns(uint) {
        return totalDonations;
    }
    // ensure the contract (this???) can call this function 
    function rewardDiabetic() public payable onlyOwner onlyContract{
        (bool sent, bytes memory data) = diabetic.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        totalDonations+=msg.value;
    }
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }
    function withdraw(address payable _to) public payable onlyOwner{
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Link");
    }
}


