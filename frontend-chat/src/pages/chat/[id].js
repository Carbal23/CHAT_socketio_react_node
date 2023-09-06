import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import Chat from "@/components/chat";
import Sender from "@/components/Sender";
import Receiver from "@/components/Receiver";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  forceNew: true,
});

const chat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState("");
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // if (chats.length > 0) {
  //   const usersChat = chats[0];
  //   const users = usersChat.users;
  //   const filteredUser = users.filter(user=> user._id === id);
  //   var user = filteredUser[0]
  // }
  
  socket.on("messageList", (data) => {
    setMessages(data);
  });

  socket.on("message", (data) => {
    console.log(data);
    setMessages((newMessages) => [...newMessages, data]);
  });

  // return () => {
  socket.off("message"); // Desconectar el evento cuando el componente se desmonte
  // };

  useEffect(() => {
    if (id) {
      try {
        const getChats = async () => {
          const peticion = await fetch(`http://localhost:4000/chat/${id}`);
          const resultado = await peticion.json();
          setChats(resultado.body);
        };
        getChats();
      } catch (error) {
        console.error("Hubo un error", error);
      }
    }

  }, [id]);

  const getMessages = async (id) => {
    const peticion = await fetch(`http://localhost:4000/message/?chat=${id}`);
    const resultado = await peticion.json();
    // setMessages(resultado.body);
    setChatId(id);
  };

  const handleOnclickChat = (id) => {
    getMessages(id);
  };

  const handleOnchange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      chat: chatId,
      user: id,
      msg: inputValue,
    };

    try {
      await fetch(`http://localhost:4000/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error(
        "Hubo un error al enviar el msg, intentelo nuevamente",
        error
      );
    }
    getMessages(chatId);
    setInputValue("");
  };

  return (
    <>
      <NavBar title="Chats"  />
      <div className="bigContainer">
        <div className="chatContainer">
          <ul className="chatList">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className="chats"
                onClick={() => {
                  handleOnclickChat(chat._id);
                }}
              >
                <h3>Integrantes del chat:</h3>
                <Chat chat={chat} />
              </div>
            ))}
          </ul>

          <button className="addChatButton">Crear chat</button>
        </div>
        <div className="msgContainer">
          <div className="contenedor">
            <div className="msgZone">
              {messages.map((msg) =>
                msg.user._id === id ? (
                  <Sender key={msg._id} msg={msg} />
                ) : (
                  <Receiver key={msg._id} msg={msg} />
                )
              )}
            </div>
            <form className="text-send" onSubmit={handleOnsubmit}>
              <input
                type="text"
                id="chat"
                onChange={handleOnchange}
                name="msg"
                value={inputValue}
              />
              <button type="submit" id="send">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default chat;
