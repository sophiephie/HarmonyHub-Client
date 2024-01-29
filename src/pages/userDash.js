import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const [songList, setSongList] = useState([]);
  const [showPassChange, setShowPassChange] = useState(false);
  const togglePassChange = () => {
    setShowPassChange(!showPassChange);
  };
  const [updateInfo, setUpdateInfo] = useState(false);
  const toggleUpdateInfo = () => {
    setUpdateInfo(!updateInfo);
  };
  useEffect(() => {
    try {
      //GET user info
      axios
        .get("http://localhost:3001/users/dashboard", {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setUserInfo(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
    try {
      //GET song by userId
      axios
        .get("http://localhost:3001/songs/dashboard", {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setSongList(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="outer">
      <h1>Welcome to your dashboard</h1>
      <p>I swear I will make this look ok, some how.</p>
      <div className="card">
        <h2>Your Info</h2>
        {userInfo.map((value, key) => {
          return (
            <div>
              {updateInfo ? (
                <div>
                  <label>Username:</label>
                  <input type="text" name="username" />
                  <label>Displayname:</label>
                  <input type="text" name="displayname" />
                  <label>Email:</label>
                  <input type="text" name="email" />
                  <label>Enter password:</label>
                  <input type="password" name="password" />
                  <button onClick={toggleUpdateInfo} type="submit">
                    Update
                  </button>
                  <button onClick={toggleUpdateInfo}>Cancel</button>
                </div>
              ) : (
                <div>
                  <label>Username:</label>
                  <p>{value.username}</p>
                  <label>Displayname: </label>
                  <p>{value.displayName}</p>
                  <label>Email:</label>
                  <p>{value.email}</p>
                  <button onClick={toggleUpdateInfo}>Update</button>
                </div>
              )}

              {showPassChange ? (
                <div>
                  <label>Old password:</label>
                  <input type="password" />
                  <label>New password:</label>
                  <input type="password" />
                  <button type="submit">Change Password</button>
                  <button onClick={togglePassChange}>Cancel</button>
                </div>
              ) : (
                <button onClick={togglePassChange}>Change Password</button>
              )}
            </div>
          );
        })}
      </div>
      <div className="card">
        <h2>Your Songs</h2>
        {songList.map((value, key) => {
          return (
            <div>
              <label>Title:</label>
              <p>{value.songTitle}</p>
              <label>Song Data</label>
              {/* button to change? */}
              <label>Artowrk</label>
              {/* display image and button to change? */}
              <label>Artist: </label>
              <p>{value.artistName}</p>
              <label>Album:</label>
              <p>{value.albumName}</p>
              <label>Tags:</label>
              <p>{value.tags}</p>
              <label>Year:</label>
              <p>{value.year}</p>
              <label>Description:</label>
              <p>{value.description}</p>
              <button>Update Song Info</button>
              {/* link to song info update page? */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
