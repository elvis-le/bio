import React from 'react';
import { FaPaintBrush, FaShareAlt, FaCog } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-logo">My Linktree</span>
      </div>
      <div className="header-right">
        <button className="btn-header">
          <FaPaintBrush /> Design
        </button>
        <button className="btn-header">
          <FaShareAlt /> Share
        </button>
        <button className="btn-icon">
          <FaCog />
        </button>
      </div>
    </header>
  );
};

export default Header;