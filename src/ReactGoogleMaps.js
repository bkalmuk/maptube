
import _ from "lodash";
import React, { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import './App.css';
import axios from "axios";

const API_KEY = 'AIzaSyBhood8bE-nqAUFL1ashXgv42H6TXHjJOE';

const CustomMap = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
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
  const [coord, setCoord] = useState({ lat: 38.9637, lng: 35.2433 });

  function onClickMap(event) {
    const newCoord = event.latLng;
    setCoord(newCoord);

      
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${newCoord.lat()}%2C${newCoord.lng()}&maxResults=10&order=date&locationRadius=100mi&q=surfing&type=video&key=${API_KEY}`).then(result => {
      console.log(result.data.items);
      props.setVideos(result?.data?.items || []);
    });

    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=43.05579537713405%2C21.932724517010797&locationRadius=10mi&q=surfing&type=video&key=[YOUR_API_KEY]
    // axios.get('https://www.googleapis.com/youtube/v3/videos', { params: { key: 'AIzaSyBhood8bE-nqAUFL1ashXgv42H6TXHjJOE', maxResults: 2, regionCode: 'TR', chart: 'mostPopular' }}).then(result => {
    //   console.log(result);
    // })

    // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCoord.lat()},${newCoord.lng()}&key=${GOOGLE_MAPS_API_KEY}`).then(result => {
    //   console.log(result);
    // })
  }

  return (
    <CustomMap key="map" onClick={onClickMap} coord={coord} />
  );
};

export default enhance(ReactGoogleMaps);

