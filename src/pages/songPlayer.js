import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MediaPlayer from "../components/MediaPlayer";
import axios from "axios";
const siteUrl = process.env.REACT_APP_SITE_URL;

function SongPlayer() {
  const { songId } = useParams();
  const [songData, setSongData] = useState([]);
  const [url, setUrl] = useState({});
  const [art, setArt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get song info
        const response = await axios.get(`${siteUrl}/songs/infoById/${songId}`);
        setSongData(response.data);

        if (response.data.artworkURL) {
          //if artwork exist get artwork
          await fetch(`${siteUrl}/songs/artById/${songId}`)
            .then((response) => response.blob())
            .then((blob) => {
              // Convert the blob to a data URL
              const reader = new FileReader();
              reader.onloadend = () => {
                setArt(reader.result);
              };
              reader.readAsDataURL(blob);
            });
        }

        const blob = await fetch(
          //get song
          `${siteUrl}/songs/songFileById/${songId}`
        ).then((response) => response.blob());
        const url = URL.createObjectURL(blob);
        setUrl(url);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchData();
  }, [songId]);

  const audioURL = url;
  return (
    <div className="card">
      {[songData].map((value, key) => (
        <div>
          <h1>{value.songTitle}</h1>
          <img
            className="rounded-t-lg w-full max-w-[600px] max-h-[300px]"
            src={
              art ||
              "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100"
            }
            alt={value.songTitle}
          />
          <MediaPlayer audioURL={audioURL} />
          <p className="mb-3 ml-6 font-normal text-left text-gray-700 dark:text-white">
            {value.artistName}
          </p>
          <p className="mb-3 ml-6 font-normal text-left text-gray-500">
            {value.albumTitle}
          </p>
          <div className="flex justify-between items-center text-left text-gray-500 ml-6">
            <span className="text-white">
              {value.year !== "0000-00-00" && value.year}
            </span>
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
