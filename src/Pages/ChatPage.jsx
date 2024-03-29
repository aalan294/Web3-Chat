import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Chats from '../Components/Chats'
import Users from '../Components/Users'
import { useNavigate } from 'react-router-dom'

const ChatPage = ({contract}) => {

    const [currentUser, setCurrentUser] = useState(undefined)
    const [selectedChat, setSelectedChat] = useState(undefined)
    const [isPresent, setIsPresent] = useState(false)
    const navigate = useNavigate()

  //   useEffect(()=>{
  //     console.log(selectedChat)
  // },[selectedChat])

    useEffect(()=>{
        if(!localStorage.getItem('web3-chat')){
          navigate('/')
        }
        else{
          setCurrentUser(JSON.parse(localStorage.getItem('web3-chat')).address)
        }
      },[])
  return (
    <ChatContainer>
      <div className="container">
        <div className="users">
          <Users currentUser = {currentUser} contract = {contract} setSelectedChat = {setSelectedChat} selectedChat= {selectedChat} setIsPresent={setIsPresent} />
        </div>
        <div className="chats" >
          <Chats contract = {contract} currentUser = {currentUser} setSelectedChat = {setSelectedChat} selectedChat = {selectedChat} isPresent ={isPresent} setIsPresent={setIsPresent} />
        </div>
      </div>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1c1c;
    .container{
      width:90%;
      height: 90%;
      overflow: hidden;
      border: 1px solid orange;
      display: grid;
      grid-template-columns: 30% 70%;
      .chats{
        height:100%;
        width:100%;
      }
      .users{
        height: 100%;
        width: 100%;
      }
    }
`

export default ChatPage