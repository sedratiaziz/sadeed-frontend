import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"
import '../../public/styles/Navbar.css'

import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';

// Import Material-UI icons
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import logo from '../../public/img/sadeed-en-with-logo-transparent.png'

function Navbar(props) {
  const {user, logout} = useContext(authContext)
  const { userTheme, onToggleTheme } = props

  return (
    <Box className="nav-container">
      <ul className="nav-menu">
        <Box className='top-box'>   
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box>
            <img 
              src={logo} 
              alt="Sadeed Logo" 
              style={{
                width: '200px',
              }}
            />
          </Box>       
            </Link>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <h3>*  {user.role} *</h3>
              </Box>
            )}                    
          </Box>       
        </Box>
        
        <Box className='bottom-box'>        
          <IconButton 
            onClick={onToggleTheme}
            color="inherit"
            aria-label="toggle theme"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {userTheme === 'dark' ? (
              <>
                <LightModeIcon sx={{fontSize: 33}} />                
              </>
            ) : (
              <>
                <DarkModeIcon sx={{fontSize: 33}} />
              </>
            )}
          </IconButton>
          
          {!user && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LoginIcon sx={{fontSize: 33}} />
                  <span>Login</span>
                </Box>
              </Link>
              <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonAddIcon sx={{fontSize: 33}} />
                  <span>Signup</span>
                </Box>
              </Link>
            </Box>
          )}

          {user && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={logout}
            >
              <LogoutIcon fontSize="small" />
              <span>Logout</span>
            </Box>
          )}
        </Box>              
      </ul>
    </Box>
  )
}

export default Navbar