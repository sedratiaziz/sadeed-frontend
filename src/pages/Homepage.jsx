import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import '../../public/styles/Homepage.css';

// MUI Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// MUI Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { colors } from '@mui/material';


function Homepage(props) {
  
  let { userTheme } = props  
  

  const { user } = useContext(authContext);  
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{  
    // makeing the delete button elevated (by increasing the z-index value higher than the parent card element)
    const parent = document.querySelector('.concept-card');
    const child = document.querySelector('.danger');
    
    if (!parent || !child)
      return;

    const parentZ = window.getComputedStyle(parent).zIndex;
    child.style.zIndex = (parseInt(parentZ) || 0) + 10;
                

  }, [])




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
      
      const fetchedConcepts = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, { headers: { Authorization: `Bearer ${token}` } });
      console.log(fetchedConcepts.data)
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
      const fetchedNotifications = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${user._id}/notifications`, { 
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
        `${import.meta.env.VITE_BACKEND_URL}/${user._id}/notifications/${notificationId}`, 
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
        `${import.meta.env.VITE_BACKEND_URL}/${userId}/concept/${conceptId}`, 
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
        `${import.meta.env.VITE_BACKEND_URL}/manager/${userId}/concept/${conceptId}/vote`,  
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
      
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${userId}/concept/${conceptId}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` }});
      
      // Refresh concepts after status change
      getAllConcepts();
      
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  }







  // Helper function to get status class
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'approved':
        return 'status-done';
      case 'in progress':
      case 'pending':
        return 'status-in-progress';
      case 'not started':
      case 'rejected':
        return 'status-not-started';
      default:
        return 'status-pending';
    }
  };


  
  return (    
    <section className="homepage-section">
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main Content */}
      <div className="main-content">   
        {!isLoading && (
          <>
            {/* Header Section */}
            <div className="header-section">  
              <div className="header-title-container">
                <h1 className="header-title">  Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!</h1>
                <p className="header-subtitle">Here are your concepts</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  className="notification-button"
                  id="notification-button"
                  aria-controls={open ? 'notification-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </button>
                
                <div className="profile-avatar">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Notification Menu */}
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
                  <div style={{ padding: '8px' }}>No notifications</div>
                </MenuItem>
              )}
            </Menu>          
            
            {/* Concepts Section */}
            <div className="concepts-section">                         
              <div className="concepts-grid">
                {Array.isArray(concepts) && concepts.length > 0 ? (
                  concepts.map((concept) => (
                    <>


                                  
                    <div key={concept._id} className="concept-card">
                      <Link to={`/concept/${concept._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>  
                                   
                          <div className="concept-header">
                            <h3 className="concept-title">{concept.title}</h3>
                            <span className={`concept-status ${getStatusClass(concept.status)}`}>
                              {concept.status}
                            </span>
                          </div>
                          <p className="concept-description">{concept.description}</p>                     

                      <div className="concept-meta">
                        <span className={`concept-priority`}>
                          {concept.isAproved ? (<span style={{color: 'green'}}>Approved</span>) : (<span>Rejected</span>)}
                        </span>                        
                      </div>
                      
                      <div className="concept-actions">
                        {/* Engineer Actions */}
                        {user.role === "engineer" && (
                          <button 
                            className="action-button danger"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDelete(user._id, concept._id)
                            }}
                          >
                            <DeleteIcon style={{ fontSize: '16px' }} />
                            Delete
                          </button>
                        )}
                        
                        {/* Manager Actions */}
                        {user.role === "manager" && (
                          <>
                            <button 
                              className="action-button success"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleVote(user._id, concept._id, true)
                              }}
                            >
                              <CheckCircleIcon style={{ fontSize: '16px' }} />
                              Approve
                            </button>
                            <button 
                              className="action-button danger"
                               onClick={(event) => {
                                event.stopPropagation();
                                handleVote(user._id, concept._id, false)
                              }}
                            >
                              <DoNotDisturbIcon style={{ fontSize: '16px' }} />
                              Reject
                            </button>
                          </>
                        )}
                        
                        {/* Operational Actions */}
                        {user.role === "operational" && (
                          <>
                            <button 
                              className="action-button success"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleStatusChange(user._id, concept._id, "done")
                              }}
                            >
                              <CheckCircleIcon style={{ fontSize: '16px' }} />
                              Done
                            </button>
                            <button 
                              className="action-button warning"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleStatusChange(user._id, concept._id, "in progress")
                              }}
                            >
                              <PendingIcon style={{ fontSize: '16px' }} />
                              In Progress
                            </button>
                            <button 
                              className="action-button danger"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleStatusChange(user._id, concept._id, "not started")
                              }}
                            >
                              <DoNotDisturbIcon style={{ fontSize: '16px' }} />
                              Not Started
                            </button>
                          </>
                        )}
                      </div>
                    
                    </Link>
                    </div>

                    </>
                  ))
                ) : (
                  <div className="empty-state">
                    <h3>No concepts found</h3>
                    <p>You don't have any concepts assigned to you yet.</p>
                  </div>
                )}
              </div>                        
            </div> 
            
            {user.role === "engineer" && (
              <div className="add-concept-section">
                <Link to='/add-concept' style={{ textDecoration: 'none' }}>                    
                  <button className="add-concept-button">
                    <AddIcon style={{ fontSize: '20px' }} />
                    Add New Concept
                  </button>
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