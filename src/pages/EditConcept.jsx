import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { useContext } from 'react';
import { authContext } from '../context/AuthContext'
import axios from 'axios';

import '../../public/styles/EditConcept.css';



function EditConcept() {
    const token = localStorage.getItem('token'); // or sessionStorage or from your auth context        
    const navigate = useNavigate()
    const {user} = useContext(authContext)    
    const {id} = useParams()

    
    let [conceptDetails, setConceptDetails] = useState({})    
    const [managers, setManagers] = useState([{}])  
    const [operationals, setOperationals] = useState([{}])
                    
   
      async function getConceptDetails() {
        try {
            const fetchedConceptDetails = await axios.get(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            setConceptDetails(fetchedConceptDetails.data)   
            console.log(fetchedConceptDetails)
            
            initializeFormData(fetchedConceptDetails.data);

        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
        }
    }
    
    useEffect(()=>{
        getConceptDetails()
    }, [])
     
    console.log(conceptDetails) 

         

    function initializeFormData(conceptData) {
        setFormData({
          title: conceptData.title || '',
          selectedManagers: conceptData.selectedManagers?.map(manager => manager._id) || [],
          selectedOperational: conceptData.selectedOperational?.map(op => op._id) || [],
          description: conceptData.description || ''
        });
      }



        async function getAllManagers() {
          try {            
            const fetchedManagers = await axios.get("http://localhost:3000/managers/", {headers: {Authorization: `Bearer ${token}`}})
              setManagers(fetchedManagers.data) 
                       
          } catch (error) {
            console.log(error)
          }  
        }
         useEffect(()=>{
            getAllManagers()
         }, [])         
        
        

         async function getAllOperationals() {
          try {            
            const fetchedOperationals = await axios.get("http://localhost:3000/operationals/", {headers: {Authorization: `Bearer ${token}`}})
              setOperationals(fetchedOperationals.data) 
                       
          } catch (error) {
            console.log(error)
          }  
        }
         useEffect(()=>{
            getAllOperationals()
         }, [])         


// For Managers
const handleManagerCheckboxChange = (event, managerId) => {
  if (event.target.checked) {
    setFormData(prev => ({
      ...prev,
      selectedManagers: [...prev.selectedManagers, managerId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      selectedManagers: prev.selectedManagers.filter(id => id !== managerId)
    }));
  }
};

// for operationals
const handleOperationalCheckboxChange = (event, operationalId) => {
  if (event.target.checked) {
    setFormData(prev => ({
      ...prev,
      selectedOperational: [...prev.selectedOperational, operationalId]
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      selectedOperational: prev.selectedOperational.filter(id => id !== operationalId)
    }));
  }
};






    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }   


let [formData, setFormData] = useState({
  title: '',
  selectedManagers: [],
  selectedOperational: [],
  description: '',
})


async function handleSubmit(event) {
  event.preventDefault()
  
  if (formData.selectedManagers.length === 0) {
    alert("Please select at least one manager.");
    return;
  }

  if (formData.selectedOperational.length === 0) {
    alert("Please select at least one operational.");
    return;
  }
  
  try {
    await axios.put(`http://localhost:3000/${user._id}/concept/${id}`, formData, {headers: {Authorization: `Bearer ${token}`}});            
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
  }
  
  navigate('/');
  
  setFormData({
    title: '',
    selectedManagers: [],  // Changed from selectedManagers
    selectedOperational: [],  // Changed from selectedOperational
    description: '',
  });
}

console.log("formData: ", formData)


// async function handleEdit() {
//     try {
      
//       await axios.put(`http://localhost:3000/${user._id}/concept/${id}`, {headers: {Authorization: `Bearer ${token}`}});
      
//       navigate('/'); // Redirect to homepage after successful deletion
    
//     } catch (error) {
//       // Handle errors appropriately
//       console.error("Error deleting concept:", error.response?.data || error.message);            
//     }
// }

    
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
  <section className="edit-concept-section">
    <h2 className="edit-concept-title">Edit Concept</h2>
    <form className="edit-concept-form" onSubmit={handleSubmit}>
      <div className="edit-concept-row">
        <label className="edit-concept-label">Title:</label>
        <input
          className="edit-concept-input"
          required
          onChange={handleChange}
          name="title"
          value={formData.title}
          placeholder="Your Concept's Title"
        />
      </div>
      <div className="edit-concept-row">
        <label className="edit-concept-label">Selected Managers:</label>
        <div className="edit-concept-checkbox-group">
          {managers.map((manager) =>
            manager._id ? (
              <label key={manager._id} className="edit-concept-checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => handleManagerCheckboxChange(e, manager._id)}
                  checked={formData.selectedManagers.includes(manager._id)}
                />
                {manager.username}
              </label>
            ) : null
          )}
        </div>
      </div>
      <div className="edit-concept-row">
        <label className="edit-concept-label">Selected Operationals:</label>
        <div className="edit-concept-checkbox-group">
          {operationals.map((operational) =>
            operational._id ? (
              <label key={operational._id} className="edit-concept-checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => handleOperationalCheckboxChange(e, operational._id)}
                  checked={formData.selectedOperational.includes(operational._id)}
                />
                {operational.username}
              </label>
            ) : null
          )}
        </div>
      </div>
      <div className="edit-concept-row">
        <label className="edit-concept-label">Description:</label>
        <textarea
          className="edit-concept-textarea"
          onChange={handleChange}
          name="description"
          value={formData.description}
          placeholder="Description (optional)"
        />
      </div>
      <button type="submit" className="edit-concept-submit-btn">
        Save Changes
      </button>
    </form>
  </section>
  )
}

export default EditConcept