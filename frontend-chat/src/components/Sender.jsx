import React, { useEffect, useState } from "react";


const Sender = (msg) => {
 
  return (
    <div className="emisor">
      <p className="chat-emisor">{`${msg.msg.user.name}: ${msg.msg.msg}`}</p>
    </div>
  );
};

export default Sender;
