import React, { useRef, useEffect } from 'react';
import { useState } from 'react'
import { GoogleMap, 
  useLoadScript, 
  Marker, 
  Autocomplete, 
  DirectionsRenderer } from "@react-google-maps/api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const libraries = ["places", "geometry"];
const Driver = () => {
  const [err, setError] = useState(null)
  const [disable, setDisable] = useState(true)
  const [disable2, setDisable2] = useState(true)
  const [disable3, setDisable3] = useState(false)
  const [post, setPost] = useState([]);  
  const navigate = useNavigate()
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [center, setCenter] = useState({
    lat: 37.27, 
    lng: -121.842,
  })
  
  const getLocate = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCenter(pos)
      })
    }else {
      console.log("Geolocation is not supported by this browser.")
    }
  }
  useEffect(()=>{
     const fetchData = async ()=>{
       try{
        getLocate()
         const res = await axios.get("/driverPosts/coords")
         setPost(res.data)
       } catch (err) {
         console.log(err)
       }
     };
     fetchData()
   }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDK5QjukwJ1EntqMrHObucvEOamfDoTqsI",
    libraries,
  })

   if (!isLoaded) return <div>Loading</div>

  
  const finishOrder = async e => {
    e.preventDefault()
    try{
      await axios.delete('/driverPosts/finish')
      navigate('/driverHome') 
    }catch(err) {
      console.log(err.response.data)
    }
    
  }
  
   const calculateRoute = async (e) => {
    e.preventDefault()
    if(typeof post[0]?.locate === "undefined" || post[0]?.address === "undefined") {
      setError('Please pickup an order first!')
      navigate('/driverOrder')
      return
    }
    const directionsService = new window.google.maps.DirectionsService()
    const dir = new window.google.maps.LatLng({lat: center.lat, lng: center.lng})
    const results = await directionsService.route({
      origin: dir,
      destination: post[0]?.locate,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setDisable(false)
    setDisable3(true)
   }

   const clearRoute = async (e) => {
    e.preventDefault()
    const directionsService = new window.google.maps.DirectionsService()
    const dir = new window.google.maps.LatLng({lat: center.lat, lng: center.lng})
    const results = await directionsService.route({
      origin: post[0].locate,
      destination: post[0].address,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setDisable2(false)
    setDisable(true)
   }

  return (
    <div className='container'>
      <h1>Driver Map</h1>
      { err && <p>{err}</p> }
      <div className='map'>
      
      <div className='Ds'>
        
        <div className='logis'>Distance: {distance}</div>
        <div className='logis'>Duration: {duration}</div>
      </div>
    <GoogleMap 
        zoom={13} 
        center={{lat: center.lat, lng: center.lng}} 
        mapContainerClassName="map-container">
        {directionsResponse && <DirectionsRenderer 
        directions={directionsResponse}
        />}
    </GoogleMap>
    
    <button className='mapBut' disabled={disable3} onClick={calculateRoute}>Pick up</button>
    <button className='mapBut' disabled={disable} onClick={clearRoute}>Picked up</button>
    <button className='mapBut' disabled={disable2} onClick={finishOrder}>Finished</button>
    </div>
    </div>
  )
}

export default Driver
