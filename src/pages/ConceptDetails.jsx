import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

function ConceptDetails() {
    const {user} = useContext(authContext)
    const token = localStorage.getItem('token'); 
    const {id} = useParams()

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
  
    let [conceptDetails, setConceptDetails] = useState({})    

    let [formData, setFormData] = useState({
            title: '',
            managers: [],
            operational: [],
            description: '',
    })
    
    async function getConceptDetails() {
        const fetchedConceptDetails = await axios.get(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        setConceptDetails(fetchedConceptDetails.data)  
        console.log(fetchedConceptDetails.data)      
    }
    
    useEffect(()=>{
        getConceptDetails()
    }, [])
    
    console.log(conceptDetails.selectedManagers)   





    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }  

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

async function findOneManager(userId) {
  await axios.get(`http://localhost:3000/${userId}`)
  
}

  return (
    <>
       <ThemeProvider theme={darkTheme}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant='h2'>{conceptDetails.title}</Typography>
            <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
                
                <form onSubmit={handleSubmit}>                    
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Selected Managers: 
                        </Typography>
                        <FormGroup  name='managers' sx={{display: 'flex', flexDirection: 'column'}}>
                        {/* {conceptDetails.selectedManagers} */}

                            {/* {conceptDetails.selectedManagers && conceptDetails.selectedManagers.map((manager)=>
                                <FormControlLabel key={manager._id} control={<Checkbox onChange={(e)=>handleManagerCheckboxChange(e, manager._id)} checked={formData.selectedManagers.includes(manager._id)} />} label={manager.username} />
                            )}  */}
                        </FormGroup>
                    </Box>   

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Selected Operationals: 
                        </Typography>
                        <FormGroup  name="operationals" sx={{display: 'flex', flexDirection: 'column'}}>
                            {/* {conceptDetails.selectedOperational} */}
                            
                            {/* {conceptDetails.selectedOperational && conceptDetails.selectedOperational.map((operational)=>
                                <FormControlLabel key={operational.id} control={<Checkbox onChange={(e)=>handleOperationalCheckboxChange(e, operational._id)} checked={formData.selectedOperational.includes(operational._id)} />} label={operational.username} />
                            )}  */}
                        </FormGroup>
                    </Box>  

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Description: 
                        </Typography>
                        <Typography variant="h5" component="div">
                                {conceptDetails.description} 
                        </Typography>
                    </Box>    
                    
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Status: 
                        </Typography>
                        <Typography variant="h5" component="div">
                                {conceptDetails.status} 
                        </Typography>
                    </Box>    
                    
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Approval: 
                        </Typography>
                        <Typography variant="h5" component="div">
                                {conceptDetails.isApproval} 
                        </Typography>
                    </Box>
                    <Link to={`/concept/${id}/edit-concept`}>
                        <Button size='large' variant="contained" 
                                sx={{ 
                                '&:focus': { outline: 'none' },
                                '&:focus-visible': { outline: 'none' },
                                '&:active': { outline: 'none' }
                                }}
                        >Edit Concept?</Button>                    
                    </Link>                                                        
                </form>

            </Box>
        </Box>
    </ThemeProvider> 
    </>
  )
}

export default ConceptDetails