import { useContext, useEffect, useState} from 'react'
import { authContext } from '../context/AuthContext'
import { Link } from "react-router"
import axios from 'axios'

 

import '../../public/styles/Homepage.css'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Homepage() {

  //     *** MANAGERS VIEW OF CONCEPTS *** 
  //     const handleChange = ()=> {
  //     setStatus(currentStatus => !currentStatus)
      
  //     if (status === true) {
  //         setVoteCount(voteCount + 1)
  //     } 
      
  //     console.log(status)
  //     console.log(voteCount)
  //   }
  
  // const handleApprove = () => {
  //     setApprove(true)
  //     setDisapprove(false)
  // }
  
  // const handleDisapprove = () => {
  //     setDisapprove(true)
  //     setApprove(false)
  // }

  const {user} = useContext(authContext)  
  const token = localStorage.getItem('token'); 
  


  let [concepts, setConcepts] = useState([])


  
  async function getAllConcepts() {
    try {
      const fetchedConcepts = await axios.get("http://localhost:3000/", {headers: {Authorization: `Bearer ${token}`}})
      setConcepts(fetchedConcepts.data)      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getAllConcepts()
  }, [])
  
  
  // sending request to protected route that needs a token
  async function callProtectedRoute(){
    const token = localStorage.getItem("token")
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(response.data)
  }
  callProtectedRoute()



   
  return (
        <section className="homepage-section">
          <div className="container">                  
                  <div className="">       
                      <h1>Welcome, {user.username}!</h1>              
                      <h1>Your role is: {user.role}</h1>              
                  </div>
                  
                  <div className=""> 
                      <div>
                        <h2>Your Concepts:</h2>
                      </div>                    
                      <div>
                        {concepts.map((concept)=>
                          <Link to={`/concept/${concept._id}`}>
                            <Card key={concept._id} sx={{ minWidth: 275, marginTop: 3, marginBottom: 3 }}>
                                <CardContent>                              
                                  <Typography variant="h5" component="div">
                                    {concept.title}
                                  </Typography>
                                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{concept.status}</Typography>
                                  <Typography variant="body2">
                                    {concept.description}                                
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button size="small" sx={{ 
                                        '&:focus': { outline: 'none' },
                                        '&:focus-visible': { outline: 'none' },
                                        '&:active': { outline: 'none' }
                                      }} >Learn More</Button>
                                </CardActions>
                            </Card>                        
                          </Link>
                        )}                  
                      </div>                        
                  </div> 
                  
                  {user.role === "engineer" && 
                  
                  <div className=''>
                    <Link to='/add-concept'>                    
                      <Button size='large' variant="contained" 
                            sx={{ 
                              '&:focus': { outline: 'none' },
                              '&:focus-visible': { outline: 'none' },
                              '&:active': { outline: 'none' }
                            }}
                      >Add New Concept</Button>
                    </Link>
                  </div>
                  }
          </div>
        </section>
  )
}

export default Homepage
