import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../images/logo2.png"

const Login = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '', 
  })

  const [err, setError] = useState(null)

const handleChange = e => {
  setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}

const navigate = useNavigate()

const {login} = useContext(AuthContext)


const handleSubmit = async e => {
  e.preventDefault()
  try{
    await login(inputs)
    await axios.post('/auth/login', inputs)
    navigate('/') 
  }catch(err) {
    setError(err.response.data)
  }
  
}

  return (
    <div className='auth'>
      <img src={Logo} alt="" />
      <h1>Login</h1>
      <form >
        <input type='text' placeholder='Username...' name='username' onChange={handleChange}/>
        <input type='password' placeholder='Password...' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Log in</button>
        {err && <p>{ err }</p>}
        <span>Dont have an account?<Link to='/register'>Register</Link></span>
        <span>Forgot your password?<Link>Reset password</Link></span>

      </form>
    </div>
  )
}

export default Login