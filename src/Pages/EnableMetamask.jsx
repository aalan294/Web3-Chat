import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import json from '../ChatApp.json'
import Loader from '../Components/Loader/Loader'

const EnableMetamask = ({setUser, contract}) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const handleEnableButton = async()=>{
        setLoader(true)
        if(typeof window.ethereum != undefined){
            try {
                let accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                setUser(accounts[0])
                const web3 = new Web3(window.ethereum)
                const Instance = new web3.eth.Contract(json.abi, contract)
                const userExist = await Instance.methods.checkUserExists(accounts[0]).call()
                if(userExist){
                    localStorage.setItem('web3-chat', JSON.stringify({ address: accounts[0] }))
                    setLoader(false)
                    navigate('/chat')
                }
                else{
                    localStorage.removeItem('web3-chat')
                    setLoader(false)
                    navigate('/register')
                }
            } catch (error) {
                setLoader(false)
                if(error.code == 4001){
                    alert("Enabling Metamask is REQUIRED")
                }
                else{
                    alert("Check whether you have installed METAMASK or may have NETWORK issuse ")
                }
            }
        }
        else{
            setLoader(false)
            alert("Please Install Metamask to use this Application")
        }
    }
  return (
    <Container>
        {loader?(
            <Loader/>
        ):(
            <div className="container">
               <h1>Welcome to my Web3 Chat Application!</h1>
                <p>Please enable MetaMask to use this application.</p>
                <button onClick={handleEnableButton} id="enable-metamask-btn" className="cta-btn">Enable MetaMask</button>
            </div>
        )}
    </Container>
  )
}

const Container = styled.div`
    background-color: #f5f5f5;
    width: 100vw;
    height: 100vh;
    .container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: 50px;
    h1 {
        font-size: 36px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
       }
       p {
        font-size: 18px;
        color: #666;
        margin-bottom: 30px;
       }
    .cta-btn {
        background-color: #f7931a;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        text-transform: uppercase;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #e08500;
           }
       }
   }
   `

export default EnableMetamask