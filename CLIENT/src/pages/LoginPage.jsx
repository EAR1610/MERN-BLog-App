import { useContext, useState } from "react"
import {Navigate} from "react-router-dom"
import { UserContext } from "../components/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async ev => {
    ev.preventDefault();
    
    const response = await fetch('https://efocaris.onrender.com/login', {
      method:'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    if( response.ok ) {
      response.json().then( userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    } else {
      alert('Credenciales incorrectas');
    }
  }

  if( redirect ) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Inicio de sesión</h1>
        <input 
          type="text" 
          placeholder="Nombre de usuario" 
          value={username} 
          onChange={ev => setUsername(ev.target.value)}
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={ev => setpassword(ev.target.value)}
        />

        <button>Login</button>
    </form>
  )
}

export default LoginPage