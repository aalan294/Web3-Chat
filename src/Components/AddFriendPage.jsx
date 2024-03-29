import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import json from '../ChatApp.json'
import { useNavigate } from 'react-router-dom'

const AddFriendPage = ({ setIsPresent ,currentUser, selectedChat, contract}) => {

    const navigate = useNavigate()

    const addFriends = async()=>{
        try {
            const web3 = new Web3(window.ethereum)
            const contractInstance = new web3.eth.Contract(json.abi,contract)
            await contractInstance.methods.addFreinids(selectedChat.accountAddress, selectedChat.name).send({from: currentUser})
            alert("successfully added to the friends List")
            setIsPresent(true)
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <Container>
        <button onClick={()=>addFriends()} class="cta-btn add-friend-btn">Add Friend</button>
        <p className="add-friend-text">To chat with someone, you need to add them as a friend first.</p>
    </Container>
  )
}

const Container = styled.div`
    text-align: center;
    padding: 50px 0;
    background-color: #222;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    width: 70%;
    .cta-btn {
        background-color: #f7931a;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        margin-bottom: 20px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            background-color: #e08500;
        }
    }
    .add-friend-text {
      font-size: 18px;
      color: #fff;
      margin: 0;
      margin-top: 50px;
    }
    `

export default AddFriendPage