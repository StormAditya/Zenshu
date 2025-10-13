import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

const UpcomingPage = ({ contentType }) => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accentTextClass = contentType === 'anime' ? 'text-accent-anime' : 'text-accent-manga';

    useEffect(() => {
        const fetchUpcoming = async () => {
            setLoading(true);
            setError(null);
            try {
                 const url = contentType === 'anime' 
                    ? 'https://api.jikan.moe/v4/seasons/upcoming'
                    : 'https://api.jikan.moe/v4/top/manga?filter=upcoming';

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const uniqueData = Array.from(new Map(data.data.map(item => [item.mal_id, item])).values());
                setSchedule(uniqueData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUpcoming();
    }, [contentType]);
    
    if (loading) return <PageWrapper title={`Upcoming ${contentType}`}><LoadingSpinner contentType={contentType} /></PageWrapper>;
    if (error) return <PageWrapper title={`Upcoming ${contentType}`}><p className="error-message">Error: {error}</p></PageWrapper>;
    
    return (
        <PageWrapper title={`Upcoming ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}>
            <div className="card card-list-wrapper">
                <div className="list-upcoming">
                    {schedule.map((item) => (
                        <div key={item.mal_id} onClick={() => navigate(`/details/${contentType}/${item.mal_id}`)} className="list-item-upcoming">
                            <div className="upcoming-date-col">
                                <p className={`upcoming-date ${accentTextClass}`}>{item.aired?.string || item.published?.string || 'TBA'}</p>
                            </div>
                            <div className="upcoming-info-col">
                                <h3 className="list-item-title">{item.title}</h3>
                                <p className="list-item-subtitle">{contentType === 'anime' ? (item.studios?.map(s => s.name).join(', ') || 'Unknown Studio') : (item.authors?.map(a => a.name).join(', ') || 'Unknown Author')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default UpcomingPage;