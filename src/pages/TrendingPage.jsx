import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

const TrendingPage = ({ contentType }) => {
    const navigate = useNavigate();
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = contentType === 'anime' 
                    ? 'https://api.jikan.moe/v4/seasons/now?limit=24'
                    : 'https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24';

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const sortedData = data.data.sort((a, b) => b.members - a.members);
                const uniqueData = Array.from(new Map(sortedData.map(item => [item.mal_id, item])).values());
                setTrending(uniqueData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, [contentType]);

    if (loading) return <PageWrapper title="Trending"><LoadingSpinner contentType={contentType} /></PageWrapper>;
    if (error) return <PageWrapper title="Trending"><p className="error-message">Error: {error}</p></PageWrapper>;

    const title = contentType === 'anime' ? "Trending This Season" : "Popular Manga";

    return (
        <PageWrapper title={title}>
            <div className="grid-container">
                {trending.map((item) => (
                    <div key={item.mal_id} onClick={() => navigate(`/details/${contentType}/${item.mal_id}`)} className="grid-item">
                        <div className="grid-item-content">
                            <img src={item.images.jpg.large_image_url} alt={item.title} className="grid-item-image" />
                            <div className="grid-item-overlay"></div>
                            <div className="grid-item-text">
                                <h3 className="grid-item-title">{item.title}</h3>
                                <div className="grid-item-score">
                                    <i className="fa-solid fa-star score-icon"></i>
                                    <span>{item.score || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default TrendingPage;