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
import '../../public/styles/ConceptDetails.css';

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
        const fetchedConceptDetails = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}})
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
  <section className="concept-details-section">
    <h2 className="concept-details-title">{conceptDetails.title}</h2>
    <div className="concept-details-content">
      <div className="concept-details-row">
        <span className="concept-details-label">Selected Managers:</span>
        <span className="concept-details-value">
          {(conceptDetails.selectedManagers || []).map(m => m.username).join(', ') || '-'}
        </span>
      </div>
      <div className="concept-details-row">
        <span className="concept-details-label">Selected Operationals:</span>
        <span className="concept-details-value">
          {(conceptDetails.selectedOperational || []).map(o => o.username).join(', ') || '-'}
        </span>
      </div>
      <div className="concept-details-row">
        <span className="concept-details-label">Description:</span>
        <span className="concept-details-value">{conceptDetails.description || '-'}</span>
      </div>
      <div className="concept-details-row">
        <span className="concept-details-label">Status:</span>
        <span
          className="concept-details-status"
          data-status={conceptDetails.status?.toLowerCase()}
        >
          {conceptDetails.status || '-'}
        </span>
      </div>
      <div className="concept-details-row">
        <span className="concept-details-label">Approval:</span>
        <span
          className="concept-details-approval"
          data-approved={conceptDetails.isAproved ? "true" : "false"}
        >
          {conceptDetails.isAproved ? "Approved" : "Not Approved"}
        </span>
      </div>
      <Link to={`/concept/${id}/edit-concept`}>
        <Button
          size="large"
          variant="contained"
          className="concept-details-edit-btn"
        >
          Edit Concept
        </Button>
      </Link>
    </div>
  </section>
);
}

export default ConceptDetails