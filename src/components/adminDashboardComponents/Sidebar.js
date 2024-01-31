import React from 'react';

function Sidebar({ setActiveTab }) {
    return (
        <div className="sidebar">
            <p>Manage</p>
            <button onClick={() => setActiveTab('users')}>Users</button>
            <button onClick={() => setActiveTab('songs')}>Songs</button>
            <button onClick={() => setActiveTab('playlists')}>Playlists</button>
        </div>
    );
}

export default Sidebar;