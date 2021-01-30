pragma solidity ^0.7.0;
import "@nomiclabs/buidler/console.sol";

contract StoreFront {
    uint256 private currentId = 4;
    address
        public constant myAddress = 0x93d24FF767a74B1Ceec47F23495edC4195d3081A;
    struct shewToken {
        uint256 id;
        string name;
        uint256 value;
        uint256 size;
    }
    shewToken[] tokens;
    mapping(uint256 => address) public ownership;
    mapping(address => uint256) public balance;

    constructor() public {
        tokens.push(shewToken(0, "Nike React Element 55", 21, 185));
        tokens.push(shewToken(1, "Vans x Keith Haring Slip-On", 16, 100));
        tokens.push(shewToken(2, "Jordan 'Jubilee' Jordan 11", 28, 200));
        tokens.push(shewToken(3, "Adidas UltraBoost", 22, 150));

        for (uint256 i = 0; i < 4; i++) {
            ownership[i] = myAddress;
        }
    }

    function getNumberTokens() public view returns (uint256) {
        return tokens.length;
    }

    function getToken(uint256 _index)
        public
        view
        returns (
            string memory,
            uint256,
            uint256
        )
    {
        shewToken storage shew = tokens[_index];
        return (shew.name, shew.value, shew.size);
    }

    function tokenValue(uint256 _id) public view returns (uint256) {
        return tokens[_id].value;
    }

    function tokenOwnership(uint256 _id) public view returns (address) {
        return ownership[_id];
    }

    function createToken(
        string calldata _name,
        uint256 value,
        uint256 size
    ) public {
        console.log(_name);
        tokens.push(shewToken(currentId, _name, value, size));
        ownership[currentId] = msg.sender;
        currentId++;
    }

    function buyToken(uint256 _id) public payable {
        require(msg.value >= tokens[_id].value);
        balance[ownership[tokens[_id].id]] += msg.value;
        ownership[_id] = msg.sender;
    }

    function changeValue(uint256 _id, uint256 newValue) public {
        require(ownership[_id] == msg.sender);
        tokens[_id].value = newValue;
    }

    function myBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

    function withdraw() public {
        uint256 toSend = balance[msg.sender];
        balance[msg.sender] = 0;
        msg.sender.transfer(balance[msg.sender]);
    }
}
