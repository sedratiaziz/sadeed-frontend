import * as React from 'react';
import { useContext, useEffect, useState} from 'react'
import { authContext } from '../context/AuthContext'
import { Link, useNavigate } from "react-router"

import axios from 'axios'

import '../../public/styles/Homepage.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';




function Homepage() {  
  const {user} = useContext(authContext)  
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate()
  
  
  // MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // MUI



  let [concepts, setConcepts] = useState([])

  async function getAllConcepts() {
    try {
      let url;
      
      if (user.role === "engineer") {
        url = "http://localhost:3000/"; 
      } else if (user.role === "manager" || user.role === "operational") {
        url = "http://localhost:3000/assigned";
      }
      
      const fetchedConcepts = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
      setConcepts(fetchedConcepts.data)      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getAllConcepts()
  }, [])

  console.log(concepts)
  

  

  let [notifs, setNotifs] = useState([])
  
  async function getNotifications() {
    try {
      const fetchedNotifications = await axios.get(`http://localhost:3000/${user._id}/notifications`, {headers: {Authorization: `Bearer ${token}`}})
      setNotifs(fetchedNotifications.data)  
      
    } catch (error) {
      console.log(error)
    }  
  }
  
  useEffect(()=>{
      getNotifications()
  }, [])


  const unreadCount = notifs.filter(notif => !notif.read).length;

  
  // sending request to protected route that needs a token
  async function callProtectedRoute(){
    const token = localStorage.getItem("token")
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(response.data)
  }
  callProtectedRoute()




  const markAsRead = async (notificationId) => {
    try {
      const response = await axios.put(`http://localhost:3000/${user._id}/notifications/${notificationId}`, {}, {headers: {Authorization: `Bearer ${token}`}});
      
      setNotifs(prevNotifs => 
        prevNotifs.map(notif => notif._id === notificationId ? { ...notif, isRead: true } : notif)
      );
      
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
    handleClose();
  };



async function handleDelete(userId, conceptId) {
    try {
      
      await axios.delete(`http://localhost:3000/${userId}/concept/${conceptId}`, {headers: {Authorization: `Bearer ${token}`}});
      setConcepts((prevConcepts) => prevConcepts.filter((concept) => concept._id !== conceptId));
      navigate('/'); // Redirect to homepage after successful deletion
    
    } catch (error) {
      // Handle errors appropriately
      console.error("Error deleting concept:", error.response?.data || error.message);            
    }
}

let [vote, setVote] = useState(false)

async function handleApprove(userId, conceptId) {
    setVote(true)

    try {      
      
      await axios.put(`http://localhost:3000/manager/${userId}/concept/${conceptId}/vote`,  {vote}, {headers: {Authorization: `Bearer ${token}`}});
      setConcepts((prevConcepts) => prevConcepts.filter((concept) => concept._id !== conceptId));
      navigate('/'); // Redirect to homepage after successful deletion
    
    } catch (error) {
      // Handle errors appropriately
      console.error("Error deleting concept:", error.response?.data || error.message);            
    }
}

async function handleDisapprove(userId, conceptId) {
    setVote(false)

    try {      
      
      await axios.put(`http://localhost:3000/manager/${userId}/concept/${conceptId}/vote`,  {vote}, {headers: {Authorization: `Bearer ${token}`}});
      setConcepts((prevConcepts) => prevConcepts.filter((concept) => concept._id !== conceptId));
      navigate('/'); // Redirect to homepage after successful deletion
    
    } catch (error) {
      // Handle errors appropriately
      console.error("Error deleting concept:", error.response?.data || error.message);            
    }
}



   
  return (
        <section className="homepage-section">
          <div className="container">                  
                  <div className="">  
                  <IconButton
        id="notification-button"
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
        }}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: '350px',
            overflowX: 'hidden'  // Hide horizontal scrollbar
          },
        }}
      >
        {notifs.length > 0 ? (
          notifs.map((notif, index) => (
            <MenuItem 
            key={index} 
            onClick={() => handleNotificationClick(notif._id)} 
            sx={{ 
              width: '100%', 
              padding: 0.5,  // Reduced padding
              whiteSpace: 'normal',  // Allow text to wrap
              backgroundColor: notif.isRead ? 'inherit' : 'rgba(25, 118, 210, 0.08)'
            }}
            disableGutters  // Remove default padding
          >
            <Alert 
              severity={notif.severity || "info"} 
              sx={{ 
                width: '100%',
                '& .MuiAlert-message': {
                  overflow: 'hidden',  // Hide scrollbar in Alert message
                  textOverflow: 'ellipsis'
                },
                '& .MuiAlert-icon': {
                  alignSelf: 'flex-start'  // Align icon to top
                },
                boxShadow: 'none',  // Remove shadow
                border: 'none'  // Remove border
              }}
              variant="outlined"  // Lighter variant to save space
            >
              {notif.message}
            </Alert>
          </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography sx={{ padding: 1 }}>No notifications</Typography>
          </MenuItem>
        )}
      </Menu>          
                      <h1>Welcome, {user.username}!</h1>              
                      <h1>Your role is: {user.role}</h1>              
                  </div>
                  
                  <div className=""> 
                      <div>
                        <h2>Your Concepts:</h2>
                      </div>                    
                      <div>
                        {Array.isArray(concepts) && concepts.map((concept)=>
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
                                {user.role === "engineer" && 
                                  <form onSubmit={(e)=> {
                                    e.preventDefault();
                                    e.stopPropagation() // without: you cant click on delete.  |  with: you can click delete
                                    handleDelete(user._id, concept._id)
                                    }}>
                                    <Button 
                                          type='submit'
                                          color="error" 
                                          variant="contained"
                                          startIcon={<DeleteIcon />}
                                          size="small" 
                                          onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                          sx={{ 
                                            '&:focus': { outline: 'none' },
                                            '&:focus-visible': { outline: 'none' },
                                            '&:active': { outline: 'none' }
                                      }}> Delete </Button>
                                  </form>}                                    
                                
                                {user.role === "manager" && <>
                                  <form onSubmit={(e)=> {
                                    e.preventDefault();
                                    e.stopPropagation() // without: you cant click on delete.  |  with: you can click delete
                                    handleApprove(user._id, concept._id)
                                    }}>                                      
                                    <Button 
                                          type='submit'
                                          color="error" 
                                          variant="contained"
                                          startIcon={<DeleteIcon />}
                                          size="small" 
                                          onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                          sx={{ 
                                            '&:focus': { outline: 'none' },
                                            '&:focus-visible': { outline: 'none' },
                                            '&:active': { outline: 'none' }
                                      }}> Approve </Button>
                                      </form>
                                      <form onSubmit={(e)=> {
                                        e.preventDefault();
                                        e.stopPropagation() // without: you cant click on delete.  |  with: you can click delete
                                        handleDisapprove(user._id, concept._id)
                                        }}>
                                        <Button 
                                              type='submit'
                                              color="error" 
                                              variant="contained"
                                              startIcon={<DeleteIcon />}
                                              size="small" 
                                              onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                              sx={{ 
                                                '&:focus': { outline: 'none' },
                                                '&:focus-visible': { outline: 'none' },
                                                '&:active': { outline: 'none' }
                                        }}> Disapprove </Button>
                                      </form>
                                      </>}    

                                      {user.role === "operational" && <>
                                        <form onSubmit={(e)=> {
                                        e.preventDefault();
                                        e.stopPropagation() // without: you cant click on delete.  |  with: you can click delete
                                        handleStatus(user._id, concept._id)
                                        }}>
                                        <Button 
                                              type='submit'
                                              color="error" 
                                              variant="contained"
                                              startIcon={<DeleteIcon />}
                                              size="small" 
                                              onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                              sx={{ 
                                                '&:focus': { outline: 'none' },
                                                '&:focus-visible': { outline: 'none' },
                                                '&:active': { outline: 'none' }
                                        }}> Done </Button>
                                        <Button 
                                              type='submit'
                                              color="error" 
                                              variant="contained"
                                              startIcon={<DeleteIcon />}
                                              size="small" 
                                              onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                              sx={{ 
                                                '&:focus': { outline: 'none' },
                                                '&:focus-visible': { outline: 'none' },
                                                '&:active': { outline: 'none' }
                                        }}> In Progress </Button>
                                        <Button 
                                              type='submit'
                                              color="error" 
                                              variant="contained"
                                              startIcon={<DeleteIcon />}
                                              size="small" 
                                              onClick={(e) => e.stopPropagation()} // without: you cant click delete.  |  with: you can click delete
                                              sx={{ 
                                                '&:focus': { outline: 'none' },
                                                '&:focus-visible': { outline: 'none' },
                                                '&:active': { outline: 'none' }
                                        }}> Not Started </Button>
                                        </form>
                                      </>}                                
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
