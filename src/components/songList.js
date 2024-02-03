import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const siteUrl = process.env.REACT_APP_SITE_URL;

const SongList = ({ songs }) => {
  const [artworkUrls, setArtworkUrls] = useState({});

  useEffect(() => {
    // Fetch artwork URLs for each song
    const fetchArtworkUrls = async () => {
      const urls = {};
      await Promise.all(
        songs.map(async (song) => {
          if (song.artworkURL) {
            try {
              const response = await fetch(
                `${siteUrl}/songs/artById/${song.songId}`
              );
              if (response.ok) {
                const blob = await response.blob();
                const dataUrl = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.readAsDataURL(blob);
                });
                urls[song.songId] = dataUrl;
              } else {
                // Default image url on fetch error
                urls[song.songId] =
                  "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100";
              }
            } catch (error) {
              // Default image url on fetch error
              urls[song.songId] =
                "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100";
            }
          } else {
            // Default image url if artworkURL is not provided
            urls[song.songId] =
              "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100";
          }
        })
      );

      // Update state after all promises are resolved
      setArtworkUrls(urls);
    };

    fetchArtworkUrls();
  }, [songs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      {songs &&
        songs.map((song) => (
          <div
            key={song.songId}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/songs/${song.songId}`}>
              {artworkUrls[song.songId] ? (
                <img
                  className="h-80 rounded-t-lg w-full"
                  src={artworkUrls[song.songId]}
                  alt={song.songTitle}
                />
              ) : (
                <div className="h-80 w-full bg-gray-300 flex items-center justify-center">
                Placeholder Image
                </div>
              )}
            </Link>
            <div className="p-5">
              <Link to={`/songs/${song.songId}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {song.songTitle}
                </h5>
              </Link>
              <p className="mb-3 ml-6 font-normal text-left text-gray-700 dark:text-white">
                {song.artistName}
              </p>
              <p className="mb-3 ml-6 font-normal text-left text-gray-500">
                {song.albumtitle}
              </p>
              <div className="flex justify-between items-center text-left text-gray-500 ml-6">
                <span className="text-white">{song.year}</span>
              </div>
              <div className="mt-2 ml-6">
                <p className="text-left text-white">{song.description}</p>
              </div>
              <div className="mt-2 ml-6 flex items-center text-left text-gray-500">
                <span className="text-gray-500">Uploaded by </span>
                <Link
                  to={`/users/${song.userId}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {`${song.user.username}`}
                </Link>
              </div>
              <div className="mt-4 ml-6">
                <Link
                  to={`/songs/${song.songId}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Listen
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongList;
