import React, { useRef, useEffect } from 'react';
import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import axios from 'axios';

//import ReactMapGL , {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css'
//import  Map  from '../../Map.js'
const libraries = ["places", "geometry"];
const Driver = () => {
  const [autoComplete, setAutoComplete] = useState(null)
  const [posts, setPosts] = useState([])
  const [coordinates, setCoordinates] = useState({lat: 37.3345, lng: -121.8})
  const [dValue, setDValue] = useState("")
  useEffect(()=>{
     const fetchData = async ()=>{
       try{
         const res = await axios.get("/driverPosts/coords")
         setPosts(res.data)
       } catch (err) {
         console.log(err)
       }
     };
     fetchData()
   }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAb525bjpnBdm6WZj_gXCQgpG5nXNBTfKA",
    libraries,
  })


   if (!isLoaded) return <div>Loading</div>

   
   
   
   const onLoad = (autoC) => setAutoComplete(autoC)

   const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()
    //const something = "456 W Olive Ave, Sunnyvale, CA 94086, USA"
  
    setCoordinates({ lat, lng})
    
    console.log(autoComplete.getPlace())
    
   }

   const handleClick = () => {
    setDValue(posts.locate)
   }

  return (
    <div className='map'>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div>
            <input type="text" placeholder='Search....' defaultValue={dValue}/>
            <button onClick={handleClick}>submit</button>
           
         </div>
         
    </Autocomplete>
      <GoogleMap 
        zoom={13} 
        center={{lat: coordinates.lat, lng: coordinates.lng}} 
        mapContainerClassName="map-container">
    </GoogleMap>
    
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
