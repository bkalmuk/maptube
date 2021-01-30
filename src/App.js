import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactGoogleMaps from './ReactGoogleMaps';
import InfiniteScroll from "react-infinite-scroll-component";
import Video from './Video';
import { Col, Row } from 'react-bootstrap';
import './App.css';

function App() {
  const initialCoord = { lat: 38.9637, lng: 35.2433 }; // Turkey

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [coord, setCoord] = useState(initialCoord);

  function fetchData (newCoord, resetPageToken) {
    let pageToken = '';

    if (resetPageToken) {
      setNextPageToken(null);
      setVideos([]);
    } else {
      pageToken = nextPageToken ? '&pageToken=' + nextPageToken : '';
      console.log('pageToken', pageToken);
    }
  
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${newCoord.lat}%2C${newCoord.lng}&maxResults=10&order=date&locationRadius=100mi&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}${pageToken}`).then(result => {
      console.log(result?.data?.nextPageToken);

      if (resetPageToken) {
        setVideos(result?.data?.items);
      } else {
        const moreVideos = videos.concat(result?.data?.items || [])
        setVideos(moreVideos);
      }

      setNextPageToken(result?.data?.nextPageToken);
    });
  };

  useEffect(() => {
    fetchData(coord, false);
  }, []);

  console.log('videos', videos);

  return (
    <div className="App">
      <Row>
        <Col md={6}>
          <ReactGoogleMaps
            fetchData={fetchData}
            coord={coord}
            setCoord={setCoord}
          />
        </Col>
        <Col md={6} className="p-0 pl-3">
          <InfiniteScroll
            dataLength={videos.length}
            next={() => fetchData(coord, false)}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {videos.map((item) => (
              <Video videoId={item.id.videoId} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default App;
