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
          <Link className='link' to="/">
            <h6>CONTACT US</h6>
          </Link>
          <Link className='link' to="/landing">
            <h6>HOME</h6>
          </Link>
          
          <Link className='link' to="/?cat=art">
            {currentUser?
            <h6>ORDERS</h6> 
            : <p></p>
          }
            
          </Link>
          <span className='logged'>
            <Link className='link' to="/profile">
              {currentUser?.username}
            </Link>
            
            </span>
          {currentUser ? (
          <span className='write' onClick={logout}>
           <Link to="/landing">
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