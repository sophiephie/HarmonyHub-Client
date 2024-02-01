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

function UsersTab() {
    const [searchResults, setSearchResults] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    async function performSearch(query) {
        try {
            const response = await axiosInstance.get(`${siteUrl}/admin/users/${query}`);
            setSearchResults(response.data);
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
            if (!editingUser) { // Only perform search if not in editing mode
                try {
                    const response = await axiosInstance.get(`${siteUrl}/admin/users/${values.searchQuery}`);
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
        initialValues: { username: '', displayName: '', email: '', id: '' },
        onSubmit: async (values) => {
            try {
                await axiosInstance.put(`${siteUrl}/admin/users/${values.id}`, values);
                setEditingUser(null); // Close the edit form and clear editing mode
                performSearch(formik.values.searchQuery); // Re-fetch search results to reflect the updated data
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
    });

    const deleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axiosInstance.delete(`${siteUrl}/admin/users/${userId}`);
                setEditingUser(null);
                performSearch(formik.values.searchQuery); // Re-fetch search results to update the list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        editFormik.setValues(user);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-white">Users Management Area</h2>
            {!editingUser && (
                <>
                    <form onSubmit={formik.handleSubmit} className="mb-4">
                        <input
                            className="border rounded py-2 px-3 mr-2 w-full md:w-auto"
                            type="text"
                            name="searchQuery"
                            onChange={formik.handleChange}
                            value={formik.values.searchQuery}
                            placeholder="Search Users by Username..."
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Search
                        </button>
                    </form>

                    {searchResults.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {searchResults.map((user) => (
                                <div key={user.id} className="border p-4 rounded shadow">
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>Display Name:</strong> {user.displayName}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mt-2" onClick={() => handleEditClick(user)}>Edit</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {editingUser && (
                <form onSubmit={editFormik.handleSubmit} className="space-y-4">
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="username"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.username}
                        placeholder="Username"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="displayName"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.displayName}
                        placeholder="Display Name"
                    />
                    <input
                        className="border rounded py-2 px-3 w-full"
                        type="text"
                        name="email"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.email}
                        placeholder="Email"
                    />
                    <div className="flex justify-between">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => deleteUser(editFormik.values.userId)}>Delete</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                    </div>
                </form>
            )}
            {errorMessage && ( // Step 3: Conditionally render the error message
                <div className="text-red-500">{errorMessage}</div>
            )}
        </div>
    );
}

export default UsersTab;