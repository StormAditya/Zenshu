import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageWrapper = ({ title, children, showBackButton }) => {
    const navigate = useNavigate();
    return (
        <div className="page-wrapper">
            <div className="page-header">
                 {showBackButton && (
                    <button onClick={() => navigate(-1)} className="back-button">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}
                <h1 className="page-title">{title}</h1>
            </div>
            {children}
        </div>
    );
}

export default PageWrapper;