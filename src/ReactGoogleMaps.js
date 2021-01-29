
import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import './App.css';

const CustomMap = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={props.coord} onClick={props.onClick}>
    <Marker position={props.coord} />
  </GoogleMap>
));

const enhance = _.identity;

function ReactGoogleMaps(props) {

  function onClickMap(event) {
    const latLng = event.latLng;
    const newCoord = { lat: latLng.lat(), lng: latLng.lng() };
    props.setCoord(newCoord);
    props.fetchData(newCoord, true);
  }

  return (
    <CustomMap key="map" onClick={onClickMap} coord={props.coord} />
  );
};

export default enhance(ReactGoogleMaps);

