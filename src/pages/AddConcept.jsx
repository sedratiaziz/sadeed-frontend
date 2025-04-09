import React, { useState } from 'react'
import { useNavigate } from 'react-router'
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

      const [checkedState, setCheckedState] = useState([]);

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

    const navigate = useNavigate()

    let [formData, setFormData] = useState({
        teamName: '',
        managers: [],
        operationals: [],
    })

    let [checkboxState, setCheckboxState] = useState([])

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    const handleCheckbox = (event) => {
        setCheckboxState({...checkboxState, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event) {
    event.preventDefault()

    await axios.post(`http://localhost:3000/concept`, formData)

    navigate('/')
    setFormData({
        teamName: '',
        managers: [],
        operationals: [],
    })
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

console.log(formData)


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
                        <TextField required onChange={handleChange} name='teamName' value={formData.teamName} label="Your Concept's Title" variant="filled" />
                    </Box>

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Select Managers: 
                        </Typography>
                        <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                            {data.map((oneData)=>
                                <FormControlLabel key={oneData.id} control={<Checkbox name='managers' onChange={handleCheckbox} />} label={oneData.name} />
                            )} 
                        </FormGroup>
                    </Box>   

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                            Select Operationals: 
                        </Typography>
                        <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                            {data.map((oneData)=>
                                <FormControlLabel key={oneData.id} control={<Checkbox onChange={handleChange} />} label={oneData.name} />
                            )} 
                        </FormGroup>
                    </Box>  

                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" component="div">
                                Description: 
                        </Typography>
                        <TextField onChange={handleChange} name='teamName' value={formData.teamName} label="Description (optional)" variant="filled" />
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