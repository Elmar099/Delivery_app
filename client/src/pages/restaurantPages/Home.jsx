import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='land'>
        <div className='land-text'>
            <h1>Welcome to <span>ODFDS</span> </h1>
            <div className='home-buttons'>
          
        <button>
          <Link className='link' to='/contact'>Reach out to us</Link>
          
          </button>

        <button>
          <Link className='link' to='/register'>Create an account</Link>
          
          </button>
        </div>
        </div>
        
    </div>

    
  )
}

export default Home