import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import '../../public/styles/Homepage.css';


// MUI Components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


// MUI Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';


function Homepage(props) {
  
  let { userTheme } = props  
  

  const { user } = useContext(authContext);  
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  
 
  const [isLoading, setIsLoading] = useState(true);
  
            
  // Notification menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Concepts state
  const [concepts, setConcepts] = useState([]);
  let [votedConcepts, setVotedConcepts] = useState([])
  
  
 

  // Fetch all concepts
  async function getAllConcepts() {
    try {
      setIsLoading(true);
      let url;
      
      if (user.role === "engineer") {
        url = "http://localhost:3000/"; 
      } else if (user.role === "manager" || user.role === "operational") {
        url = "http://localhost:3000/assigned";
      }
      
      const fetchedConcepts = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setConcepts(fetchedConcepts.data);      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getAllConcepts();
  }, []);

  // Notifications state
  const [notifs, setNotifs] = useState([]);
  
  async function getNotifications() {
    try {
      setIsLoading(true);
      const fetchedNotifications = await axios.get(`http://localhost:3000/${user._id}/notifications`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setNotifs(fetchedNotifications.data);  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getNotifications();
  }, []);

  const unreadCount = notifs.filter(notif => !notif.read).length;

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:3000/${user._id}/notifications/${notificationId}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setNotifs(prevNotifs => 
        prevNotifs.map(notif => notif._id === notificationId ? { ...notif, isRead: true } : notif)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
    handleClose();
  };

  // Delete concept
  async function handleDelete(userId, conceptId) {
    try {
      await axios.delete(
        `http://localhost:3000/${userId}/concept/${conceptId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConcepts(prevConcepts => prevConcepts.filter(concept => concept._id !== conceptId));
      navigate('/');
    } catch (error) {
      console.error("Error deleting concept:", error.response?.data || error.message);            
    }
  }

  // Approval handling
  const [vote, setVote] = useState(null);

  async function handleVote(userId, conceptId, voteStatus) {
    try {
      await axios.put(
        `http://localhost:3000/manager/${userId}/concept/${conceptId}/vote`,  
        { vote: voteStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConcepts(prevConcepts => prevConcepts.filter(concept => concept._id !== conceptId));
    } catch (error) {
      console.error("Error processing vote:", error.response?.data || error.message);            
    }
  }

  // Status handling for operational users
  async function handleStatusChange(userId, conceptId, newStatus) {
    try {
      
      const response = await axios.put(`http://localhost:3000/${userId}/concept/${conceptId}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` }});
      
      // Refresh concepts after status change
      getAllConcepts();
      
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  }







  return (    
    <section className="homepage-section">
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="container">   
        {!isLoading && (
          <>
          <div className="header-section">  
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
                overflowX: 'hidden'
              },
            }}
          >
            {notifs.length > 0 ? (
              [...notifs].reverse().map((notif) => (
                <MenuItem 
                  key={notif._id} 
                  onClick={() => handleNotificationClick(notif._id)} 
                  sx={{ 
                    width: '100%', 
                    padding: 0.5,
                    whiteSpace: 'normal',
                    backgroundColor: notif.isRead ? 'inherit' : 'rgba(25, 118, 210, 0.08)'
                  }}
                  disableGutters
                >
                  <Alert 
                    severity={notif.severity || "info"} 
                    sx={{ width: '100%' }}
                    variant="outlined"
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
          <h2>Your role is: {user.role}</h2>              
        </div>
        
        <div className="concepts-section"> 
          <h2>Your Concepts:</h2>
                    
          <div className="concepts-list">
            {Array.isArray(concepts) && concepts.map((concept) => (
              <Card className='card' key={concept._id} sx={{ minWidth: 275, marginTop: 3, marginBottom: 3 }}>
              
              {/* Engineers have Edit access */}
              { user.role === 'engineer' && 
                <Link to={`/concept/${concept._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <CardContent>                              
                    <Typography variant="h5" component="div">
                      {concept.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Status: {concept.status}
                    </Typography>
                    <Typography variant="body2">
                      {concept.description}                                
                    </Typography>
                  </CardContent>
                </Link>
              }
              
              {/* Managers & Operationals dont have Edit access */}
              { (user.role === 'manager' || user.role === 'operational') && 
                  <CardContent>                              
                    <Typography variant="h5" component="div">
                      {concept.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Status: {concept.status}
                    </Typography>
                    <Typography variant="body2">
                      {concept.description}                                
                    </Typography>
                  </CardContent>
              }

              
                <CardActions>
                  {/* Engineer Actions */}
                  {user.role === "engineer" && (
                    <Button 
                      color="error" 
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      size="small" 
                      onClick={() => handleDelete(user._id, concept._id)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                  )}
                  
                  {/* Manager Actions */}
                  {user.role === "manager" && (
                    <>
                      <Button 
                        color="success" 
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        size="small" 
                        onClick={() => handleVote(user._id, concept._id, true)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button 
                        color="error" 
                        variant="contained"
                        startIcon={<DoNotDisturbIcon />}
                        size="small" 
                        onClick={() => handleVote(user._id, concept._id, false)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {/* Operational Actions */}
                  {user.role === "operational" && (
                    <>
                      <Button 
                        color="success" 
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        size="small" 
                        onClick={() => handleStatusChange(user._id, concept._id, "done")}
                        sx={{ mr: 1 }}
                      >
                        Mark as Done
                      </Button>
                      <Button 
                        color="warning" 
                        variant="contained"
                        startIcon={<PendingIcon />}
                        size="small" 
                        onClick={() => handleStatusChange(user._id, concept._id, "in progress")}
                        sx={{ mr: 1 }}
                      >
                        In Progress
                      </Button>
                      <Button 
                        color="error" 
                        variant="contained"
                        startIcon={<DoNotDisturbIcon />}
                        size="small" 
                        onClick={() => handleStatusChange(user._id, concept._id, "not started")}
                      >
                        Not Started
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
                
            ))}
          
          </div>                        
        </div> 
        
        {user.role === "engineer" && (
          <div className="add-concept-section">
            <Link to='/add-concept'>                    
              <Button 
                size='large' 
                variant="contained"
                sx={{ mt: 2 }}
              >
                Add New Concept
              </Button>
            </Link>
          </div>
        )}
          </>
        )}               

      </div>
    </section>
  );
}

export default Homepage;