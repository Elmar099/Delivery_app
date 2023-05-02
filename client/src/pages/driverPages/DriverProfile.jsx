import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState} from 'react'


const DriverProfile = () => {

  const [inputs, setInputs] = useState({
    f_name: '',
    l_name: '',
    drivers_license: '',
    license_plate: '',
  })
  const [err, setError] = useState(null)

  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.put('/driverPosts/', inputs)
      navigate('/driver')
    }catch(err) {
      setError(err.response.data)
    }
  }

  

    return (
        <div className='profile'>
          <div>
            <h1 >Profile</h1>
            <form>
              <label htmlFor="resName">First Name</label>
              <input type="text" placeholder= "First Name..." name='f_name' onChange={handleChange} />
              <label htmlFor="location">Last Name</label>
              <input type="text" placeholder="Last Name..." name='l_name' onChange={handleChange}/>            
              <label htmlFor="resName">License Number</label>
              <input type="text" placeholder="License Number..." name='drivers_license' onChange={handleChange}/>
              <label htmlFor="resName">License Plate</label>
              <input type="text" placeholder="License Plate..." name='license_plate' onChange={handleChange}/>

              <button onClick={handleSubmit}>Save</button>
            </form>
          </div>
          
        </div>
    );
}

export default DriverProfile