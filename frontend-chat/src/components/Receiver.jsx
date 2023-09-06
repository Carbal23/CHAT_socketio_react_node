import React from "react";

const Receiver = (msg) => {
  return (
    <div className="receptor">
      <p className="chat-receptor">{`${msg.msg.user.name}: ${msg.msg.msg}`}</p>
    </div>
  );
};

export default Receiver;
