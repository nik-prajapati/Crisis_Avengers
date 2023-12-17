import React, { useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import ChatList from "../../components/Chat/ChatList";

const Chat = ({ email }) => {
  const [chat, setChat] = useState({});
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  console.log(email);

  return (
    <div>
      <ChatList
        setChat={setChat}
        setMessages={setMessages}
        chats={chats}
        setChats={setChats}
        email={email}
      />
      <ChatBox
        chat={chat}
        messages={messages}
        setMessages={setMessages}
        email={email}
      />
    </div>
  );
};

export default Chat;
