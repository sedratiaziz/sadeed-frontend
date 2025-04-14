import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
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



function EditConcept() {
    const token = localStorage.getItem('token'); // or sessionStorage or from your auth context        
    const navigate = useNavigate()
    const {user} = useContext(authContext)    
    const {id} = useParams()

    
    let [conceptDetails, setConceptDetails] = useState({})    
    const [managers, setManagers] = useState([{}])  
    const [operationals, setOperationals] = useState([{}])
    

    console.log(id)

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
                
      
   
      async function getConceptDetails() {
        try {
            const fetchedConceptDetails = await axios.get(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            setConceptDetails(fetchedConceptDetails.data)   
            console.log(fetchedConceptDetails)
            
            initializeFormData(fetchedConceptDetails.data);

        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
        }
    }
    
    useEffect(()=>{
        getConceptDetails()
    }, [])
     
    console.log(conceptDetails) 

         

    function initializeFormData(conceptData) {
        setFormData({
          title: conceptData.title || '',
          selectedManagers: conceptData.selectedManagers?.map(manager => manager._id) || [],
          selectedOperational: conceptData.selectedOperational?.map(op => op._id) || [],
          description: conceptData.description || ''
        });
      }



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
              setOperationals(fetchedOperationals.data) 
                       
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
      selectedManagers: [...prev.selectedManagers, managerId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      selectedManagers: prev.selectedManagers.filter(id => id !== managerId)
    }));
  }
};

// for operationals
const handleOperationalCheckboxChange = (event, operationalId) => {
  if (event.target.checked) {
    setFormData(prev => ({
      ...prev,
      selectedOperational: [...prev.selectedOperational, operationalId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      selectedOperational: prev.selectedOperational.filter(id => id !== operationalId)
    }));
  }
};






    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }   


let [formData, setFormData] = useState({
  title: '',
  selectedManagers: [],
  selectedOperational: [],
  description: '',
})


async function handleSubmit(event) {
  event.preventDefault()
  
  if (formData.selectedManagers.length === 0) {
    alert("Please select at least one manager.");
    return;
  }

  if (formData.selectedOperational.length === 0) {
    alert("Please select at least one operational.");
    return;
  }
  
  try {
    await axios.put(`http://localhost:3000/${user._id}/concept/${id}`, formData, {headers: {Authorization: `Bearer ${token}`}});            
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
  }
  
  navigate('/');
  
  setFormData({
    title: '',
    selectedManagers: [],  // Changed from selectedManagers
    selectedOperational: [],  // Changed from selectedOperational
    description: '',
  });
}

console.log("formData: ", formData)


// async function handleEdit() {
//     try {
      
//       await axios.put(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}});
      
//       navigate('/'); // Redirect to homepage after successful deletion
    
//     } catch (error) {
//       // Handle errors appropriately
//       console.error("Error deleting concept:", error.response?.data || error.message);            
//     }
// }

    
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
            <Typography variant='h2'>Edit Concept</Typography>
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
                            Selected Managers: 
                        </Typography>
                        <FormGroup required value={formData.managers} name='managers' sx={{display: 'flex', flexDirection: 'column'}}>
                            {managers.map((manager)=>
                                <FormControlLabel key={manager._id} control={<Checkbox onChange={(e)=>handleManagerCheckboxChange(e, manager._id)} checked={formData.selectedManagers.includes(manager._id)} />} label={manager.username} />
                            )} 
                        </FormGroup>
                    </Box>   

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Selected Operationals: 
                        </Typography>
                        <FormGroup required value={formData.operationals} name="operationals" sx={{display: 'flex', flexDirection: 'column'}}>
                            {operationals.map((operational)=>
                                <FormControlLabel key={operational.id} control={<Checkbox onChange={(e)=>handleOperationalCheckboxChange(e, operational._id)} checked={formData.selectedOperational.includes(operational._id)} />} label={operational.username} />
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
                            >Save Changes</Button>                    
                </form>

            </Box>
        </Box>
    </ThemeProvider>
    </>
  )
}

export default EditConcept