import * as React from 'react'
import { useContext, useEffect, useState} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ConceptDetails() {
    let [status, setStatus] = useState(true)
    let [currentStatus, setCurrentStatus] = useState(true)
    let [voteCount, setVoteCount] = useState(0)
    let [voteResult, setVoteResult] = useState('')

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
  
  // dummy data 2 for presentation:
  let [data2, setData2] = useState([
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
    },
    {
      id: 2,
      name: 'name 2',
      status: 'status 2',
      description: 'blah blah blah blah blah blah blah blah blah',
      link: '/',
    },
  ])

  
  const handleChange = ()=> {
    setStatus(currentStatus => !currentStatus)
    
    if (status === true) {
        setVoteCount(voteCount + 1)
    } 
    
    console.log(status)
    console.log(voteCount)
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
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
                <Typography variant="h2" component="div">
                    Concept Name
                </Typography>
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h5" component="div">
                        names of managers:
                    </Typography>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        View
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >             
                    {data.map((oneData)=>
                        <MenuItem key={oneData.id} onClick={handleClose} sx={{paddingTop: '15px', paddingBottom: '15px'}}>
                            <Typography sx={{fontWeight: 700}}>                            
                                <Typography>
                                    {oneData.name} 
                                </Typography>                                      
                                <Typography>
                                    {oneData.status} 
                                </Typography>                                
                                <Typography>
                                    {oneData.description} 
                                </Typography>                                                                        
                            </Typography>                                                               
                        </MenuItem>
                    )}                                    
                    </Menu>
                </Box>
            </Box>
            
            <Box component='div' sx={{ p: 2, border: '1px dashed grey' }}>
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h2" component="div">
                        Team
                    </Typography>
                </Box>
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h5" component="div">
                        Status: {voteResult}
                    </Typography>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        {data2.map((oneData)=>
                            <FormControlLabel key={oneData.id} control={<Checkbox onChange={handleChange} />} label={oneData.name} />
                        )} 
                        {/* 
                        How to know if the input is checked or not
                        How to know how MANY inputs are checked
                        */}
                    </FormGroup>
                </Box>                
            </Box>


        </Box>
        
    </>
  )
}

export default ConceptDetails