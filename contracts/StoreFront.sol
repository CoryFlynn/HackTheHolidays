pragma solidity ^0.7.0;

contract StoreFront {
    uint256 private currentId = 0;
    struct shewToken {
        uint256 id;
        string name;
        uint256 value;
        uint256 size;
        address owner;
    }
    shewToken[] tokens;
    mapping(uint256 => address) public ownership;
    mapping(address => uint256) public balance;

    function tokenValue(uint256 _id) public view returns (uint256) {
        return tokens[_id].value;
    }

    function tokenOwnership(uint256 _id) public view returns (address) {
        return ownership[_id];
    }

    function createToken(
        string memory _name,
        uint256 value,
        uint256 size
    ) public {
        tokens.push(shewToken(currentId, _name, value, size, msg.sender));
        ownership[currentId] = msg.sender;
        currentId++;
    }

    function buyToken(uint256 _id) public payable {
        require(msg.value >= tokens[_id].value);
        balance[tokens[_id].owner] += msg.value;
        tokens[_id].owner = msg.sender;
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
