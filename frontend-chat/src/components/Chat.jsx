import React from "react";

const Chat = ({ chat }) => {
  const users = chat.users;

  return (
    <li className="chat">
      {users.map((user) => (
        <p key={user._id}>{user.name}</p>
      ))}
    </li>
  );
};

export default Chat;
