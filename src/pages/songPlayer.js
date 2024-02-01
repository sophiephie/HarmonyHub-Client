import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MediaPlayer from "../components/MediaPlayer";
import axios from "axios";

function SongPlayer() {
  const { songId } = useParams();
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/songs/byId/${songId}`
        );
        setSongData(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSong();
  }, [songId]);
  const audioURL = "/BaconPancake.mp3"; // test url replace with fetched url from database
  return (
    <div className="card">
      {[songData].map((value, key) => (
        <div>
          <h1>{value.songTitle}</h1>
          <img
            className="rounded-t-lg w-full"
            src={
              value.artworkURL ||
              "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100"
            }
            alt={value.songTitle}
          />
          <MediaPlayer audioURL={audioURL} />
          <p className="mb-3 ml-6 font-normal text-left text-gray-700 dark:text-white">
            {value.artistName}
          </p>
          <p className="mb-3 ml-6 font-normal text-left text-gray-500">
            {value.albumtitle}
          </p>
          <div className="flex justify-between items-center text-left text-gray-500 ml-6">
            <span className="text-white">{value.year}</span>
          </div>
          <div className="mt-2 ml-6">
            <p className="text-left text-white">{value.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongPlayer;
