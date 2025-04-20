import './App.css'
import { useEffect, useState } from 'react';
import {Routes ,Route} from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles';


import Login from './pages/Login'
import Signup from './pages/Signup'

import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import ConceptDetails from './pages/ConceptDetails'
import AddConcept from './pages/AddConcept'
import PageNotFound from './pages/PageNotFound';

import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import EditConcept from './pages/EditConcept'

import Box from '@mui/material/Box';

function App() {
const [theme, setTheme] = useState(() => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkTheme ? 'dark' : 'light';
});

// Create themes
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Toggle theme function
const toggleTheme = () => {
  setTheme(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
};

// Listen for system theme changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e) => {
    setTheme(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);

              
useEffect(() => {
  const root = document.documentElement;
  if (theme === 'light') {
    root.style.setProperty('--background-color', '#f7f5f4');
    root.style.setProperty('--text-color', '#213547');
  } else {
    root.style.setProperty('--background-color', '#242424');
    root.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.87)');
  }
}, [theme]);

  return (
    <>
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>  
      
      <Box variant="div" className="app-container">      
        <Navbar className="navbar" userTheme={theme} onToggleTheme={toggleTheme} />
        <Box className="content-container">
          <Routes className="content">          
            <Route path="/" element={<ValidateIsLoggedIn><Homepage userTheme={theme}/></ValidateIsLoggedIn>}/>
            <Route path="/concept/:id" element={<ValidateIsLoggedIn><ConceptDetails/></ValidateIsLoggedIn>} />
            <Route path="/add-concept" element={<ValidateIsLoggedIn><AddConcept/></ValidateIsLoggedIn>} />
            <Route path="/concept/:id/edit-concept" element={<ValidateIsLoggedIn><EditConcept/></ValidateIsLoggedIn>} />
            <Route path="/signup" element={<ValidateIsLoggedOut><Signup/></ValidateIsLoggedOut>}/>
            <Route path="/login" element={<ValidateIsLoggedOut><Login/></ValidateIsLoggedOut>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>          
        </Box>      
      </Box>  
      
      </ThemeProvider>
    </>
  )
}

export default App
