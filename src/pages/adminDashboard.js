import React, { useState } from 'react';
import Sidebar from '../components/adminDashboardComponents/Sidebar';
import UsersTab from '../components/adminDashboardComponents/UsersTab';
import SongsTab from '../components/adminDashboardComponents/SongsTab';
import PlaylistsTab from '../components/adminDashboardComponents/PlaylistsTab';
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