import React from 'react';

const LoadingSpinner = ({ contentType = 'anime' }) => {
    const spinnerClass = contentType === 'anime' ? 'spinner-anime' : 'spinner-manga';
    return (
        <div className="loading-spinner-container">
            <div className={`loading-spinner ${spinnerClass}`}></div>
        </div>
    );
};

export default LoadingSpinner;