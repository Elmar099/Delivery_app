import React, { useRef, useEffect } from 'react';
import { useState } from 'react'
import { GoogleMap, 
  useLoadScript, 
  Marker, 
  Autocomplete, 
  DirectionsRenderer } from "@react-google-maps/api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import ReactMapGL , {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css'
//import  Map  from '../../Map.js'
const libraries = ["places", "geometry"];
const Driver = () => {
  const [autoComplete, setAutoComplete] = useState(null)
  const [post, setPost] = useState([]);  
  const navigate = useNavigate()

 // const [pLocation, setPLocation] = useState(post?.[0]?.locate || '');
 // console.log(pLocation)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [center, setCenter] = useState({
    lat: 37.27, 
    lng: -121.842,
  })
  const originRef = useRef()
  const destinationRef = useRef()
  //const [coordinates, setCoordinates] = useState({lat: 37.3345, lng: -121.8})
  // const [dValue, setDValue] = useState({
  //   locate: "",
  //   address: "",})
  useEffect(()=>{
     const fetchData = async ()=>{
       try{
         const res = await axios.get("/driverPosts/coords")
         setPost(res.data)
         //console.log(res.data)
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

  //  const onLoad = (autoC) => setAutoComplete(autoC)

  //  const onPlaceChanged = () => {
  //   const lat = autoComplete.getPlace().geometry.location.lat()
  //   const lng = autoComplete.getPlace().geometry.location.lng()
  //   setCoordinates({ lat, lng})

    
    
  //  }

  //  const handleClick = () => {
  //    setDValue(dValue["locate"] = post[0].locate)
  //    setDValue(dValue["address"] = post[0].address)
  //   console.log(post[0].locate)
  //  }

  const finishOrder = async e => {
    e.preventDefault()
    try{
      await axios.put('/driverPosts/finish')
      navigate('/driverHome') 
    }catch(err) {
      console.log(err.response.data)
    }
    
  }
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
  

   const calculateRoute = async (e) => {
    e.preventDefault()
    const directionsService = new window.google.maps.DirectionsService()
    const dir = new window.google.maps.LatLng({lat: center.lat, lng: center.lng})
    const results = await directionsService.route({
      origin: dir,
      destination: post[0].locate,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
   }

   const clearRoute = async (e) => {
    e.preventDefault()
    const directionsService = new window.google.maps.DirectionsService()
    const dir = new window.google.maps.LatLng({lat: center.lat, lng: center.lng})
    const results = await directionsService.route({
      origin: dir,
      destination: post[0].address,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
   }

  return (
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
    
    <button className='mapBut' onClick={calculateRoute}>Pick up</button>
    <button className='mapBut' onClick={clearRoute}>Picked up</button>
    <button className='mapBut' onClick={finishOrder}>Finished</button>
   <button className='mapBut'onClick={getLocate}>Get my location</button> 
    </div>
  )
}

export default Driver
