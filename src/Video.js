import React from 'react';
import YouTube from 'react-youtube';

function Video(props) {
  const opts = {
    height: 'auto',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return <YouTube videoId={props.videoId} opts={opts} onReady={onReady} />;
}

export default Video;