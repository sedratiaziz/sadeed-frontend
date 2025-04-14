import './App.css'
import {Routes ,Route} from 'react-router'

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


  return (
    <>
      <Navbar/>
      <Routes>
        {/* removed validation temporarily to develop the UI without limitations, un-comment it when done */}
        {/* <Route path="/" element={<Homepage/>} />
        <Route path="/concept-details" element={<ConceptDetails/>} />
        <Route path="/add-concept" element={<AddConcept/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} /> */}

        <Route path="/" element={<ValidateIsLoggedIn><Homepage/></ValidateIsLoggedIn>}/>
        <Route path="/concept/:id" element={<ValidateIsLoggedIn><ConceptDetails/></ValidateIsLoggedIn>} />
        <Route path="/add-concept" element={<ValidateIsLoggedIn><AddConcept/></ValidateIsLoggedIn>} />
        <Route path="/concept/:id/edit-concept" element={<ValidateIsLoggedIn><EditConcept/></ValidateIsLoggedIn>} />
        <Route path="/signup" element={<ValidateIsLoggedOut><Signup/></ValidateIsLoggedOut>}/>
        <Route path="/login" element={<ValidateIsLoggedOut><Login/></ValidateIsLoggedOut>}/>
        {/* <Route path='*' element={<PageNotFound/>}/> */}
      </Routes>
    </>
  )
}

export default App
