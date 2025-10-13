import React from 'react';
import { Link } from 'react-router-dom';
const HomePage = ({ contentType }) => {
    const accentTextClass = contentType === 'anime' ? 'text-accent-anime' : 'text-accent-manga';
    const accentBgClass = contentType === 'anime' ? 'bg-accent-anime' : 'bg-accent-manga';

    return (
        <div className="home-page">
            <div className="home-hero">
                <h1 className="home-title">
                    Welcome to Your Personal <span className={accentTextClass}>Zenshu</span>
                </h1>
                <p className="home-subtitle">
                    Discover, rank, and discuss your favorite anime and manga.
                </p>
                <div className="home-cta">
                    <Link to="/rankings" className={`button-primary ${accentBgClass}`}>
                        Get Started
                    </Link>
                </div>
            </div>
            <div className="home-features">
                <Link to="/rankings" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card">
                    <i className={`fa-solid fa-chart-bar feature-icon ${accentTextClass}`}></i>
                    <h3 className="feature-title">Top Content</h3>
                    <p>See what's trending with our up-to-date ranking lists.</p>
                </div>
                </Link>
                <Link to="/trending" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card">
                    <i className={`fa-solid fa-arrow-trend-up feature-icon ${accentTextClass}`}></i>
                    <h3 className="feature-title">Trending Now</h3>
                    <p>See what's popular right now in the anime and manga world.</p>
                </div>
                </Link>
                <Link to="/upcoming" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <div className="card">
                    <i className={`fa-solid fa-calendar-days feature-icon ${accentTextClass}`}></i>
                    <h3 className="feature-title">Upcoming</h3>
                    <p>Stay up-to-date with the latest releases.</p>
                </div>
                </Link>

            </div>
        </div>
    );
};

export default HomePage;