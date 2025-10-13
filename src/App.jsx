import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Layout, Pages, and other components
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RankingsPage from './pages/RankingsPage';
import TrendingPage from './pages/TrendingPage';
import SearchPage from './pages/SearchPage';
import UpcomingPage from './pages/UpcomingPage';
import WebsitesPage from './pages/WebsitesPage';
import AboutPage from './pages/AboutPage';
import DetailsPage from './pages/DetailsPage';

export default function App() {
    const [contentType, setContentType] = useState('anime');

    // Effect to add Font Awesome stylesheet
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); };
    }, []);

    return (
        <BrowserRouter>
            <div className={`app-container ${contentType}`}>
                <Routes>
                    <Route path="/" element={<Layout contentType={contentType} setContentType={setContentType} />}>
                        <Route index element={<HomePage contentType={contentType} />} />
                        <Route path="rankings" element={<RankingsPage contentType={contentType} />} />
                        <Route path="trending" element={<TrendingPage contentType={contentType} />} />
                        <Route path="search" element={<SearchPage contentType={contentType} />} />
                        <Route path="upcoming" element={<UpcomingPage contentType={contentType} />} />
                        <Route path="websites" element={<WebsitesPage contentType={contentType} />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="details/:contentType/:id" element={<DetailsPage />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}