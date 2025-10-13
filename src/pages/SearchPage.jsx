import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
const SearchPage = ({ contentType }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    
    const accentTextClass = contentType === 'anime' ? 'text-accent-anime' : 'text-accent-manga';
    const accentBgClass = contentType === 'anime' ? 'bg-accent-anime' : 'bg-accent-manga';

    useEffect(() => {
        setSearchTerm(''); setType(''); setStatus('');
        setRating(''); setSelectedGenre(''); setResults([]);
        setCurrentPage(1); setHasNextPage(false);
    }, [contentType]);
    
    const commonGenres = [
        { mal_id: 1, name: 'Action' }, { mal_id: 2, name: 'Adventure' }, { mal_id: 4, name: 'Comedy' },
        { mal_id: 8, name: 'Drama' }, { mal_id: 10, name: 'Fantasy' }, { mal_id: 14, name: 'Horror' },
        { mal_id: 7, name: 'Mystery' }, { mal_id: 22, name: 'Romance' }, { mal_id: 24, name: 'Sci-Fi' },
        { mal_id: 36, name: 'Slice of Life' }, { mal_id: 30, name: 'Sports' }, { mal_id: 37, name: 'Supernatural' }
    ];

    useEffect(() => {
        const hasActiveSearch = searchTerm.length >= 3 || type || status || rating || selectedGenre;
        if (!hasActiveSearch) {
            setResults([]);
            setHasNextPage(false);
            return;
        }

        const handleSearch = (page = 1) => {
            setLoading(true);
            setError(null);

            let apiUrl = `https://api.jikan.moe/v4/${contentType}?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            if (type) apiUrl += `&type=${type}`;
            if (status) apiUrl += `&status=${status}`;
            if (rating && contentType === 'anime') apiUrl += `&rating=${rating}`;
            if (selectedGenre) apiUrl += `&genres=${selectedGenre}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    const newItems = data.data || [];
                    setResults(prev => {
                        const combined = page === 1 ? newItems : [...prev, ...newItems];
                        return Array.from(new Map(combined.map(item => [item.mal_id, item])).values());
                    });
                    setHasNextPage(data.pagination?.has_next_page);
                    setCurrentPage(page);
                })
                .catch(e => setError(e.message))
                .finally(() => setLoading(false));
        };

        const debounceTimeout = setTimeout(() => handleSearch(1), 500);
        return () => clearTimeout(debounceTimeout);
    }, [searchTerm, type, status, rating, selectedGenre, contentType]);
    
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setLoading(true);
        setError(null);
        
        let apiUrl = `https://api.jikan.moe/v4/${contentType}?q=${encodeURIComponent(searchTerm)}&page=${nextPage}`;
        if (type) apiUrl += `&type=${type}`;
        if (status) apiUrl += `&status=${status}`;
        if (rating && contentType === 'anime') apiUrl += `&rating=${rating}`;
        if (selectedGenre) apiUrl += `&genres=${selectedGenre}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const newItems = data.data || [];
                setResults(prev => {
                    const combined = [...prev, ...newItems];
                    return Array.from(new Map(combined.map(item => [item.mal_id, item])).values());
                });
                setHasNextPage(data.pagination?.has_next_page);
                setCurrentPage(nextPage);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    };
    
    const hasActiveSearch = searchTerm.length >= 3 || type || status || rating || selectedGenre;

    return (
        <PageWrapper title={`Search for ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}>
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder={`Search for ${contentType}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <i className="fa-solid fa-magnifying-glass search-input-icon"></i>
            </div>

            <div className="filter-grid">
                 {contentType === 'anime' ? (
                     <select value={type} onChange={e => setType(e.target.value)} className="filter-select">
                        <option value="">All Types</option>
                        <option value="tv">TV</option><option value="movie">Movie</option><option value="ova">OVA</option>
                        <option value="special">Special</option><option value="ona">ONA</option><option value="music">Music</option>
                    </select>
                ) : (
                    <select value={type} onChange={e => setType(e.target.value)} className="filter-select">
                        <option value="">All Types</option>
                        <option value="manga">Manga</option><option value="novel">Novel</option><option value="lightnovel">Light Novel</option>
                        <option value="oneshot">One-shot</option><option value="doujin">Doujin</option><option value="manhwa">Manhwa</option>
                        <option value="manhua">Manhua</option>
                    </select>
                )}
                {contentType === 'anime' ? (
                    <select value={status} onChange={e => setStatus(e.target.value)} className="filter-select">
                        <option value="">All Statuses</option>
                        <option value="airing">Airing</option><option value="complete">Finished</option><option value="upcoming">Upcoming</option>
                    </select>
                ) : (
                    <select value={status} onChange={e => setStatus(e.target.value)} className="filter-select">
                        <option value="">All Statuses</option>
                        <option value="publishing">Publishing</option><option value="complete">Finished</option><option value="hiatus">Hiatus</option>
                        <option value="discontinued">Discontinued</option><option value="upcoming">Upcoming</option>
                    </select>
                )}
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} className="filter-select">
                    <option value="">All Genres</option>
                    {commonGenres.map(genre => <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>)}
                </select>
                {contentType === 'anime' && (
                    <select value={rating} onChange={e => setRating(e.target.value)} className="filter-select">
                        <option value="">All Ratings</option>
                        <option value="g">G - All Ages</option><option value="pg">PG - Children</option><option value="pg13">PG-13 - Teens</option>
                        <option value="r17">R - 17+</option><option value="r">R+</option><option value="rx">Rx</option>
                    </select>
                )}
            </div>

            <div className="card card-list-wrapper">
                {loading && results.length === 0 && <LoadingSpinner contentType={contentType} />}
                {error && <p className="error-message">Error: {error}</p>}
                {!loading && !error && (
                    <>
                        {results.length > 0 ? (
                             <ul className="list">
                                {results.map(item => (
                                    <li key={item.mal_id} onClick={() => navigate(`/details/${contentType}/${item.mal_id}`)} className="list-item-search">
                                        <img src={item.images.jpg.image_url} alt={item.title} className="list-item-image-search" />
                                        <div>
                                            <h3 className={`list-item-title-search ${accentTextClass}`}>{item.title}</h3>
                                            <p className="list-item-subtitle">{item.type} ({item.year || 'N/A'}) - {contentType === 'anime' ? `${item.episodes || '?'} eps` : `${item.chapters || '?'} ch`}</p>
                                            <p className="synopsis-preview">{item.synopsis ? item.synopsis.substring(0, 150) + '...' : 'No synopsis available.'}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : hasActiveSearch ? (
                            <div className="empty-state"><p>No results found for your criteria.</p></div>
                        ) : (
                            <div className="empty-state"><p>Enter a search term or select a filter to begin.</p></div>
                        )}
                    </>
                )}
            </div>
             {hasNextPage && (
                <div className="load-more-container">
                    <button onClick={handleLoadMore} disabled={loading} className={`button-primary ${accentBgClass}`}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </PageWrapper>
    );
};

export default SearchPage;