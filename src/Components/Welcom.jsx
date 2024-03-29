import React from 'react'
import styled from 'styled-components'
import logo from '../Assets/logo.jpeg'

const Welcom = () => {
  return (
    <Container>
      <div className="logo">
        <img src = {logo} alt="logo" />
      </div>
      <h4>Select a Chat To Start Messaging!!!</h4>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  h4{
    color: orange;
  }
`;

export default Welcom