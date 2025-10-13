import React from 'react';
import PageWrapper from '../components/PageWrapper';

const WebsitesPage = ({ contentType }) => {
    const animeSites = [
        { name: 'Anime Kai', url: 'https://animekai.cc/home', description: 'A popular streaming site for anime.' },
        { name: 'AnimePahe', url: 'https://animepahe.si/', description: 'Offers a wide variety of anime series and movies.' },
        { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/', description: 'Official streaming service with a vast library of anime.' },
    ];

    const mangaSites = [
        { name: 'MangaPark', url: 'https://mangapark.net/', description: 'Read manga online in high quality.' },
        { name: 'Weeb Central', url: 'https://weebcentral.com/', description: 'A community and reader for manga fans.' },
        { name: 'MangaFire', url: 'https://mangafire.to/home', description: 'A modern manga reader with a great user interface.' },
        { name: 'MangaDex', url: 'https://mangadex.org/', description: 'Community-focused manga platform with various languages.' },
        { name: 'BookWalker', url: 'https://global.bookwalker.jp/', description: 'Official digital store for manga and light novels.' },
        { name: 'Netflix', url: 'https://www.netflix.com', description: 'Streaming service that also hosts some anime and manga adaptations.' },
    ];

    const sites = contentType === 'anime' ? animeSites : mangaSites;
    const title = contentType === 'anime' ? 'Where to Watch Anime' : 'Where to Read Manga';
    const accentTextClass = contentType === 'anime' ? 'text-accent-anime' : 'text-accent-manga';

    return (
        <PageWrapper title={title}>
            <div className="websites-grid">
                {sites.map(site => (
                    <a href={site.url} key={site.name} target="_blank" rel="noopener noreferrer" className="website-card">
                        <h3 className={`website-title ${accentTextClass}`}>{site.name}</h3>
                        <p className="website-description">{site.description}</p>
                        <span className="website-url">{site.url}</span>
                    </a>
                ))}
            </div>
        </PageWrapper>
    );
};

export default WebsitesPage;