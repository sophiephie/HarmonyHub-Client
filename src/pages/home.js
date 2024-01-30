import React from "react";
import SongList from "../components/songList";

function Home() {
  return (
    <div className="outer">
      <div className="card">
        <SongList />
      </div>
    </div>
  );
}

export default Home;
