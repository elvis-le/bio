import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaPlus } from 'react-icons/fa';
import LinkItem from '../../components/admin/LinkItem';

const AdminLinksPage = () => {
    const { profile, links } = useOutletContext();
    return (
        <div className="admin-links-page">
            <header className="page-header">
                <div className="profile-info">
                    <img src={profile.avatar} alt="Profile" className="profile-avatar" />
                    <div className="profile-details">
                        <h1 className="profile-name">@{profile.name}</h1>
                        <p className="profile-bio">{profile.bio}</p>
                        <div className="social-icons">
                            <FaInstagram />
                            <FaTiktok />
                            <FaPlus />
                        </div>
                    </div>
                </div>
            </header>

            <div className="add-actions">
                <button className="btn btn-primary">
                    <FaPlus /> Add
                </button>
                 <button className="btn btn-secondary">
                    Add collection
                </button>
            </div>

            <div className="links-list">
                {links.map(link => (
                    <LinkItem key={link.id} link={link} />
                ))}
            </div>
        </div>
    );
};

export default AdminLinksPage;