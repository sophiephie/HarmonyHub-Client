import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function UsersTab() {
    const [searchResults, setSearchResults] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/users/${values.searchQuery}`);
                setSearchResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        },
    });
    const editFormik = useFormik({
        initialValues: { username: '', displayName: '', email: '', password: '' },
        onSubmit: async (values) => {
            try {
                await axios.post(`/admin/user/${values.username}`, values);
                // Handle successful edit
                setEditingUser(null); // Close the edit form
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
    });

    const handleEditClick = (user) => {
        setEditingUser(user);
        editFormik.setValues(user);
    };
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
                            <button onClick={() => handleEditClick(user)}>Edit</button>
                        </div>
                    ))}
                </div>
            )}

            {editingUser && (
                <form onSubmit={editFormik.handleSubmit}>
                    {/* Edit form fields */}
                    <input
                        type="text"
                        name="username"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.username}
                    />
                    <input
                        type="text"
                        name="displayName"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.displayName}
                    /> <input
                        type="text"
                        name="email"
                        onChange={editFormik.handleChange}
                        value={editFormik.values.email}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
}

export default UsersTab;