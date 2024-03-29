import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import json from '../ChatApp.json'
import styled from 'styled-components'
import logo from '../Assets/logo.jpeg'

const Users = ({ currentUser, contract, setSelectedChat, selectedChat, setIsPresent}) => {

    const [users,setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [selected, setSelected] = useState(true)
    const [currentuser,setCurrentuser] = useState(undefined)
    const [search, setSearch] = useState('')
    const [filterFriend, setFilterFriend] = useState([])
    const [filterUser, setFilterUser] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const localStorageData = localStorage.getItem('web3-chat');
                const { address } = JSON.parse(localStorageData)
                setCurrentuser(address)
                const web3 = new Web3(window.ethereum)
                const contractInstance = new web3.eth.Contract(json.abi,contract)
                const response = await contractInstance.methods.getAllAppUsers().call()
                const result = response.filter(user => user.accountAddress.toLowerCase() != address.toLowerCase());
                const friendList = await contractInstance.methods.getMyFriendList().call({from: address})
                setUsers(result)
                setFilterUser(result)
                setFriends(friendList)
                setFilterFriend(friendList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const isUserIdPresent = (userId, array) => {
        return array.some(user => user.pubkey === userId)
      }

      const handleSearch =(e)=>{
        setSearch(e.target.value.toLowerCase())
        let userResult = users.filter(user =>
            user.name && user.name.toLowerCase().includes(e.target.value.toLowerCase()) || user.accountAddress && user.accountAddress.toLowerCase().includes(e.target.value.toLowerCase())
        );
        let friendResult = friends.filter(user =>
            user.name && user.name.toLowerCase().includes(e.target.value.toLowerCase()) || user.pubkey && user.pubkey.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterUser(userResult)
        setFilterFriend(friendResult)
      }

  return (
    <UserContainer>
        <h3> <img src={logo} alt="" /> Web3Chat</h3>
        <input type="text" placeholder='search users' value={search} onChange={(e)=>handleSearch(e)} />
        <nav>
            <p onClick={()=>setSelected(true)} className={`${selected?"selected":""}`} >Users</p>
            <p onClick={()=>setSelected(false)} className={`${selected?"":"selected"}`}>Friends</p>
        </nav>
        {
            selected?(
                <ul>
                    {
                        filterUser.map((user,index)=>(
                            <li key={index} 
                            onClick={async()=>{setIsPresent(false);await setSelectedChat({accountAddress: user.accountAddress, name : user.name});await setIsPresent(isUserIdPresent(user.accountAddress, friends))}}
                            className={`${selectedChat && selectedChat.accountAddress === user.accountAddress ? "select" : ""} ${selectedChat && selectedChat.accountAddress === currentuser ? "user" : ""}`}
                            >
                                <div className="info">
                                    <p>{user.name}</p>
                                    <p>{user.accountAddress}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            ):(
                <ul>
                    {
                        filterFriend.map((user,index)=>(
                            <li key={index} onClick={async()=>{setIsPresent(false);setSelectedChat({accountAddress: user.pubkey, name : user.name});await setIsPresent(isUserIdPresent(user.pubkey, friends))}}>
                                <div className="info">
                                    <p>{user.name}</p>
                                    <p>{user.pubkey}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    </UserContainer>
  )
}

const UserContainer = styled.div`

    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: orange;
    background-color: #272626;
    nav{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        p{
            color: white;
            cursor: pointer;
            padding: 5px 1rem;
        }
        .selected{
            color: orange;
            border-bottom: 1px solid orange;
        }
    }
    h3{
        display: flex;
        align-items:center;
        img{
            width:30px;
            height:30px;
            border-radius:50%;
        }
    }
    input{
        width: 80%;
        padding: 0.4rem;
        border: 1px solid orange;
        border-radius: 4px;
    }
    ul{
        height: 60vh;
        width: 85%;
        border: 1px solid orange;
        border-radius: 5px;
        overflow-x: hidden;
        overflow-y: scroll;
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: white;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .select{
            background-color: #444444;
        }
        li{
            margin: 0;
            margin-bottom: 7px;
            padding: 2px;
            width:95%;
            background-color: #000000;
            border-radius: 0.3rem;
            border: 1px solid white;
            display: flex;
            &:hover{
                background-color: #444444;
            }
            .info{
                padding: 2px;
                width: 100%;
                overflow: hidden;
                :nth-child(2){
                    color: white;
                    font-size: xx-small;
                }
                p{
                    font-size: small;
                    margin: 0;
                    padding: 0;
                }
            }
        }
        .user{
            border: 1px solid orange;
        }
    }
`;

export default Users