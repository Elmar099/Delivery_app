import * as React from 'react';
import { useState } from 'react'
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const Driver = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  
  
  return (
    <div className='map'>
      
    <Map
      initialViewState={{
        longitude: -121.8853,
        latitude: 37.3387,
        zoom: 14
      }}
      
      style={{
      width: 1020, 
      height: 500, 
     
    }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={-121.8853} latitude={37.3387} color="green" />
    </Map>
    </div>
  )
}

export default Driver