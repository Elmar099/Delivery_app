import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//import { AddressAutofill } from '@mapbox/search-js-react';
import { GoogleMap, Autocomplete, useLoadScript } from "@react-google-maps/api";
import { AuthContext } from '../context/authContext';
const libraries = ["places", "geometry"];

const Write = () => {
  const state = useLocation().state
  const { currentUser } = useContext(AuthContext);
  const [disable, setDisable] =  useState(false)
  const [err, setError] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null)
  const [title, setTitle] = useState(state?.title || "")
  const [value, setValue] = useState(state?.desc || "")
  const [locate, setLocate] = useState(state?.locate || "")
  const [lati, setLat] = useState("")
  const [lngi, setLng] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
      if(currentUser.locate != null){
        return
      }else {
        setError("Click on username and enter restaurant location and log back in!")
        setDisable(true)
      }
   }, [])
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
    if (title==='' || locate==='' || value==='') {
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
      <h1>Place an order</h1>
      <div className="content">
      <label htmlFor="orderName">Order name</label>

        <input required type="text" name='orderName' value={title} placeholder='Order for...' onChange={(e)=>setTitle(e.target.value)}/>
        <form>
          <label>Customer location</label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div>
            <input required type="text" name='orderLocate' placeholder='Location...'/>
         </div>
    </Autocomplete>
        
        </form>
        <label htmlFor="orderD">Order details and notes</label>
        <textarea required className='editor' name='orderD' value={value} placeholder='Order details...' onChange={e=>setValue(e.target.value)}/>
        
      </div>
      <div className="menu">
        <div className="item">
          <div className="buttons">
            { err && <p>{err}</p> } 
            <button disabled={disable} onClick={handleClick}>Confirm order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write