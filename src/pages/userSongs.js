import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SongList from "../components/songList";
import SearchBar from "../components/searchBar";
const siteUrl = process.env.REACT_APP_SITE_URL;

const UserSongs = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [username, setUsername] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${siteUrl}/songs/user/${userId}`);
        console.log(response);
        setFilteredSongs(response.data.songList);
        setUsername(response.data.songList[0].user.username);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = async (searchTerm) => {
    // Filter the songs based on the search term
    try {
      console.log(userId);
      const response = await axios.get(
        `${siteUrl}/songs/user/${userId}/search?keywords=${searchTerm}`
      );
      console.log(response);
      if (response.data.songList && response.data.songList.length > 0) {
        setFilteredSongs(response.data.songList);
      } else {
        setFilteredSongs([]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  return (
    <div className="outer">
      <div className="w-2/3 m-8">
        <h1 className="text-3xl font-bold mb-4">{`Songs added by ${username}`}</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="card">
        <SongList songs={filteredSongs} />
      </div>
    </div>
  );
};

export default UserSongs;
