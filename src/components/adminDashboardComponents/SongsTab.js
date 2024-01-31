import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function SongsTab() {
    const [searchResults, setSearchResults] = useState([]);

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/songs/${values.searchQuery}`);
                setSearchResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        },
    });
    return (
        <div>
            <p>Songs management area</p>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={formik.handleChange}
                    value={formik.values.searchQuery}
                    placeholder="Search Uploads by Username..."
                />
                <button type="submit">Search</button>
            </form>
            {/* Renders content if searchResults is greater than zero */}
            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((song) => (
                        <div key={song.id}>
                            <p>Song Title: {song.songTitle}</p>
                            <p>Artist Name: {song.artistName}</p>
                            <p>Album Title: {song.albumTitle}</p>
                            <p>Tags: {song.tags}</p>
                            <p>Year: {song.year}</p>
                            <p>Description: {song.description}</p>

                            <br />
                        </div>
                    ))}
                </div>
            )}
            {/* {searchResults.length === 0 && (
                <div>
                    <p>This User has not uploaded any songs</p>
                </div>
            )} */}
        </div>
    );
}

export default SongsTab;