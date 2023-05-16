import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useLoadScript } from "@react-google-maps/api";
import axios from 'axios';
import Logo from '../../images/logo2.png'
const libraries = ["places", "geometry"];

const Calculations = () => {
  const [post, setPost] = useState([]);
  const [disable, setDisable] = useState(true) 
  const navigate = useNavigate()
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [cost, setCost] = useState(null)
  const [err, setError] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("") 

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get("/driverPosts/coords")
        setPost(res.data)
       
      } catch (err) {
        console.log("driver hasnt accepted yet")
      }
    };
    fetchData()
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDK5QjukwJ1EntqMrHObucvEOamfDoTqsI",
    libraries,
  })

   if (!isLoaded) return <div>Loading</div>
   const refresh = () => {
    window.location.reload(false);
   }
   const confirm = () => {
    navigate("/home")
   }

  const disdir = async (e) => {
    try {
      const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: post[0].address,
      destination: post[0].locate,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    let num = parseFloat(results.routes[0].legs[0].distance.text)

    setCost(5 + 2*(num))
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setDisable(false)

    }catch(err) {
      setError("Driver hasn't accepted yet!")
    }
   }
    return (
      <div className="calculations">
        <img src={Logo} alt="" />
        <h1>Payment</h1>
        
        <div className='container'>
          <div className="inner">
            <div className='logs'>
              <div className='logis'>Distance </div>
              <div className='logis'>Duration </div>
              <div className='cost'>Final cost </div>
            </div>
            <div className='nums'>
              <div className='top'>{distance}</div>
              <div className='mid'>{duration}</div>
              <div className='bot'>{cost && <div>${cost}</div>}</div>
            </div>
            
          </div>
        
        { err && <p>{err}</p> }
        <div className='buttons'>
        <button onClick={disdir}>Caluculate payment</button>
        <button disabled={disable} onClick={confirm} >Confirm payment</button>
        <button onClick={refresh}>Refresh page</button>
        </div>
        </div>
      </div>
    )
}

export default Calculations