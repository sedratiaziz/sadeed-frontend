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
  
    let [conceptDetails, setConceptDetails] = useState({})    
    
    // let [formData, setFormData] = useState({
    //         title: '',
    //         managers: [],
    //         operational: [],
    //         description: '',
    // })
    
    async function getConceptDetails() {
      try {
        const fetchedConceptDetails = await axios.get(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        setConceptDetails(fetchedConceptDetails.data)  
        
      } catch (error) {
        console.log(error)
      }  
    }
    
    useEffect(()=>{
        getConceptDetails()
    }, [])
    


    
    // console.log(conceptDetails.aprovalCount)   





    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }  

    
//  MUI

const [managerAnchorEl, setManagerAnchorEl] = useState(null);
const [operationalAnchorEl, setOperationalAnchorEl] = useState(null);

const managerMenuOpen = Boolean(managerAnchorEl);
const operationalMenuOpen = Boolean(operationalAnchorEl);

const handleManagerClick = (event) => {
  setManagerAnchorEl(event.currentTarget);
};

const handleOperationalClick = (event) => {
  setOperationalAnchorEl(event.currentTarget);
};

const handleManagerClose = () => {
  setManagerAnchorEl(null);
};

const handleOperationalClose = () => {
  setOperationalAnchorEl(null);
};

//   MUI






  return (
    <>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant='h2'>{conceptDetails.title}</Typography>
            <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
                
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Selected Managers: 
                        </Typography>
                        <FormGroup  name='managers' sx={{display: 'flex', flexDirection: 'column'}}>                              
                                <Button
                                  id="managers-button"
                                  aria-controls={managerMenuOpen ? 'managers-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={managerMenuOpen ? 'true' : undefined}
                                  onClick={handleManagerClick}
                                >
                                  View
                                </Button>
                                <Menu
                                  id="managers-menu"
                                  anchorEl={managerAnchorEl}
                                  open={managerMenuOpen}
                                  onClose={handleManagerClose}
                                  MenuListProps={{
                                    'aria-labelledby': 'managers-button',
                                  }}
                                >                                  
                                                              
                                {conceptDetails.selectedManagers && conceptDetails.selectedManagers.map((manager)=>
                                  <MenuItem key={manager._id} onClick={handleManagerClose} sx={{ cursor: 'default' }}>
                                    <Typography>{manager.username}</Typography>                                    
                                  </MenuItem>
                                )}
                                </Menu>                                                         
                        </FormGroup>
                    </Box>   

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Selected Operationals: 
                        </Typography>
                        <FormGroup  name="operationals" sx={{display: 'flex', flexDirection: 'column'}}>                            
                        <Button
                                  id="operational-button"
                                  aria-controls={operationalMenuOpen ? 'operational-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={operationalMenuOpen ? 'true' : undefined}
                                  onClick={handleOperationalClick}
                                >
                                  View
                                </Button>
                                <Menu
                                  id="operational-menu"
                                  anchorEl={operationalAnchorEl}
                                  open={operationalMenuOpen}
                                  onClose={handleOperationalClose}
                                  MenuListProps={{
                                    'aria-labelledby': 'operational-button',
                                  }}
                                >
                                {conceptDetails.selectedOperational && conceptDetails.selectedOperational.map((operational)=>
                                  <MenuItem key={operational._id} onClick={handleOperationalClose} sx={{ cursor: 'default' }}>
                                    <Typography>{operational.username}</Typography>                                    
                                  </MenuItem>
                                )}
                                </Menu> 
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
                            {conceptDetails.isAproved ? "Approved" : "Not Approved"}  
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

            </Box>
        </Box> 
    </>
  )
}

export default ConceptDetails