import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import '../styles/FoundersSection.css';

const FoundersSection = () => {
  const founders = [
    {
      id: 1,
      name: 'Abdullah AlMusharraf',
      role: 'Co-Founder, Product',
      linkedin: 'https://linkedin.com/in/abdullahalmusharraf',
      image: 'https://source.unsplash.com/random/100x100/?portrait,man,professional',
    },
    {
      id: 2,
      name: 'Abdullah AlOtaishan',
      role: 'Co-Founder, Tech',
      linkedin: 'https://linkedin.com/in/abdullahalotaishan',
      image: 'https://source.unsplash.com/random/101x101/?portrait,man,tech',
    },
    {
      id: 3,
      name: 'Osama Bugshan',
      role: 'Co-Founder, Marketing',
      linkedin: 'https://linkedin.com/in/osamabugshan',
      image: 'https://source.unsplash.com/random/102x102/?portrait,man,business',
    },
    {
      id: 4,
      name: 'Mishal AlMansour',
      role: 'Co-Founder, Finance',
      linkedin: 'https://linkedin.com/in/mishalalmansour',
      image: 'https://source.unsplash.com/random/103x103/?portrait,man,strategy',
    },
    {
      id: 5,
      name: 'Yousef AlHashim',
      role: 'Co-Founder, Operations',
      linkedin: 'https://linkedin.com/in/yousefalhashim',
      image: 'https://source.unsplash.com/random/104x104/?portrait,man,lawyer',
    },
  ];

  const handleLinkedInClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="founders" className="about-section section-founders">
      <div className="section-content">
        <h2>Who Are We – The Team of Founders</h2>
        <p>
          Meet the passionate team behind AdMotion, bringing together expertise in technology, 
          business strategy, and innovation to revolutionize mobile advertising in Saudi Arabia.
        </p>
        
        <div className="founders-grid">
          {founders.map((founder) => (
            <div key={founder.id} className="founder-card">
              <div className="founder-avatar">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=8A2BE2&color=fff&size=100&bold=true`;
                  }}
                />
                <div className="avatar-glow"></div>
              </div>
              
              <div className="founder-info">
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                
                <button 
                  className="linkedin-btn"
                  onClick={() => handleLinkedInClick(founder.linkedin)}
                  aria-label={`View ${founder.name}'s LinkedIn profile`}
                >
                  <FaLinkedin className="linkedin-icon" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection; 