import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState} from 'react'
import { AuthContext } from '../../context/authContext'
import { GoogleMap, Autocomplete, useLoadScript } from "@react-google-maps/api";
const libraries = ["places", "geometry"];

  // const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const [autoComplete, setAutoComplete] = useState(null)
  const [locate, setLocate] = useState("")
  const [err, setError] = useState(null)
  const [lati, setLat] = useState("")
  const [lngi, setLng] = useState("")
  const [inputs, setInputs] = useState({
    name: '',
    license_number: '',
  })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDK5QjukwJ1EntqMrHObucvEOamfDoTqsI",
    libraries,
  })

  if (!isLoaded) return <div>Loading</div>

  const onLoad = (autoC) => setAutoComplete(autoC)

   const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat;
    const lng = autoComplete.getPlace().geometry.location.lng
    setLat(lat)
    setLng(lng)

    const address = autoComplete.getPlace().formatted_address;
    setLocate(address)
    //console.log(autoComplete.getPlace().formatted_address)
   }
  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    if (inputs.name ==='' || locate==='' || inputs.license_number==='') {
      setError("Please fill in all the required fields.");
      return
    }
    try{
      await axios.put('/posts/', {
        inputs, locate:locate, lati, lngi,
      })
      navigate('/home')
    }catch(err) {
      setError(err.response.data)
    }
  }
    return (
        <div className='profile'>
          <div>
            <h1 >Profile</h1>
            <form>
              <label htmlFor="resName">Restaurant Name</label>
              <input type="text" placeholder="Name..." name='name' onChange={handleChange} />
              <label htmlFor="location">Location</label>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div>
                  <input type="text" name='orderLocate' placeholder='Location...'/>
                </div>
            </Autocomplete>
              
              <label htmlFor="resName">License Number</label>
              
              <input type="text" placeholder="License Number" name='license_number' onChange={handleChange}/>
                { err && <p>{err}</p> }
              <button onClick={handleSubmit} >Save</button>
            </form>
          </div>
          
        </div>
    );
}

export default Profile