import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
const DetailsPage = () => {
    const { id, contentType } = useParams();
    const [details, setDetails] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || !contentType) return;
        
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const [detailsRes, charactersRes, reviewsRes] = await Promise.all([
                    fetch(`https://api.jikan.moe/v4/${contentType}/${id}/full`),
                    fetch(`https://api.jikan.moe/v4/${contentType}/${id}/characters`),
                    fetch(`https://api.jikan.moe/v4/${contentType}/${id}/reviews`)
                ]);

                if (!detailsRes.ok) throw new Error('Failed to fetch details.');
                
                const detailsData = await detailsRes.json();
                const charactersData = charactersRes.ok ? await charactersRes.json() : { data: [] };
                const reviewsData = reviewsRes.ok ? await reviewsRes.json() : { data: [] };

                setDetails(detailsData.data);
                setCharacters(charactersData.data);
                setReviews(reviewsData.data);

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, contentType]);

    if (loading) return <PageWrapper title="" showBackButton><LoadingSpinner contentType={contentType} /></PageWrapper>;
    if (error) return <PageWrapper title="Error" showBackButton><p className="error-message">Error: {error}</p></PageWrapper>;
    if (!details) return <PageWrapper title="Not Found" showBackButton><p>No details found.</p></PageWrapper>;

    const InfoField = ({ label, value }) => value ? <p><strong>{label}:</strong> {value}</p> : null;

    return (
        <PageWrapper title={details.title_english || details.title} showBackButton>
            <div className="details-layout">
                <div className="details-left-col">
                    <img src={details.images.jpg.large_image_url} alt={details.title} className="details-main-image" />
                    <div className="card info-card">
                        <h3 className="info-card-title">Information</h3>
                        <InfoField label="Type" value={details.type} />
                        {contentType === 'anime' ? (
                            <>
                                <InfoField label="Episodes" value={details.episodes} />
                                <InfoField label="Status" value={details.status} />
                                <InfoField label="Aired" value={details.aired?.string} />
                                <InfoField label="Rating" value={details.rating} />
                            </>
                        ) : (
                            <>
                                <InfoField label="Volumes" value={details.volumes} />
                                <InfoField label="Chapters" value={details.chapters} />
                                <InfoField label="Status" value={details.status} />
                                <InfoField label="Published" value={details.published?.string} />
                            </>
                        )}
                    </div>
                </div>

                <div className="details-right-col">
                    <div className="card">
                        <h2 className="section-title">Synopsis</h2>
                        <p className="synopsis-text">{details.synopsis || 'No synopsis available.'}</p>
                    </div>
                    
                    {characters.length > 0 && (
                        <div className="card">
                            <h2 className="section-title">Characters</h2>
                            <div className="character-grid">
                                {characters.slice(0, 8).map(char => (
                                    <div key={char.character.mal_id} className="character-card">
                                        <img src={char.character.images.jpg.image_url} alt={char.character.name} className="character-image" />
                                        <p className="character-name">{char.character.name}</p>
                                        <p className="character-role">{char.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <h2 className="section-title">Reviews</h2>
                        {reviews.length > 0 ? (
                             <div className="review-list">
                                {reviews.slice(0, 3).map(review => (
                                     <div key={review.mal_id} className="review-item">
                                        <div className="review-author">
                                            <img src={review.user.images.jpg.image_url} alt={review.user.username} className="author-avatar" />
                                            <div>
                                                <p className="author-name">{review.user.username}</p>
                                                <p className="author-score">Score: {review.score}/10</p>
                                            </div>
                                        </div>
                                        <p className="review-text">{review.review.substring(0, 200)}...</p>
                                     </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews available for this {contentType} yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default DetailsPage;