import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//import { AddressAutofill } from '@mapbox/search-js-react';
import { GoogleMap, Autocomplete, useLoadScript } from "@react-google-maps/api";
const libraries = ["places", "geometry"];

const Write = () => {
  const state = useLocation().state
  const [autoComplete, setAutoComplete] = useState(null)
  const [title, setTitle] = useState(state?.title || "")
  const [value, setValue] = useState(state?.desc || "")
  const [locate, setLocate] = useState(state?.locate || "")
  const navigate = useNavigate()
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAb525bjpnBdm6WZj_gXCQgpG5nXNBTfKA",
    libraries,
  })

  if (!isLoaded) return <div>Loading</div>

  const onLoad = (autoC) => setAutoComplete(autoC)

   const onPlaceChanged = () => {
    const address = autoComplete.getPlace().formatted_address;
    setLocate(address)
    //console.log(autoComplete.getPlace().formatted_address)
   }

  const handleClick = async (e) => {
    e.preventDefault()
    try{
      state ? 
      await axios.put(`/posts/${state.id}`, {
        
        title, locate:locate, desc:value,
      })
      :
      await axios.post(`/posts/`, {
        title, locate:locate, desc:value,
      })
      navigate('/order')
    } catch(err) {
        console.log(err)
    }
  }
  
  return (
    <div className="add">
      <div className="content">
      <label htmlFor="orderName">Order name</label>

        <input type="text" name='orderName' value={title} placeholder='Order for...' onChange={(e)=>setTitle(e.target.value)}/>
       
        <form>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div>
               <input type="text" name='orderLocate' placeholder='Location...'/>
         </div>
    </Autocomplete>
        
        </form>
        <label htmlFor="orderD">Order details</label>
        <textarea className='editor' name='orderD' value={value} placeholder='Order details...' onChange={e=>setValue(e.target.value)}/>
        
      </div>
      <div className="menu">
        <div className="item">
          <h1>Post order</h1>
          <div className="buttons">
            <button onClick={handleClick}>Confirm order</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Write