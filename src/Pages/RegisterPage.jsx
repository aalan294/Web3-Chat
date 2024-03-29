import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import json from '../ChatApp.json';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';

const RegisterPage = ({ contract, user }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('web3-chat')) {
      navigate('/chat');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    setLoader(true)
    e.preventDefault();
    try {
        console.log(user)
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(json.abi, contract);
      await contractInstance.methods.createAccount(name).send({ from: user });
      localStorage.setItem('web3-chat', JSON.stringify({ address: user }));
      setLoader(false)
      alert('Account Registered Successfully!!');
      navigate('/chat');
    } catch (error) {
      setLoader(false)
      if (error.code === 4001) {
        alert('Transaction denied Successfully');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      {loader?(<Loader/>):(
        <div className="container">
          <h1>Register Your Account</h1>
          <p>Enter your username to get Registered.</p>
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="wallet-address"
              placeholder="Enter your userName"
              required
            />
            <button className="cta-btn" type="submit">
              Register
            </button>
          </form>
          <div className="info-text">
            <p>
              By registering, you agree to our <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
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
    .info-text {
      font-size: 14px;
      color: #666;
      margin-top: 30px;
      a {
        color: #f7931a;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .register-form {
      display: flex;
      flex-direction: column;
      input {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 10px;
        font-size: 16px;
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
  }
`;

export default RegisterPage;
