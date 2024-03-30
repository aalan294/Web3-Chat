import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import json from '../ChatApp.json'
import styled from 'styled-components'
import Loader from './Loader/Loader'

const ChatContainer = ({selectedChat, setSelectedChat, currentUser, contract}) => {

  const [messages, setMessages] = useState([])
  const [newmsg,setNewmsg] = useState('')
  const [reload,setReload] = useState(false)
  const [loader, setLoader] = useState(true)
    useEffect(()=>{
        const fetchMessages = async()=>{
          try {
            const web3 = new Web3(window.ethereum)
            const contractInstance = new web3.eth.Contract(json.abi,contract)
            const response = await contractInstance.methods.readMessage(selectedChat.accountAddress).call({from : currentUser})
            setLoader(false)
            setMessages(response)
            contractInstance.events.messageSent({filter: {from : selectedChat.accountAddress, to: currentUser}}).on("data", (event)=>{
              setReload(!reload)
            })
          } catch (error) {
            setLoader(false)
            alert(error.message)
          }
        }
        fetchMessages()
    },[selectedChat,reload])

    const sendMessage = async(e)=>{
      e.preventDefault()
      try {
        setLoader(true)
        let msg = newmsg;
        setNewmsg('')
        const web3 = new Web3(window.ethereum)
        const contractInstance = new web3.eth.Contract(json.abi,contract)
        await contractInstance.methods.sendMessage(selectedChat.accountAddress,msg).send({from: currentUser})
        const timestamp = new Date().getTime();
        setMessages([...messages,{sender: currentUser, msg: msg, timestamp: timestamp + 'n' }])
        alert(`Message sent to ${selectedChat.name}`)
        setLoader(false)
      } catch (error) {
        setLoader(false)
        alert(error.message)
      }
    }

  return (
    <Container>
      <div className="header">
        <p>{selectedChat.name}</p>
        <p>{selectedChat.accountAddress}</p>
      </div>
      <div className="messages">
        {loader?(
          <Loader/>
        ):(
          <div className="chats">
              {messages.map((message,index)=>(
                  <div key={index} className={`message ${message.sender.toLowerCase() == currentUser.toLowerCase()?"sended":"recieved"}`}>
                      <p>{message.msg}</p>
                  </div>
              ))}
          </div>
        )}
      </div>
      <form className="send" onSubmit={sendMessage}>
              <input type="text" value={newmsg} onChange={(e)=>setNewmsg(e.target.value)} placeholder='type a message...' />
              <button type='submit'><svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header{
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    background-color: #161515;
    border: none;
    :nth-child(1){
      color: orange;
    }
    p{
      margin: 0;
      padding: 0;
      color: white;
    }
  }
  .messages{
    height: 70vh;
    width: 100%;
    overflow: hidden;
        .chats{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
        width: 100%;
        border: none;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            border: none;
            margin: 0 0.7rem;
            margin-top: 0.7rem;
            p{
                overflow-wrap: break-word;
                max-width: 40%;
                padding: 0.3rem 1rem;
                font-size: small;
                border-radius: 1rem;
                margin: 0;
            }
        }
        .sended{
            justify-content: flex-end;
            p{
                background-color: #2d2b2b;
                color: orange;
                border: 1px solid orange;
            }
            }
        .recieved{
            justify-content: flex-start;
            p{
                background-color: #2d2b2b;
                color: orange;
                border: 1px solid orange;
            }
        }
    }
  }
  .send{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 10vh;
    background-color: #161515;
    /* position: relative;
    bottom: 5rem; */
    input{
      width: 80%;
      padding: 0.4rem;
      background-color: inherit;
      border: none;
      outline: none;
      font-size: large;
      color: orange;
    }
    button{
      border: none;
      outline: none;
      background-color: inherit;
      cursor: pointer;
    }
  }
`

export default ChatContainer