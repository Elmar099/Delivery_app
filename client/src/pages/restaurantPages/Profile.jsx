import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState} from 'react'
import { AuthContext } from '../../context/authContext'
import { AddressAutofill } from '@mapbox/search-js-react';


const Profile = () => {

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  const { currentUser } = useContext(AuthContext)


  const [inputs, setInputs] = useState({
    name: '',
    license_number: '',
  })
  const [locate, setLocate] = useState({
    "address address-search": '',
    apartment: '',
    city:'',
    state: '',
    country: '',
    postcode: '',
  })
  const [err, setError] = useState(null)

  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  }
  
  const locationChange = e => {
    setLocate(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.put('/posts/', {inputs:inputs, locate:JSON.stringify(locate)})
      navigate('/home')
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
              <input type="text" placeholder="Name..." name='name' onChange={handleChange} />
              <label htmlFor="location">Location</label>
              {/* <input type="text" placeholder="Address..." name='address' onChange={handleChange}/> */}
              <AddressAutofill accessToken={MAPBOX_TOKEN}>
                <input
                name="address" placeholder="Address" type="text"
                autoComplete="address-line1" onChange={locationChange}
                />
                </AddressAutofill>
                <input
                name="apartment" placeholder="Apartment number" type="text"
                autoComplete="address-line2" onChange={locationChange}
                />
                <input
                name="city" placeholder="City" type="text"
                autoComplete="address-level2" onChange={locationChange}
                />
                <input
                name="state" placeholder="State" type="text"
                autoComplete="address-level1" onChange={locationChange}
                />
                <input
                name="country" placeholder="Country" type="text"
                autoComplete="country" onChange={locationChange}
                />
                <input
                name="postcode" placeholder="Postcode" type="text"
                autoComplete="postal-code" onChange={locationChange}
                />
              
              <label htmlFor="resName">License Number</label>
              <input type="text" placeholder="License Number" name='license_number' onChange={handleChange}/>

              <button onClick={handleSubmit} >Save</button>
            </form>
          </div>
          
        </div>
    );
}

export default Profile