import React, { useRef, useEffect } from 'react';
import { useState } from 'react'
import ReactMapGL , {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'


const Driver = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <div className='map'>
      
      <ReactMapGL
        initialViewState={{
          longitude: -121.8853,
          latitude: 37.3387,
          zoom: 14
        
        }}
        
        style={{
        width: 1020, 
        height: 500, 
      
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      
        <NavigationControl position='bottom-right'/>
        <GeolocateControl 
        trackUserLocation
        showUserLocation
        position='top-left'
        />
      </ReactMapGL>
      </div>
  )
}

export default Driver
