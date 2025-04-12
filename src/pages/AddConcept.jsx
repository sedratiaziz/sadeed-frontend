import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import { authContext } from '../context/AuthContext'
import axios from 'axios';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';



function AddConcept() {
      const {user} = useContext(authContext)    

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
                
   

        
        const token = localStorage.getItem('token'); // or sessionStorage or from your auth context        
        const navigate = useNavigate()

    

        const [managers, setManagers] = useState([
            {}
        ])  
        const [operationals, selectedOperationals] = useState([
            {}
        ])  



        async function getAllManagers() {
          try {            
            const fetchedManagers = await axios.get("http://localhost:3000/managers/", {headers: {Authorization: `Bearer ${token}`}})
              setManagers(fetchedManagers.data) 
                       
          } catch (error) {
            console.log(error)
          }  
        }
         useEffect(()=>{
            getAllManagers()
         }, [])         
        
        

         async function getAllOperationals() {
          try {            
            const fetchedOperationals = await axios.get("http://localhost:3000/operationals/", {headers: {Authorization: `Bearer ${token}`}})
              selectedOperationals(fetchedOperationals.data) 
                       
          } catch (error) {
            console.log(error)
          }  
        }
         useEffect(()=>{
            getAllOperationals()
         }, [])         


// For Managers
const handleManagerCheckboxChange = (event, managerId) => {
  if (event.target.checked) {
    setFormData(prev => ({
      ...prev,
      managers: [...prev.managers, managerId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      managers: prev.managers.filter(id => id !== managerId)
    }));
  }
};

// for operationals
const handleOperationalCheckboxChange = (event, operationalId) => {
  if (event.target.checked) {
    setFormData(prev => ({
      ...prev,
      operationals: [...prev.operationals, operationalId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      operationals: prev.operationals.filter(id => id !== operationalId)
    }));
  }
};



    let [formData, setFormData] = useState({
        title: '',
        managers: [],
        operationals: [],
        description: '',
    })


    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }   

//     async function handleSubmit(event) {
//     event.preventDefault()

//     await axios.post(`http://localhost:3000/`, formData, {headers:{Authorization:`Bearer ${token}`}})

//     navigate('/')
//     setFormData({
//         title: '',
//         managers: [],
//         operationals: [],
//         description: '',
//     })
// }




async function handleSubmit(event) {
  event.preventDefault()
  
  try {
    await axios.post(`http://localhost:3000/`, formData, {headers: {Authorization: `Bearer ${token}`}});            
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
  }
  
  navigate('/');
  
  setFormData({
    title: '',
    managers: [],
    operationals: [],
    description: '',
  });
}


    
//  MUI
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
//   MUI


  return (
    <>
    <ThemeProvider theme={darkTheme}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant='h2'>Submit Concept</Typography>
            <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
                
                <form onSubmit={handleSubmit}>
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Title: 
                        </Typography>
                        <TextField required onChange={handleChange} name='title' value={formData.title} label="Your Concept's Title" variant="filled" />
                    </Box>

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Select Managers: 
                        </Typography>
                        <FormGroup value={formData.managers} name='managers' sx={{display: 'flex', flexDirection: 'column'}}>
                            {managers.map((manager)=>
                                <FormControlLabel key={manager._id} control={<Checkbox onChange={(e)=>handleManagerCheckboxChange(e, manager._id)} checked={formData.managers.includes(manager._id)} />} label={manager.username} />
                            )} 
                        </FormGroup>
                    </Box>   

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Select Operationals: 
                        </Typography>
                        <FormGroup value={formData.operationals} name="operationals" sx={{display: 'flex', flexDirection: 'column'}}>
                            {operationals.map((operational)=>
                                <FormControlLabel key={operational.id} control={<Checkbox onChange={(e)=>handleOperationalCheckboxChange(e, operational._id)} checked={formData.operationals.includes(operational._id)} />} label={operational.username} />
                            )} 
                        </FormGroup>
                    </Box>  

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Description: 
                        </Typography>
                        <TextField onChange={handleChange} name='description' value={formData.description} label="Description (optional)" variant="filled" />
                    </Box>    

                    <Button type='submit' size='large' variant="contained" 
                                sx={{ 
                                '&:focus': { outline: 'none' },
                                '&:focus-visible': { outline: 'none' },
                                '&:active': { outline: 'none' }
                                }}
                        >Add New Concept</Button>
                </form>

            </Box>
        </Box>
    </ThemeProvider>
    </>
  )
}

export default AddConcept