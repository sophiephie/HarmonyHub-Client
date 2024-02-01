import React from "react";
import ReactAudioPlayer from "react-audio-player";

const MediaPlayer = ({ audioURL }) => {
  return (
    <div>
      <h2>Song Player</h2>
      <ReactAudioPlayer src={audioURL} autoPlay={true} controls />
    </div>
  );
};

export default MediaPlayer;
