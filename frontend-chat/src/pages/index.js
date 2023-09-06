import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import User from "@/components/User";

export default function Home() {
  const [users, setUser] = useState([]) 
  useEffect(() => {
    const getUsers = async () => {
      try {
        const peticion = await fetch("http://localhost:4000/user");
        const resultado = await peticion.json();
        setUser(resultado.body);

      } catch (error) {
        console.error("hubo un error",error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Chat Milion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar title="Usuarios" />
      <div className="listUserContainer">
        <div className="userContainer">
          <ul className="listUsers">
            {users.map(user=>(
              <User key={user._id} user={user}/>
            ))}
          </ul>

          <button className="addUserButton">Crear usuario</button>
        </div>
      </div>
    </>
  );
}
