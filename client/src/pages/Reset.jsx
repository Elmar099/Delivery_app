import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../images/logo2.png"

const Reset = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: '', 
        accType: 'restaurants'
      })
      
    const [err, setError] = useState(null)
    
    
    const handleChange = (e) => {
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    
    const navigate = useNavigate()

const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
        await axios.post('/auth/reset', inputs);
        navigate('/login')
      } catch (err) {
        setError(err.response.data);
      }
}
  return (
    <div className='auth'>
    <img src={Logo} alt="" />
    <h1>Reset password</h1>
    <form >
      <input type='text' placeholder='Email...' name='email' onChange={handleChange}/>
      <input type='password' placeholder='New password...' name="password" onChange={handleChange}/>
      <label htmlFor="select">Choose account type:</label>
        <select name="accType" onChange={handleChange}>
          <option value="restaurants" defaultValue='restaurants'>Restaurant</option>
          <option value="drivers">Driver</option>
        </select>

      <button onClick={handleSubmit}>Reset password</button>
      {err && <p>{ err }</p>}
      <span>Go back to <Link to='/login'>Login</Link></span>

    </form>
  </div>
  )
}

export default Reset