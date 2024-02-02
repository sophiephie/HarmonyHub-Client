import React from "react";
import ReactAudioPlayer from "react-audio-player";

const MediaPlayer = ({ audioURL }) => {
  return (
    <div>
      <ReactAudioPlayer src={audioURL} autoPlay={true} controls />
    </div>
  );
};

export default MediaPlayer;
