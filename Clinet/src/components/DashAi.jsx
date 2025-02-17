import React, { useState } from 'react';
import { FaSearch, FaGem, FaQuestionCircle } from 'react-icons/fa';

const DashAi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGems, setFilteredGems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = gemData.filter(gem =>
      gem.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGems(filtered);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '20px' }}>
      {/* Search Bar (Always Visible) */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a gem..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #007BFF',
            outline: 'none',
            transition: '0.3s',
            boxSizing: 'border-box',
            color: '#333',
            backgroundColor: '#fff',
            textAlign: 'left',
          }}
        />
        {searchQuery && !isSearching && (
          <div style={{
            position: 'absolute',
            top: '45px',
            left: '0',
            right: '0',
            backgroundColor: '#fff',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            borderRadius: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: '10',
          }}>
            {filteredGems.length === 0 ? (
              <p style={{ color: '#007BFF' }}>No gems found</p>
            ) : (
              filteredGems.map(gem => (
                <div key={gem.name} onClick={handleSearchClick} style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  marginBottom: '5px',
                  color: '#007BFF',
                }}>
                  {gem.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Gem Cards (Displayed After Search) */}
      {isSearching && filteredGems.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          marginTop: '20px',
        }}>
          {filteredGems.map((gem) => (
            <div key={gem.name} style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: '0.3s',
              color: '#333',
            }}>
              <img
                src={gem.image}
                alt={gem.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>{gem.name}</h3>
                <p><strong>Size:</strong> {gem.size}</p>
                <p><strong>Origin:</strong> {gem.origin}</p>
                <p><strong>Details:</strong> {gem.details}</p>
                <p><strong>Hardness:</strong> {gem.hardness}</p>
                <p><strong>Color:</strong> {gem.color}</p>
                <p><strong>Value:</strong> {gem.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Common Questions Section */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333',
      }}>
        <h2 style={{
          fontSize: '28px',
          marginBottom: '20px',
          color: '#007BFF',
          display: 'flex',
          alignItems: 'center',
        }}>
          <FaQuestionCircle style={{ marginRight: '10px' }} />
          Common Gem Store Questions
        </h2>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          <li style={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
          }}>
            <FaGem style={{ marginRight: '10px', color: '#007BFF' }} />
            <strong>What is the best gem for an engagement ring?</strong> Diamonds are the most popular choice due to their brilliance and durability.
          </li>
          <li style={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
          }}>
            <FaGem style={{ marginRight: '10px', color: '#007BFF' }} />
            <strong>How do I know if a gem is real?</strong> Check authenticity through professional certification or unique physical properties.
          </li>
          <li style={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
          }}>
            <FaGem style={{ marginRight: '10px', color: '#007BFF' }} />
            <strong>Are colored gemstones more expensive than diamonds?</strong> Some, like rubies and emeralds, can be just as valuable.
          </li>
          <li style={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
          }}>
            <FaGem style={{ marginRight: '10px', color: '#007BFF' }} />
            <strong>What should I look for when buying a gem?</strong> Consider the 4 Cs—cut, color, clarity, and carat weight.
          </li>
        </ul>
      </div>
    </div>
  );
};

// Example Gem Data
const gemData = [
  {
    name: 'Ruby',
    size: 'Medium',
    origin: 'Myanmar',
    details: 'A red gemstone that is known for its hardness and brilliance.',
    hardness: '9',
    color: 'Red',
    value: '$1,500 per carat',
    image: '/images/ruby.jpg',
  },
  {
    name: 'Sapphire',
    size: 'Large',
    origin: 'Sri Lanka',
    details: 'A blue gemstone, popular in jewelry, with exceptional durability.',
    hardness: '9',
    color: 'Blue',
    value: '$1,200 per carat',
    image: '/images/sapphire.jpg',
  },
  {
    name: 'Emerald',
    size: 'Small',
    origin: 'Colombia',
    details: 'A green gemstone valued for its color and rarity.',
    hardness: '7.5-8',
    color: 'Green',
    value: '$2,000 per carat',
    image: '/images/emerald.jpg',
  },
];

export default DashAi;
