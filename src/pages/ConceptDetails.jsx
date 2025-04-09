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
import { authContext } from '../context/AuthContext';

function ConceptDetails() {
    const {user} = useContext(authContext)

    let [status, setStatus] = useState(true)
    let [currentStatus, setCurrentStatus] = useState(true)
    let [voteCount, setVoteCount] = useState(0)
    let [voteResult, setVoteResult] = useState('')

    let [approve, setApprove] = useState(false)
    let [disApprove, setDisapprove] = useState(false)

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
      name: 'Manager Ebrahim',
      status: 'Approved',
      description: 'very good idea',
      link: '/concept-details',
    },
    {
      id: 1,
      name: 'Manager Adel',
      status: 'DisApproved',
      description: 'Not good enough, needs analyis',
      link: '/',
    },
    {
      id: 2,
      name: 'Manager Abdulaziz',
      status: 'Approved',
      description: 'Amazing idea',
      link: '/',
    },
  ])

  
//   const handleChange = ()=> {
//     setStatus(currentStatus => !currentStatus)
    
//     if (status === true) {
//         setVoteCount(voteCount + 1)
//     } 
    
//     console.log(status)
//     console.log(voteCount)
//   }

const handleApprove = () => {
    setApprove(true)
    setDisapprove(false)
}

const handleDisapprove = () => {
    setDisapprove(true)
    setApprove(false)
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
                        Selected Managers:
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
                    {data2.map((oneData)=>
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
                    { user.role === "admin" &&
                    <Typography variant="h2" component="div">
                        Team
                    </Typography>
                    }

                    { user.role === "manager" &&
                    <Typography variant="h2" component="div">
                        Decision
                    </Typography>
                    }
                </Box>
                
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                    { user.role === "admin" && 
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h5" component="div">
                        Status: Approved
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

                    {                    
                        data2.map((oneData)=>
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
                    }

                    {user.role === "manager" &&  
                    <FormGroup sx={{display: 'flex', flexDirection: 'row'}}>                        
                            <FormControlLabel control={<Checkbox onChange={handleApprove} checked={approve} />} label="Approve" />                                                                        
                            <FormControlLabel control={<Checkbox onChange={handleDisapprove} checked={disApprove} />} label="Disapprove" />                                                                        
                    </FormGroup> }

                </Box>                
            </Box>


        </Box>
        
    </>
  )
}

export default ConceptDetails