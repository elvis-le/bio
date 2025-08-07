import React from 'react';

import { FaUserFriends, FaAngleDown, FaAngleUp, FaRegLifeRing, FaRegUserCircle, FaStore, FaPaintBrush, FaChartBar, FaRegHeart, FaRegCommentDots, FaLink, FaEdit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        
        <div className="sidebar-profile">
          <div className="profile-avatar">
            <img src="https://i.imgur.com/GfkG3s4.png" alt="Avatar" />
          </div>
          <span className="profile-name">elvisleproduct</span>
          <FaAngleDown />
        </div>
        <ul className="sidebar-menu">
          <li className="nav-group">
            <div className="nav-group-header">
              <FaUserFriends />
              <span>My Linktree</span>
              <FaAngleUp className="arrow" />
            </div>
            <ul className="nav-submenu">
              <li className="nav-item active">Links</li>
              <li className="nav-item">Shop</li>
              <li className="nav-item">Design</li>
            </ul>
          </li>
          <li className="nav-item">
            <FaUserFriends /> Audience
          </li>
          <li className="nav-item">
            <FaChartBar /> Insights
          </li>
        </ul>
        <div className="tools-section">
          <h4 className="tools-title">Tools</h4>
          <ul className="sidebar-menu">
            <li className="nav-item"><FaRegHeart /> Social planner</li>
            <li className="nav-item"><FaRegCommentDots /> Instagram auto-reply</li>
            <li className="nav-item"><FaLink /> Link shortener</li>
            <li className="nav-item"><FaEdit /> Post ideas</li>
          </ul>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-cta">
          <div className="cta-icon-plant">🌱</div>
          <div className="cta-text">
            <strong>New growth tools</strong>
            <span>Get started →</span>
          </div>
        </div>
        <div className="footer-actions">
          <FaRegLifeRing />
          <FaRegUserCircle />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;