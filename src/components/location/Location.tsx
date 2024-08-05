import { useEffect, useState } from "react";
import "./location.css";
import { MapBox } from "./map/MapBox";

export const Location = () => {
  const [lat, setLat] = useState<number>(0);
  const [lng, setlng] = useState<number>(0);

  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      if (position) {
        setLat(position.coords.latitude);
        setlng(position.coords.longitude);
      }
    };
    const failure = (error: GeolocationPositionError) => {
      if (error) {
        // console.log(error)
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [lat, lng]);

  return (
    <main className="content">
      <h1>Location</h1>

      <div className="location">
        <div className="location-map">
          <MapBox />
        </div>
        <div className="location-coordinates">
          <div className="location-form">
            <div className="subtitle">Location</div>
            <div className="input-container ic1">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                className="input"
                value={lat}
                type="text"
                readOnly
              />
            </div>
            <div className="input-container ic1">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                className="input"
                value={lng}
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
