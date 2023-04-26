import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import axios from 'axios'
import Logo from "../images/logo2.png"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '', 
    email: '',
  })

  const [err, setError] = useState(null)

const handleChange = e => {
  setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}

const navigate = useNavigate()

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
        
        <label htmlFor="select">Choose account type:</label>
        <select name="select" id="select">
          <option value="restaurant">Restaurant</option>
          <option value="driver">Driver</option>
        </select>
        
        <button onClick={handleSubmit}>Sign up</button>
       { err && <p>{err}</p> }
        <span>Already have an account? <Link to='/login'>Log in.</Link></span>
      </form>
    </div>
  )
}

export default Register