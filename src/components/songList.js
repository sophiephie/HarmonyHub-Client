import React from "react";
import { Link } from "react-router-dom";

const SongList = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      {songs && songs.map((song) => (
        <div
          key={song.songId}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/songs/${song.songId}`}>
            <img
              className="rounded-t-lg w-full"
              src={
                song.artworkURL ||
                "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=100"
              }
              alt={song.songTitle}
            />
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
