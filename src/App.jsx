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

import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import EditConcept from './pages/EditConcept'


function App() {

  let [theme, setTheme] = useState('')

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



              // Device theme detector
                          const useThemeDetector = () => {
                            const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
                            const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  
                            const mqListener = (e => {
                                setIsDarkTheme(e.matches);
                            });
                            
                            useEffect(() => {
                              const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
                              darkThemeMq.addListener(mqListener);
                              return () => darkThemeMq.removeListener(mqListener);
                            }, []);
                            return isDarkTheme;
                        }
                      
                        const isDarkTheme = useThemeDetector()
                        


              
              useEffect(()=>{
                setTheme(isDarkTheme ? 'dark' : 'light')              
              }, [])  
              
  return (
    <>
    <ThemeProvider theme={darkTheme}>    
        <Navbar userTheme={theme} />
        <Routes>
          {/* removed validation temporarily to develop the UI without limitations, un-comment it when done */}
          {/* <Route path="/" element={<Homepage/>} />
          <Route path="/concept-details" element={<ConceptDetails/>} />
          <Route path="/add-concept" element={<AddConcept/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} /> */}

          <Route path="/" element={<ValidateIsLoggedIn><Homepage userTheme={theme}/></ValidateIsLoggedIn>}/>
          <Route path="/concept/:id" element={<ValidateIsLoggedIn><ConceptDetails/></ValidateIsLoggedIn>} />
          <Route path="/add-concept" element={<ValidateIsLoggedIn><AddConcept/></ValidateIsLoggedIn>} />
          <Route path="/concept/:id/edit-concept" element={<ValidateIsLoggedIn><EditConcept/></ValidateIsLoggedIn>} />
          <Route path="/signup" element={<ValidateIsLoggedOut><Signup/></ValidateIsLoggedOut>}/>
          <Route path="/login" element={<ValidateIsLoggedOut><Login/></ValidateIsLoggedOut>}/>
          {/* <Route path='*' element={<PageNotFound/>}/> */}
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
