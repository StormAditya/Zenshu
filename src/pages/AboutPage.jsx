import React from 'react';
import PageWrapper from '../components/PageWrapper';
const AboutPage = () => {
    const teamMembers = [
      { name: 'Aditya Desai', initials: 'https://raw.githubusercontent.com/StormAditya/Zenshu/refs/heads/main/aditya.jpeg' },
      { name: 'Abodh Panchal', initials: 'https://raw.githubusercontent.com/StormAditya/Zenshu/refs/heads/main/abodh.jpeg' },
      { name: 'Akarsh Sunil', initials: 'https://raw.githubusercontent.com/StormAditya/Zenshu/refs/heads/main/akarsh.jpeg' },
      { name: 'Abhishek Chaudhary', initials: 'https://raw.githubusercontent.com/StormAditya/Zenshu/refs/heads/main/shake.jpeg' },
    ];

    return (
        <PageWrapper title="About Zenshu">
            <div className="card about-card">
                <p className="about-description">
                    Zenshu is a passion project created by a team of dedicated anime and manga enthusiasts. Our goal is to provide a clean, fast, and feature-rich platform for fans to discover their favorite anime and mangas.
                </p>
                <h2 className="about-team-title">Meet the Team</h2>
                <div className="about-team-grid">
                    {teamMembers.map(member => (
                        <div key={member.name} className="team-member">
                            <img
                                src={`${member.initials}`}
                                alt={member.name}
                                className="team-member-img"
                            />
                            <h3 className="team-member-name">{member.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default AboutPage;