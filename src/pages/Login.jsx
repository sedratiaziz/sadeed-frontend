import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../context/AuthContext'

import TextField from '@mui/material/TextField';


function Login() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const {validateToken} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      e.preventDefault()
      try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          validateToken()
          // navigate("/login")
      }
      catch(err){
          console.log(err)
      }
  }


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <TextField
        required
         type="text"
         name='username'
         id='username'
         label='Enter your name here'
         value={formData.username}
         onChange={handleChange}
         variant="filled"
          />
<br />
<br />
        <label htmlFor="password">Password:</label>
        <TextField
        required
         type="password"
         name='password'
         id='password'
         label='Enter a strong password'
         variant='filled'
         value={formData.password}
         onChange={handleChange}
          />
<br />
<br />
          <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
