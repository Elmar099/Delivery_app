import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../images/logo2.png"
import { AuthContext } from '../context/authContext'

const DriverNav = () => {

  const {currentUser, logout} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/driverHome'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to="/driverContact">
            <h6>CONTACT</h6>
          </Link>
          <Link className='link' to="/driverOrder">
            <h6>ORDERS</h6>
          </Link>
          <Link className='link' to="/driverHome">
            <h6>HOME</h6>
          </Link>
          <span className='logged'>
            <Link className='link' to="/driverProfile">
              {currentUser?.username}
            </Link>
            
            </span>
          {currentUser ? (
          <span className='write' onClick={logout}>
           <Link className='link' to="/driverHome">
           Logout
           </Link>
            
            </span> 
          ) : ( 
          <Link className='write' to='/login'>
            Login
          </Link>
          )}  
          
        </div>
      </div>
    </div>
  )
}

export default DriverNav