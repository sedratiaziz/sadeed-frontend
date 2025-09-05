import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import { authContext } from '../context/AuthContext'
import axios from 'axios';
import '../../public/styles/AddConcept.css';



function AddConcept() {
      const {user} = useContext(authContext)    
                
  
        const token = localStorage.getItem('token'); // or sessionStorage or from your auth context        
        const navigate = useNavigate()

    

        const [managers, setManagers] = useState([
            {}
        ])  
        const [operationals, setOperationals] = useState([
            {}
        ])  



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

//     async function handleSubmit(event) {
//     event.preventDefault()

//     await axios.post(`http://localhost:3000/`, formData, {headers:{Authorization:`Bearer ${token}`}})

//     navigate('/')
//     setFormData({
//         title: '',
//         managers: [],
//         operationals: [],
//         description: '',
//     })
// }

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
    await axios.post(`http://localhost:3000/`, formData, {headers: {Authorization: `Bearer ${token}`}});            
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

console.log(formData)
    

  return (
  <section className="add-concept-section">
    <div className="add-concept-form-container">
      <h2 className="add-concept-title">Submit Concept</h2>
      <form className="add-concept-form" onSubmit={handleSubmit}>
        <div className="add-concept-row">
          <label className="add-concept-label">Title:</label>
          <input
            className="add-concept-input"
            required
            onChange={handleChange}
            name="title"
            value={formData.title}
            placeholder="Your Concept's Title"
          />
        </div>
        <div className="add-concept-row">
          <label className="add-concept-label">Select Managers:</label>
          <div className="add-concept-checkbox-group">
            {managers.map((manager) =>
              manager._id ? (
                <label key={manager._id} className="add-concept-checkbox-label">
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
        <div className="add-concept-row">
          <label className="add-concept-label">Select Operationals:</label>
          <div className="add-concept-checkbox-group">
            {operationals.map((operational) =>
              operational._id ? (
                <label key={operational._id} className="add-concept-checkbox-label">
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
        <div className="add-concept-row">
          <label className="add-concept-label">Description:</label>
          <textarea
            className="add-concept-textarea"
            onChange={handleChange}
            name="description"
            value={formData.description}
            placeholder="Description (optional)"
          />
        </div>
        <button type="submit" className="add-concept-submit-btn">
          Add New Concept
        </button>
      </form>
    </div>
  </section>
);
}

export default AddConcept