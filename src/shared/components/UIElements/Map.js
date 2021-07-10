import React, { useState } from 'react';
import markerImage from '../../svg/pin.svg';
import './Map.css';
import ReactMapGl, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: +props.center.lat,
    longitude: +props.center.lng,
    width: '100%',
    height: '400px',
    zoom: 12,
  });
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
