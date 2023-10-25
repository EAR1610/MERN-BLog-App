import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('https://efocaris.onrender.com/profile', {
      credentials: 'include',      
    }).then( response => {
      response.json().then( userInfo => {
        setUserInfo(userInfo)
      })
    });      
  }, []);

  const logout = () => {
    fetch('https://efocaris.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
        <img src="data:image/png;base64,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" alt="Imagen de la renovación" height={70}/>
        <Link to="/" className="logo">EFOCARIS</Link>
        <nav>

          {username && (
            <>
            <span>Hola: {username}</span>
              <Link to={'/create'}>Crear nuevo Post</Link>
              <a onClick={logout}>Cerrar sesión</a>
            </>
          )}

          {!username && (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}

        </nav>
    </header>
  )
}

export default Header