import React from 'react';
import { NavLink as RouterNavLink, Outlet } from 'react-router-dom';

const Layout = ({ contentType, setContentType }) => {
    
    const NavLink = ({ to, label, iconClass }) => (
        <RouterNavLink
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}` }
        >
            <span className="nav-link-icon">
                <i className={iconClass}></i>
            </span>
            <span className="nav-link-text">{label}</span>
        </RouterNavLink>
    );
    
    const ContentTypeToggle = ({ type, label }) => (
        <button
            onClick={() => setContentType(type)}
            className={`content-toggle-button ${contentType === type ? 'active' : ''}`}
        >
            {label}
        </button>
    );

    return (
        <div className="layout-container">
            <nav className="sidebar">
                <div>
                    <div className="sidebar-header">
                       <div className="sidebar-logo">
                            <img src='https://raw.githubusercontent.com/StormAditya/OH_us/refs/heads/main/otakuhub/logo.jpg' alt="OtakuHub logo" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                       </div>
                       <h2 className="sidebar-title">Zenshu</h2>
                    </div>

                    <div className="content-toggle-container">
                        <div className="content-toggle">
                           <ContentTypeToggle type="anime" label="Anime" />
                           <ContentTypeToggle type="manga" label="Manga" />
                        </div>
                    </div>

                    <div className="nav-links">
                        <NavLink to="/" label="Home" iconClass="fa-solid fa-house" />
                        <NavLink to="/rankings" label="Rankings" iconClass="fa-solid fa-chart-bar" />
                        <NavLink to="/trending" label="Trending" iconClass="fa-solid fa-arrow-trend-up" />
                        <NavLink to="/search" label="Search" iconClass="fa-solid fa-magnifying-glass" />
                        <NavLink to="/upcoming" label="Upcoming" iconClass="fa-solid fa-calendar-days" />
                        <NavLink to="/websites" label="Websites" iconClass="fa-solid fa-globe" />
                        <NavLink to="/about" label="About" iconClass="fa-solid fa-circle-info" />
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <Outlet context={{ contentType }} />
            </main>
        </div>
    );
};

export default Layout;