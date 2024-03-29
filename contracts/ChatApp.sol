// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChatApp{
    struct user{
        string name;
        friend[] friendList;
    }
    struct allUsers{
        string name;
        address accountAddress;
    }
    struct friend{
        address pubkey;
        string name;
    }
    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    allUsers[] getAllUsers;
    mapping (address => user) userList;
    mapping(bytes32 => message[]) allMessage;

    //EVENTS TO BE EMITTED

    event userCreated(address indexed userAddress, string username);
    event messageSent(address indexed from, address indexed to);

    //GET ALL USERS
    function getAllAppUsers()external view returns(allUsers[] memory){
        return getAllUsers;
    }

    //CHECK USER EXISTS
    function checkUserExists(address pubkey)public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }
    //CREATE ACCOUNT
    function createAccount(string calldata name)external{
        require(checkUserExists(msg.sender)== false,"user already exisits");
        require(bytes(name).length>0,"username cannot be empty");
        userList[msg.sender].name = name;
        getAllUsers.push(allUsers({
            name:name,
            accountAddress: msg.sender
        }));
        emit userCreated(msg.sender, name);
    }
    //GET USERNAME
    function getUsername(address pubkey)external view returns(string memory){
        require(checkUserExists(pubkey),"user not registered");
        return userList[pubkey].name;
    }
    //ADD FRIEND
    function addFreinids(address _friend,string calldata name)external{
        require(checkUserExists(msg.sender),"create an account first to add friends");
        require(checkUserExists(_friend),"user doesn't exists");
        require(msg.sender!=_friend,"you cannot be frind with yourself");
        require(checkAlreadyFriends(msg.sender,_friend)==false,"you both are already friends");
        _addFriend(msg.sender,_friend,name);
        _addFriend(_friend,msg.sender,userList[msg.sender].name);
    }
    //CHECK ALREADY FRIENDS
    function checkAlreadyFriends(address pubkey1,address pubkey2)internal view returns(bool){
        if(userList[pubkey1].friendList.length>userList[pubkey2].friendList.length){
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2=temp;
        }
        for(uint i = 0;i<userList[pubkey1].friendList.length;i++){
            if(userList[pubkey1].friendList[i].pubkey==pubkey2)return true;
        }
        return false;
    }
    //INTERNAL ADD FRIEND
    function _addFriend(address me,address friend_key,string memory name)internal{
        userList[me].friendList.push(friend({
            pubkey:friend_key,
            name:name
        }));
    }
    //GET MY FRIENDS LIST
    function getMyFriendList()external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }
    //GET CHAT CODE
    function _getChatCode(address pubkey1,address pubkey2)internal pure returns(bytes32){
        if(pubkey1<pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));
        }
        else{
            return keccak256(abi.encodePacked(pubkey2,pubkey1));
        }
    }
    //SEND MESSAGE
    function sendMessage(address friend_key,string calldata _msg)external{
        require(checkUserExists(msg.sender),"create an account first");
        require(checkUserExists(friend_key),"user not found");
        require(checkAlreadyFriends(msg.sender,friend_key),"you both are not friends yet");
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        allMessage[chatCode].push(message({
            sender: msg.sender,
            timestamp: block.timestamp,
            msg:_msg
        }));
        emit messageSent(msg.sender,friend_key);
    }
    //READ MESSAGES
    function readMessage(address friend_key)external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessage[chatCode];
    }
}