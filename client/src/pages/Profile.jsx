import React from 'react'


const Profile = () => {

    return (
        <div className='profile'>
          <div>
            <h1 >Profile</h1>
            <form>
              <label htmlFor="resName">Restaurant Name</label>
              <input type="text" placeholder='Restaurant Name...' name='resName' />
              <label htmlFor="location">Location</label>
              <input type="text" placeholder='Location...' name='location'/>
              
              <label htmlFor="resName">Upload</label>
              <input type="file" id='file' name='' />
            </form>
          </div>
          
        </div>
    );
}

export default Profile