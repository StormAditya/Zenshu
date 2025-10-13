import React from 'react';
import PageWrapper from '../components/PageWrapper';
const AboutPage = () => {
    const teamMembers = [
      { name: 'Aditya Desai', initials: 'https://raw.githubusercontent.com/StormAditya/OH_us/refs/heads/main/otakuhub/aditya.jpeg' },
      { name: 'Abodh Panchal', initials: 'https://raw.githubusercontent.com/StormAditya/OH_us/refs/heads/main/otakuhub/abodh.jpeg' },
      { name: 'Akarsh Sunil', initials: 'https://raw.githubusercontent.com/StormAditya/OH_us/refs/heads/main/otakuhub/akarsh.jpeg' },
      { name: 'Abhishek Chaudhary', initials: 'https://github.com/StormAditya/OH_us/blob/main/otakuhub/shake.jpeg?raw=true' },
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