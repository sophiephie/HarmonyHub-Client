import React, { useState, useEffect } from "react";
import axios from "axios";
import SongList from "../components/songList";
import SearchBar from "../components/searchBar";

const Discover = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/songs");
        setFilteredSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = async (searchTerm) => {
    // Filter the songs based on the search term
    try {
      const response = await axios.get(
        `http://localhost:3001/songs/search?keywords=${searchTerm}`
      );
      console.log(response);
      if (response.data.songs && response.data.songs.length > 0) {
        setFilteredSongs(response.data.songs);
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
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="card">
        <SongList songs={filteredSongs} />
      </div>
    </div>
  );
};

export default Discover;
