import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

function AddConcept() {
    let [formData, setFormData] = useState({

    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setFormData({
            firstName: "",
            lastName: "",
            password: ""
        })
    }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Filled" variant="filled" />
        </form>
    </>
  )
}

export default AddConcept