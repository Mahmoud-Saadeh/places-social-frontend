import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
import markerImage from '../../svg/pin.svg';
import './Map.css';

const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: +props.center.lat,
    longitude: +props.center.lng,
    width: '100%',
    height: '500px',
    zoom: 12,
  });
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
  // const mapRef = useRef();
  // const { center, zoom } = props;
  // useEffect(() => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: center,
  //     zoom: zoom,
  //   });
  //   new window.google.maps.Marker({ position: center, map: map });
  // }, [center, zoom]);

  // return (
  //   <div
  //     ref={mapRef}
  //     className={`map ${props.className}`}
  //     style={props.style}
  //   ></div>
  // );
  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker
        key={props.id}
        latitude={+props.center.lat}
        longitude={+props.center.lng}
      >
        <img src={markerImage} width={30} height={30} alt="marker" />
      </Marker>
    </ReactMapGl>
  );
};

export default Map;
