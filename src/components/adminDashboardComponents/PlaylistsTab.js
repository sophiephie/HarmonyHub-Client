import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function PlaylistsTab() {
    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.get(`/admin/search?query=${encodeURIComponent(values.searchQuery)}`);
                // Process your search results here
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        },
    });
    return (
        <div>
            <p>Playlists management area</p>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={formik.handleChange}
                    value={formik.values.searchQuery}
                    placeholder="Search Playlists by Username..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default PlaylistsTab;