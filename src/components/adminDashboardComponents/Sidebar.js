import React from 'react';

function Sidebar({ setActiveTab }) {
    return (
        <div className="sidebar">
            <p>Manage</p>
            <button onClick={() => setActiveTab('users')}>Users</button>
            <br />
            <button onClick={() => setActiveTab('songs')}>Songs</button>
        </div>
    );
}

export default Sidebar;