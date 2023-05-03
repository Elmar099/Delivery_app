import React, { useRef, useEffect } from 'react';
import { useState } from 'react'
import { GoogleMap, 
  useLoadScript, 
  Marker, 
  Autocomplete, 
  DirectionsRenderer } from "@react-google-maps/api";
import axios from 'axios';

//import ReactMapGL , {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css'
//import  Map  from '../../Map.js'
const libraries = ["places", "geometry"];
const Driver = () => {
  const [autoComplete, setAutoComplete] = useState(null)
  const [post, setPost] = useState([]);  
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const originRef = useRef()
  const destinationRef = useRef()
  const [coordinates, setCoordinates] = useState({lat: 37.3345, lng: -121.8})
  const [dValue, setDValue] = useState({
    locate: "",
    address: "",})
  useEffect(()=>{
     const fetchData = async ()=>{
       try{
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

   const calculateRoute = async (e) => {
    e.preventDefault()
    
    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: post[0].locate,
      destination: post[0].address,
      travelMode: window.google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
   }

   const clearRoute = () => {
     setDirectionsResponse(null)
     setDistance('')
     setDuration('')
     originRef.current.value = ''
     destinationRef.current.value = ''
   }

  return (
    <div className='map'>
      
      <div className='Ds'>
        
        <div className='logis'>Distance: {distance}</div>
        <div className='logis'>Duration: {duration}</div>
        </div>
      <GoogleMap 
        zoom={13} 
        center={{lat: coordinates.lat, lng: coordinates.lng}} 
        mapContainerClassName="map-container">
        {directionsResponse && <DirectionsRenderer 
        directions={directionsResponse}
        />}

    </GoogleMap>
    <button className='mapBut' onClick={calculateRoute}>Pick up</button>
    </div>
  )





  // const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  // console.log(MAPBOX_TOKEN)
 
  // return (
  //   <div className='map'>
      
  //     <ReactMapGL
  //       initialViewState={{
  //         longitude: -121.8853,
  //         latitude: 37.3387,
  //         zoom: 14
        
  //       }}
        
  //       style={{
  //       width: 1020, 
  //       height: 500, 
      
  //       }}
  //       mapStyle="mapbox://styles/mapbox/streets-v12"
  //       mapboxAccessToken={MAPBOX_TOKEN}
  //     >
  //     {/* <Marker longitude={-121.8853} latitude={37.3387} color="green" /> */}
  //       <NavigationControl position='bottom-right'/>
  //       <GeolocateControl 
  //       trackUserLocation
  //       position='top-left'
  //         />

  //     </ReactMapGL>
  //     </div>
  // )
}

export default Driver
