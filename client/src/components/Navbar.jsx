import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../images/logo2.png"
import { AuthContext } from '../context/authContext'

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=home">
            <h6>HOME</h6>
          </Link>
          <Link className='link' to="/?cat=art">
            <h6>ORDERS</h6>
          </Link>
          <span className='logged'>
            <Link className='link' to="/profile">
              {currentUser?.username}
            </Link>
            
            </span>
          {currentUser ? (
          <span onClick={logout}>Logout</span> 
          ) : ( 
          <Link className='link' to='/login'>
            Login
          </Link>
          )}
          <span className='write'>
            <Link className='link' to="/write">Order</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar