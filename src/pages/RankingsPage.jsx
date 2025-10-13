import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

const RankingsPage = ({ contentType }) => {
    const navigate = useNavigate();
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        setFilter('all');
        setRankings([]);
        setCurrentPage(1);
    }, [contentType]);
    
    useEffect(() => {
        if (currentPage === 1 && rankings.length > 0) {
           setRankings([]);
        }
        const fetchRankings = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = `https://api.jikan.moe/v4/top/${contentType}`;
                let params = `?page=${currentPage}`;
                if (filter === 'airing' && contentType === 'anime') params += '&filter=airing';
                if (filter === 'publishing' && contentType === 'manga') params += '&filter=publishing';
                if (filter === 'novels' && contentType === 'manga') params += '&type=novel';

                const response = await fetch(url + params);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                
                const newItems = data.data || [];
                setRankings(prev => {
                    const combined = currentPage === 1 ? newItems : [...prev, ...newItems];
                    const uniqueItems = Array.from(new Map(combined.map(item => [item.mal_id, item])).values());
                    return uniqueItems;
                });
                setHasNextPage(data.pagination?.has_next_page);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRankings();
    }, [filter, contentType, currentPage]);
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    
    const accentTextClass = contentType === 'anime' ? 'text-accent-anime' : 'text-accent-manga';
    const accentBgClass = contentType === 'anime' ? 'bg-accent-anime' : 'bg-accent-manga';

    const FilterButton = ({ type, label }) => (
        <button
            onClick={() => handleFilterChange(type)}
            className={`filter-button ${filter === type ? `active ${accentBgClass}` : ''}`}
        >
            {label}
        </button>
    );

    return (
        <PageWrapper title={`Top ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}>
            <div className="filter-controls">
                <FilterButton type="all" label="Top Overall" />
                {contentType === 'anime' && <FilterButton type="airing" label="Top Airing" />}
                {contentType === 'manga' && (
                    <>
                        <FilterButton type="publishing" label="Top Publishing" />
                        <FilterButton type="novels" label="Top Light Novels" />
                    </>
                )}
            </div>
            {loading && rankings.length === 0 ? <LoadingSpinner contentType={contentType} /> : error ? <p className="error-message">Error: {error}</p> : (
               <>
                <div className="card card-list-wrapper">
                    <ul className="list">
                        {rankings.map((item, index) => (
                            <li key={item.mal_id} onClick={() => navigate(`/details/${contentType}/${item.mal_id}`)} className="list-item">
                                <div className="list-item-main">
                                    <span className={`list-item-rank ${accentTextClass}`}>{item.rank || '#'}</span>
                                    <img src={item.images.jpg.image_url} alt={item.title} className="list-item-image" />
                                    <div>
                                        <p className="list-item-title">{item.title}</p>
                                        <p className="list-item-subtitle">{item.type} - {contentType === 'anime' ? `${item.episodes || '?'} eps` : `${item.volumes || '?'} vols`}</p>
                                    </div>
                                </div>
                                <div className="list-item-details">
                                   <div className="score">
                                       <i className="fa-solid fa-star score-icon"></i> {item.score}
                                   </div>
                                   <div className="members">{item.members.toLocaleString()} members</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {hasNextPage && (
                    <div className="load-more-container">
                        <button onClick={handleLoadMore} disabled={loading} className={`button-primary ${accentBgClass}`}>
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
               </>
            )}
        </PageWrapper>
    );
};

export default RankingsPage;