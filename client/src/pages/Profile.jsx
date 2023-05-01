import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState} from 'react'


const Profile = () => {
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    license_number: ''
  })
  const [err, setError] = useState(null)

  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.put('/posts/', inputs)
      navigate('/landing')
    }catch(err) {
      setError(err.response.data)
    }
  }

  

    return (
        <div className='profile'>
          <div>
            <h1 >Profile</h1>
            <form>
              <label htmlFor="resName">Restaurant Name</label>
              <input type="text" placeholder='Restaurant Name...' name='name' onChange={handleChange} />
              <label htmlFor="location">Location</label>
              <input type="text" placeholder='Location...' name='address' onChange={handleChange}/>
              
              <label htmlFor="resName">License Number</label>
              <input type="text" placeholder='License Number' name='license_number' onChange={handleChange}/>

              <button onClick={handleSubmit} >Save</button>
            </form>
          </div>
          
        </div>
    );
}

export default Profile