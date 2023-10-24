import { useState } from "react"

const RegisterPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register =  async ev => {
    ev.preventDefault();
    const response = await fetch('https://efocaris.onrender.com/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers:{'Content-Type': 'application/json'}
      });
      
      if(response.status === 200){
        alert('Se ha registrado correctamente');
      } else {
        alert('Ha ocurrido un fallo a la hora de registrarse, por favor intenta más tarde');
      }
  }

  return (
    <form className="register" onSubmit={register}>
        <h1>Regístrese</h1>
        <input type="text" 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={ ev => setUsername(ev.target.value)}/>

        <input type="password" 
              placeholder="Contraseña" 
              onChange={ev => setPassword(ev.target.value)}
              value={password}/>

        <button>Registrarse</button>
    </form>
  )
}

export default RegisterPage