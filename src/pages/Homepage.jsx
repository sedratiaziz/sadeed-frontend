import { useContext, useEffect, useState} from 'react'
import { authContext } from '../context/AuthContext'
import { Link } from "react-router"
import axios from 'axios'

  // I currently commented line 7 since i disabled the login validatores in App.jsx, un-comment it when validators are re-enabled  
  // const {user} = useContext(authContext)

import '../../public/styles/Homepage.css'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Homepage() {

  // dummy data for presentation:
  let [data, setData] = useState([
    {
      id: 0,
      name: 'name 1',
      status: 'status 1',
      description: 'blah blah blah blah blah blah blah blah blah',
      link: '/concept-details',
    },
    {
      id: 1,
      name: 'name 2',
      status: 'status 2',
      description: 'blah blah blah blah blah blah blah blah blah',
      link: '/',
    }
  ])
  
  // Actual data that will be used: 
  // let [concepts, setConcepts] = useState([])

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
                      <h1>Welcome, Name!</h1>              
                  </div>
                  
                  <div className=""> 
                      <div>
                        <h2>Your Concepts:</h2>
                      </div>                    
                      <div>
                        {data.map((oneData)=>
                          <Link to={oneData.link}>
                            <Card key={oneData.id} sx={{ minWidth: 275, marginTop: 3, marginBottom: 3 }}>
                                <CardContent>                              
                                  <Typography variant="h5" component="div">
                                    {oneData.name}
                                  </Typography>
                                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{oneData.status}</Typography>
                                  <Typography variant="body2">
                                    {oneData.description}                                
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
          </div>
        </section>
  )
}

export default Homepage
