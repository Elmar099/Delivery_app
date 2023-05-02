import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddressAutofill } from '@mapbox/search-js-react';

const Write = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  const state = useLocation().state
  
  const [title, setTitle] = useState(state?.title || "")
  const [value, setValue] = useState(state?.desc || "")
  const [locate, setLocate] = useState(state?.locate || "")
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    try{
      state ? 
      await axios.put(`/posts/${state.id}`, {
        
        title, locate, desc:value,
      })
      :
      await axios.post(`/posts/`, {
        title, locate, desc:value,
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
        {/* <label htmlFor="location">Location</label>
        <input type="text" value={locate} name='location' placeholder='Location...' onChange={e=>setLocate(e.target.value)}/> */}
        <form>
          <AddressAutofill accessToken={MAPBOX_TOKEN}>
            <input
            type="text"
            name='location' 
            placeholder='Location...'
            autoComplete="address-level0"
            value={locate}
            
            onChange={(e) => setLocate(e.target.value)}
            />
          </AddressAutofill>
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