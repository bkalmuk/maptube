import React from 'react';
import YouTube from 'react-youtube';

function Video() {
  const opts = {
    height: '100%',
    width: 'auto',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} />;
}

export default Video;