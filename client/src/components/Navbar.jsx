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
          <Link className='link' to="/contact">
            <h6 className='navLinks'>CONTACT</h6>
          </Link>
          <Link className='link' to="/home">
            <h6 className='navLinks'>HOME</h6>
          </Link>
          
          <Link className='link' to="/order">
            {currentUser?
            <h6 className='navLinks'>ORDERS</h6> 
            : <p></p>
          }
            
          </Link>
</div>
          <div className='links'>
          <span className='logged'>
            <Link className='link' to="/profile">
              {currentUser?.username}
            </Link>
            
            </span>
          {currentUser ? (
          <span className='write' onClick={logout}>
           <Link className='link' to="/">
           Logout
           </Link>
            
            </span> 
          ) : ( 
          <Link className='write' to='/login'>
            Login
          </Link>
          )}
          
            {currentUser ? (
            <span className='write'>
              <Link className='link' to="/write">Order</Link>
              </span>
            ) : <p></p>
            }
            
          </div>
      </div>
    </div>
  )
}

export default Navbar