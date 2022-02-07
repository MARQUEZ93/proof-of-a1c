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
    uint public amountRewarded;
    uint public lastProofOfA1C;
    uint256 public volume;
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
    function destroySmartContract(address payable _to) public {
        require(msg.sender == diabetic, "You are not the owner");
        selfdestruct(_to);
    }
    function withdrawLink() external {

    }
}

        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}


