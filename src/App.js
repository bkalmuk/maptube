import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactGoogleMaps from './ReactGoogleMaps';
import Video from './Video';
import { Row, Col } from 'react-bootstrap';
import './App.css';

const API_KEY = 'AIzaSyBhood8bE-nqAUFL1ashXgv42H6TXHjJOE';

function App() {
  const [videos, setVideos] = useState([]);

  function getInitialVideos() {
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=38.9637%2C35.2433&maxResults=10&order=date&locationRadius=100mi&q=surfing&type=video&key=${API_KEY}`).then(result => {
      console.log(result.data.items);
      setVideos(result?.data?.items || []);
    });
  }

  useEffect(() => {
    getInitialVideos();
  }, []);

  console.log('videos', videos);

  return (
    <div className="App">
      <ReactGoogleMaps
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        setVideos={setVideos}
      />
      <Row>
        {videos.map((item) => (
          <Col md="4"><Video videoId={item.id.videoId} /></Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
