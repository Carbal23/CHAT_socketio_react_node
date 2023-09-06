import React from "react";
import Link from "next/link";

const NavBar = ({ title }) => {
  
  return (
    <nav>
      {title === "Chats" && <Link className="back" href="/">Volver</Link>}

      <h1>{title}</h1>
    </nav>
  );
};

export default NavBar;
