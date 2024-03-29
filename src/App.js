import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import EnableMetamask from './Pages/EnableMetamask'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import ChatPage from './Pages/ChatPage'


const App = () => {
  
  const [user, setUser] = useState('undefined')
  const [contract, setContract] = useState("0x6EA44240Ff8c50426f6f1cF7828b84655E790dD8")
  // const [contract, setContract] = useState("0xC4c3134245b938252c9c4678e1A0960952931320")

  return (
    <Router>
      <Routes>
        <Route path = '/' element={<EnableMetamask setUser = {setUser} contract = {contract}/>}/>
        <Route path= '/register' element={<RegisterPage user = {user} contract= {contract}/>}/>
        <Route path = '/login' element= {<LoginPage/>}/>
        <Route path ='/chat' element = {<ChatPage contract = {contract}/>}/>
      </Routes>
    </Router>
  )
}

export default App