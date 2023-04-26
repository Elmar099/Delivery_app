import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Write = () => {

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
      navigate('/home')
    } catch(err) {
        console.log(err)
    }
  }
  return (
    <div className="add">
      <div className="content">
      <label htmlFor="orderName">Order name</label>

        <input type="text" name='orderName' value={title} placeholder='Order for...' onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="location">Location</label>
        <input type="text" value={locate} name='location' placeholder='Location...' onChange={e=>setLocate(e.target.value)}/>
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