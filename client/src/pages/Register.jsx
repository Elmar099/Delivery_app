import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import { GoogleMap, Autocomplete, useLoadScript } from "@react-google-maps/api";
import axios from 'axios'
import Logo from "../images/logo2.png"

const libraries = ["places", "geometry"];

const Register = () => {
  const [autoComplete, setAutoComplete] = useState(null)
  // const [lati, setLat] = useState("")
  // const [lngi, setLng] = useState("")
  const [locate, setLocate] = useState("")
  const [err, setError] = useState(null)
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: '',
    password: '', 
    email: '',
    accType: 'restaurants'
  })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDK5QjukwJ1EntqMrHObucvEOamfDoTqsI",
    libraries,
  })
  if (!isLoaded) return <div>Loading</div>

  const onLoad = (autoC) => setAutoComplete(autoC)
  const onPlaceChanged = () => {
    const address = autoComplete.getPlace().formatted_address;
    setLocate(address)
    //console.log(autoComplete.getPlace().formatted_address)
  }

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.post('/auth/register', inputs)
      navigate('/login') 
    }catch(err) {
      setError(err.response.data)
    }
  }

return (
    <div className='auth'>
      <img src={Logo} alt="" />
      <h1>Register</h1>
      <form >
        <input type='text' placeholder='Username...' name='username' onChange={handleChange}/>
        <input type='text' placeholder='Email...' name='email' onChange={handleChange}/>
        <input type='password' placeholder='Password...' name='password' onChange={handleChange}/>
        {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <input type="text" name='location' placeholder='Location...'/>
          </div>
        </Autocomplete> */}

        <label htmlFor="select">Choose account type:</label>
        <select name="accType" onChange={handleChange}>
          <option value="restaurants" defaultValue='restaurants'>Restaurant</option>
          <option value="drivers">Driver</option>

        </select>
        
        <button onClick={handleSubmit}>Sign up</button>
       { err && <p>{err}</p> }
        <span>Already have an account? <Link to='/login'>Log in.</Link></span>
      </form>
    </div>
  )
}

export default Register