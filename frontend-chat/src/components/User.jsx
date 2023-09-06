import React from "react";
import Link from "next/link";

const User = ({ user }) => {
  return (
    <li className="user">
      <Link href="/chat/[id]" className="userLink" as={`/chat/${user._id}`}>
        <p> {user.name}</p>
      </Link>
    </li>
  );
};

export default User;
