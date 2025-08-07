import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const MobilePreview = ({ profile, links }) => {
    return (
        <div className="mobile-preview-wrapper">
            <div className="mobile-preview">
                <div className="mobile-preview__header">
                    <img src={profile.avatar} alt="Profile" className="mobile-avatar" />
                    <h2 className="mobile-username">@{profile.name}</h2>
                    <div className="mobile-social-icons">
                        <FaInstagram />
                        <FaTiktok />
                    </div>
                </div>
                <div className="mobile-preview__links">
                    {links.filter(link => link.enabled).map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="mobile-link-button">
                            {link.thumbnail && <img src={link.thumbnail} alt="" className="link-button-thumb" />}
                            <span>{link.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobilePreview;