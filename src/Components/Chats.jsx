import React from 'react';
import styled from 'styled-components';
import Welcom from './Welcom';
import ChatContainer from './ChatContainer';
import AddFriendPage from './AddFriendPage';

const Chats = ({ setIsPresent, contract, selectedChat, setselectedChat, currentUser, isPresent }) => {
  return (
    <Container>
      {selectedChat===undefined?(<Welcom />):isPresent?(<ChatContainer contract = {contract} currentUser = {currentUser}  selectedChat={selectedChat} setselectedChat={setselectedChat} />):(<AddFriendPage setIsPresent = {setIsPresent} contract = {contract} currentUser = {currentUser} selectedChat = {selectedChat} />)}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Chats;
