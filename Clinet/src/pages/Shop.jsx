import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGems, setFilteredGems] = useState(gemData); // Show all gems initially
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter gems based on search query
    const filtered = gemData.filter(gem =>
      gem.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGems(filtered);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '10px',
      }}
    >
      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a gem..."
          style={{
            width: '200px', // Small size for the search bar
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #007BFF',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Gem Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Smaller cards
          gap: '20px', // Reduced gap for smaller cards
          marginTop: '20px',
        }}
      >
        {filteredGems.map((gem) => (
          <div
            key={gem.name}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: '0.3s',
            }}
          >
            <img
              src={gem.image}
              alt={gem.name}
              style={{
                width: '100%',
                height: '180px', // Smaller image
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '15px' }}>
              <h3
                style={{
                  fontSize: '20px', // Smaller font size
                  marginBottom: '10px',
                }}
              >
                {gem.name}
              </h3>
              <p>
                <strong>Size:</strong> {gem.size}
              </p>
              <p>
                <strong>Origin:</strong> {gem.origin}
              </p>
              <p>
                <strong>Details:</strong> {gem.details}
              </p>
              <p>
                <strong>Hardness:</strong> {gem.hardness}
              </p>
              <p>
                <strong>Color:</strong> {gem.color}
              </p>
              <p>
                <strong>Value:</strong> {gem.value}
              </p>
            </div>
          </div>
        ))}
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
  {
    name: 'Diamond',
    size: 'Large',
    origin: 'South Africa',
    details: 'A rare and valuable gemstone, known for its brilliance and strength.',
    hardness: '10',
    color: 'Colorless',
    value: '$5,000 per carat',
    image: '/images/diamond.jpg',
  },
  {
    name: 'Amethyst',
    size: 'Medium',
    origin: 'Brazil',
    details: 'A purple gemstone, known for its beauty and spiritual significance.',
    hardness: '7',
    color: 'Purple',
    value: '$200 per carat',
    image: '/images/amethyst.jpg',
  },
  {
    name: 'Topaz',
    size: 'Large',
    origin: 'Brazil',
    details: 'A gemstone with various colors, valued for its beauty and clarity.',
    hardness: '8',
    color: 'Yellow',
    value: '$500 per carat',
    image: '/images/topaz.jpg',
  },
  {
    name: 'Garnet',
    size: 'Small',
    origin: 'India',
    details: 'A gemstone available in a range of colors, often used in jewelry.',
    hardness: '7',
    color: 'Red',
    value: '$100 per carat',
    image: '/images/garnet.jpg',
  },
  {
    name: 'Citrine',
    size: 'Medium',
    origin: 'Madagascar',
    details: 'A yellow to orange gemstone, often associated with happiness.',
    hardness: '7',
    color: 'Yellow',
    value: '$300 per carat',
    image: '/images/citrine.jpg',
  },
  {
    name: 'Opal',
    size: 'Large',
    origin: 'Australia',
    details: 'A gemstone that displays a variety of colors, valued for its play of color.',
    hardness: '5.5-6',
    color: 'Multicolored',
    value: '$400 per carat',
    image: '/images/opal.jpg',
  },
  {
    name: 'Tourmaline',
    size: 'Medium',
    origin: 'Sri Lanka',
    details: 'A gemstone available in many colors, prized for its variety and beauty.',
    hardness: '7-7.5',
    color: 'Varied',
    value: '$800 per carat',
    image: '/images/tourmaline.jpg',
  },
    {
      name: 'Zircon',
      size: 'Small',
      origin: 'Cambodia',
      details: 'A gemstone with many colors, often mistaken for a diamond.',
      hardness: '7.5',
      color: 'Blue',
      value: '$500 per carat',
      image: '/images/zircon.jpg',
      category: 'Semi-Precious Stones', // New category added
    },
    {
      name: 'Alexandrite',
      size: 'Large',
      origin: 'Russia',
      details: 'A gemstone that changes color depending on the light.',
      hardness: '8.5',
      color: 'Green to Red',
      value: '$5,500 per carat',
      image: '/images/alexandrite.jpg',
      category: 'Precious Stones', // New category added
    },
];

export default Shop;
