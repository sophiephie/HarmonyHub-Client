import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function UsersTab() {
    const [searchResults, setSearchResults] = useState([]);

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.get(`/admin/search?query=${encodeURIComponent(values.searchQuery)}`);
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
            <p>Users management area</p>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={formik.handleChange}
                    value={formik.values.searchQuery}
                    placeholder="Search Users by Username..."
                />
                <button type="submit">Search</button>
            </form>

            {/* Renders content if searchResults is greater than zero */}
            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((user) => (
                        <div key={user.id}>
                            <p>Username: {user.username}</p>
                            <p>Display Name: {user.displayName}</p>
                            <p>Email: {user.email}</p>
                            <p>Password: {user.password}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UsersTab;