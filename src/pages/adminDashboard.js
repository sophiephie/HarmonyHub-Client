import React, { useState } from 'react';
import Sidebar from './adminDashboardComponents/Sidebar';
import UsersTab from './adminDashboardComponents/UsersTab';
import SongsTab from './adminDashboardComponents/SongsTab';
import PlaylistsTab from './adminDashboardComponents/PlaylistsTab';
import '../App.css';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('users');

    let content;
    switch (activeTab) {
        case 'users':
            content = <UsersTab />;
            break;
        case 'songs':
            content = <SongsTab />;
            break;
        case 'playlists':
            content = <PlaylistsTab />;
            break;
        default:
            content = <div>Select a tab</div>;
    }

    return (
        <div className="dashboard">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="content">{content}</div>
        </div>
    );
}

export default Dashboard;