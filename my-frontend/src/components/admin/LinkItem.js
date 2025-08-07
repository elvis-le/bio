import React from 'react';
import {
    FiGrid, FiLink, FiEdit2, FiShare2, FiTrash2, FiMoreVertical,
    FiGrid as FiGridAlt, FiArrowRight, FiImage, FiStar, FiClock, FiLock, FiBarChart2
} from 'react-icons/fi';

const LinkItem = ({ link }) => {
    return (
        <div className="link-item">
            <div className="link-row top-row">
                <div className="drag-handle">
                    <FiGrid />
                </div>
                <h3 className="link-title">
                    {link.title} <FiEdit2 className="edit-icon" />
                </h3>
                <div className="top-actions">
                    <button className="btn-icon"><FiShare2 /></button>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={link.enabled} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div className="link-row middle-row">
                <div className="drag-handle-placeholder"></div> 
                <a href={link.url} className="link-url">
                    {link.url} <FiEdit2 className="edit-icon" />
                </a>
            </div>
            <div className="link-row bottom-row">
                <div className="drag-handle-placeholder"></div> 
                <div className="bottom-actions">
                    <button className="btn-icon"><FiGridAlt /></button>
                    <button className="btn-icon"><FiArrowRight /></button>
                    <button className="btn-icon highlight"><FiImage /></button>
                    <button className="btn-icon"><FiStar /></button>
                    <button className="btn-icon"><FiClock /></button>
                    <button className="btn-icon"><FiLock /></button>
                    <button className="btn-icon"><FiBarChart2 /></button>
                    <span>{link.clicks} clicks</span>
                </div>
                <button className="btn-icon delete-action">
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};

export default LinkItem;