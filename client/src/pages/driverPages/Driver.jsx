import * as React from 'react';
import { useState } from 'react'
import Map, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
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
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      {/* <Marker longitude={-121.8853} latitude={37.3387} color="green" /> */}
        <NavigationControl position='bottom-right'/>
        <GeolocateControl 
        trackUserLocation
        position='top-left'
          />
        
        
      
      
      </Map>
      </div>
  )
}

export default Driver
// import React, { useState, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoiYXRsYXMxZSIsImEiOiJjbGd4YWcxdWYwM2txM21wczMzdHBvc3oxIn0.2RVw2mKqAbo93WXPRwZt5w';

// function MapPage() {
//   const [map, setMap] = useState(null);
//   const [origin, setOrigin] = useState([-122.4194, 37.7749]); // San Francisco, CA
//   const [destination, setDestination] = useState([-118.2437, 34.0522]); // Los Angeles, CA
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-119.4179, 36.7783], // California, USA
//       zoom: 6
//     });
//     setMap(map);

//     return () => {
//       map.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (map) {
//       const coordinates = [origin, destination];
//       const bounds = coordinates.reduce(function(bounds, coord) {
//         return bounds.extend(coord);
//       }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

//       map.fitBounds(bounds, {
//         padding: { top: 50, bottom: 50, left: 50, right: 50 }
//       });

//       const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?access_token=${mapboxgl.accessToken}`;
//       fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           setDistance(data.routes[0].distance);
//           setDuration(data.routes[0].duration);
//           const route = data.routes[0].geometry;
//           if (map.getSource('route')) {
//             map.getSource('route').setData(route);
//           } else {
//             map.addLayer({
//               id: 'route',
//               type: 'line',
//               source: {
//                 type: 'geojson',
//                 data: {
//                   type: 'Feature',
//                   geometry: route
//                 }
//               },
//               paint: {
//                 'line-width': 2,
//                 'line-color': '#007cbf'
//               }
//             });
//           }
//         })
//         .catch(error => console.error(error));
//     }
//   }, [map, origin, destination]);

//   function handleOriginChange(event) {
//     setOrigin(event.target.value.split(',').map(parseFloat));
//   }

//   function handleDestinationChange(event) {
//     setDestination(event.target.value.split(',').map(parseFloat));
//   }

//   return (
//     <div>
//       <h1>Driving Directions</h1>
//       <form>
//         <label>
//           Origin (lng,lat):
//           <input type="text" value={origin} onChange={handleOriginChange} />
//         </label>
//         <br />
//         <label>
//           Destination (lng,lat):
//           <input type="text" value={destination} onChange={handleDestinationChange} />
//         </label>
//       </form>
//       {distance && duration && (
//         <div>
//           <p>Distance: {distance / 1000} km</p>
//           <p>Duration: {duration / 60} minutes</p>
//         </div>
//       )}
//       <div id="map" style={{ height: '500px' }} />
//     </div>
//   );
// }

// export default MapPage;
