import { Link } from "react-router"
import { useContext, useState } from "react"
import { authContext } from "../context/AuthContext"
import '../../public/styles/Navbar.css'

import Button from '@mui/material/Button';


function Navbar(props) {
  const {user, logout} = useContext(authContext)
  const { userTheme, onToggleTheme } = props
  console.log("form Navbar:", userTheme)

  return (
    <div className="nav-container">
      <ul>
        <Link to="/"><li>Homepage</li></Link>
        <Button onClick={onToggleTheme}>{userTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Button>

        {user && (
          <>
          <li>Welcome {user.username}</li>
          <button onClick={logout}>Logout</button>
          </>
        )}
        
        {!user && (
          <>
          <Link to='/login'><li>Login</li></Link>
          <Link to='/signup'><li>Signup</li></Link>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
