import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
const siteUrl = process.env.REACT_APP_SITE_URL;

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
    },
});

function SongsTab() {
    const [searchResults, setSearchResults] = useState([]);
    const [editingSong, setEditingSong] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Called after saving an edit or deleting a song
    async function performSearch(query) {
        try {
            const response = await axiosInstance.get(`${siteUrl}/admin/songs/${query}`);
            if (response.data.error) {
                setErrorMessage(response.data.error); // Set error message if the response contains an error
                setSearchResults([]);
            } else {
                setSearchResults(response.data);
                setErrorMessage(''); // Clear any existing error message
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    }

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            if (!editingSong) {  // Prevent search when editing
                try {
                    const response = await axiosInstance.get(`${siteUrl}/admin/songs/${values.searchQuery}`);
                    // setSearchResults(response.data);
                    if (response.data.error) {
                        setErrorMessage(response.data.error); // Set error message if the response contains an error
                        setSearchResults([]);
                    } else {
                        setSearchResults(response.data);
                        setErrorMessage(''); // Clear any existing error message
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setSearchResults([]);
                }
            }
        },
    });

    const editFormik = useFormik({
        initialValues: { songTitle: '', artistName: '', albumTitle: '', tags: '', year: '', description: '', id: '' },
        onSubmit: async (values) => {
            try {
                await axiosInstance.put(`${siteUrl}/admin/songs/${values.id}`, values);
                setEditingSong(null);  // Reset editing mode
                performSearch(formik.values.searchQuery);  // Re-fetch search results to show updated data
            } catch (error) {
                console.error('Error updating song:', error);
            }
        },
    });

    const deleteSong = async (songId) => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            try {
                await axiosInstance.delete(`${siteUrl}/admin/songs/${songId}`);
                setEditingSong(null);
                performSearch(formik.values.searchQuery); // Refresh search results after deletion
            } catch (error) {
                console.error('Error deleting song:', error);
            }
        }
    };

    const handleEditClick = (song) => {
        setEditingSong(song);  // Set the current song to edit mode
        editFormik.setValues({ ...song, id: song.id });  // Populate edit form with song data
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-white">Songs Management Area</h2>
            {!editingSong && (
                <>
                    <form onSubmit={formik.handleSubmit} className="mb-4">
                        <input
                            className="border rounded py-2 px-3 mr-2 text-white"
                            type="text"
                            name="searchQuery"
                            onChange={formik.handleChange}
                            value={formik.values.searchQuery}
                            placeholder="Search Uploads by Username..."
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Search
                        </button>
                    </form>

                    {searchResults.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {searchResults.map((song) => (
                                <div key={song.id} className="border p-4 rounded shadow">
                                    <p><strong>Song Title:</strong> {song.songTitle}</p>
                                    <p><strong>Artist Name:</strong> {song.artistName}</p>
                                    <p><strong>Album Title:</strong> {song.albumTitle}</p>
                                    <p><strong>Tags:</strong> {song.tags}</p>
                                    <p><strong>Year:</strong> {song.year}</p>
                                    <p><strong>Description:</strong> {song.description}</p>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mt-2" onClick={() => handleEditClick(song)}>Edit</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {editingSong && (
                <form onSubmit={editFormik.handleSubmit} className="space-y-4 text-white">
                    <input
                        className="border rounded py-2 px-3 w-full "
                        type="text"
                        name="songTitle"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.songTitle}
                        placeholder="Song Title"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="artistName"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.artistName}
                        placeholder="Artist Name"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="albumTitle"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.albumTitle}
                        placeholder="Album Title"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="tags"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.tags}
                        placeholder="Tags"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="year"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.year}
                        placeholder="Year"
                    />
                    <textarea
                        className="border rounded py-2 px-3 w-full"
                        name="description"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.description}
                        placeholder="Description"
                    />
                    <div className="flex justify-between">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => deleteSong(editFormik.values.songId)}>Delete</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setEditingSong(null)}>Cancel</button>
                    </div>
                </form>
            )}
            {errorMessage && ( // Conditionally render the error message
                <div className="text-red-500">{errorMessage}</div>
            )}
        </div>
    );
}


export default SongsTab;