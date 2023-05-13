import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//import { AddressAutofill } from '@mapbox/search-js-react';
import { GoogleMap, Autocomplete, useLoadScript } from "@react-google-maps/api";
import { AuthContext } from '../context/authContext';
const libraries = ["places", "geometry"];

const Write = () => {
  const state = useLocation().state
  const { currentUser } = useContext(AuthContext);
  const [err, setError] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null)
  const [title, setTitle] = useState(state?.title || "")
  const [value, setValue] = useState(state?.desc || "")
  const [locate, setLocate] = useState(state?.locate || "")
  const [lati, setLat] = useState("")
  const [lngi, setLng] = useState("")
  const navigate = useNavigate()
  
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

    const address = autoComplete.getPlace().formatted_address
    setLocate(address)
   }

  const handleClick = async (e) => {
    e.preventDefault()
    if (title==='' || !locate==='' || !value==='') {
      setError("Please fill in all the required fields.");
      return
    }
  
    try{
      state ? 
      await axios.put(`/posts/${state.id}`, {
        
        title, locate:locate, desc:value, 
      })
      :
      await axios.post(`/posts/`, {
        title, locate:locate, desc:value, lati, lngi
      })
      navigate('/order')
    } catch(err) {
      setError(err.response.data)
    }
  }
  
  return (
    <div className="add">
      <h1>Make an order</h1>
      <div className="content">
      <label htmlFor="orderName">Order name</label>

      { err && <p>{err}</p> }
        <input required type="text" name='orderName' value={title} placeholder='Order for...' onChange={(e)=>setTitle(e.target.value)}/>
        <form>
          <label>Location</label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div>
         { err && <p>{err}</p> }
            <input required type="text" name='orderLocate' placeholder='Location...'/>
         </div>
    </Autocomplete>
        
        </form>
        <label htmlFor="orderD">Order details</label>
        { err && <p>{err}</p> }
        <textarea required className='editor' name='orderD' value={value} placeholder='Order details...' onChange={e=>setValue(e.target.value)}/>
        
      </div>
      <div className="menu">
        <div className="item">
          <h1>Post order</h1>
          <div className="buttons">
            {/* { err && <p>{err}</p> } */}
            <button onClick={handleClick}>Confirm order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write