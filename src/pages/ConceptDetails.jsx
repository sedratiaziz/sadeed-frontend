import * as React from 'react'
import { useContext, useEffect, useState} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

function ConceptDetails() {
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
                    this is a text
                </Typography>
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h4" component="div">
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
                        <MenuItem onClick={handleClose} sx={{paddingTop: '15px', paddingBottom: '15px'}}>
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
                <Typography variant="h2" component="div">
                    Team
                </Typography>
                <Typography variant="h4" component="div">
                    this is a text
                </Typography>
            </Box>
        </Box>
        
    </>
  )
}

export default ConceptDetails