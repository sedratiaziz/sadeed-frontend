import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {

  // const role = ["admin", "manager", "employee"]

    const [formData, setFormData] = useState({
        username:"",
        password:"",
    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,formData)
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         required
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
          />

        <label htmlFor="password">Password:</label>
        <input
        required
         type="password"
         name='password'
         id='password'
         value={formData.password}
         onChange={handleChange}
          />

          <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
