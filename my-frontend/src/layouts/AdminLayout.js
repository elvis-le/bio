import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/admin/Header'; 
import MobilePreview from '../components/admin/MobilePreview';
import { DUMMY_LINKS, DUMMY_PROFILE } from '../utils/DUMMY_DATA';
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
    const [profile] = useState(DUMMY_PROFILE);
    const [links, setLinks] = useState(DUMMY_LINKS);

    return (
        <div className="app-container">
            <Sidebar />
            <Header /> 
            <div className="admin-layout-content">
                <main className="main-content">
                    <Outlet context={{ profile, links }} />
                </main>
                <aside className="preview-section">
                    <MobilePreview profile={profile} links={links} />
                </aside>
            </div>
        </div>
    );
};

export default AdminLayout;