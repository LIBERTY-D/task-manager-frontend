
import  {  useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./mapbox.css"
import { Map } from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

export const MapBox = () => {
  const [map, setMap] = useState<Map|null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {

    type initMapType={
      setMap: React.Dispatch<React.SetStateAction<Map|null>>,
      mapContainer:string
    }
    const initializeMap = ({setMap, mapContainer }:initMapType) => {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLng(position.coords.longitude);
            setLat(position.coords.latitude);
            map.setCenter([position.coords.longitude, position.coords.latitude]);
            new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);
          },
          (error) => {
            console.error("Error retrieving user's location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    if (!map) initializeMap({ setMap, mapContainer: 'mapContainer' });
  }, [map, lng, lat, zoom]);


  return <div id='mapContainer' className='mapbox-container'/>;
};


