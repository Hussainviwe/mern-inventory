import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeLayout';

const DashSettings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    businessHours: '',
    lowStockThreshold: 10,
    lowStockNotification: true,
    orderUpdateNotification: true,
    password: '',
    confirmPassword: '',
    twoFactorAuth: false,
    preferredLanguage: 'English',
    preferredCurrency: 'USD',
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }
    console.log('Settings saved:', formData);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '20px',
        backgroundColor: darkMode ? '#121212' : '#fff',
        color: darkMode ? '#f4f4f9' : '#333',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          flex: '1',
          backgroundColor: darkMode ? '#222' : '#f4f4f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: darkMode ? '0 4px 8px rgba(0, 0, 0, 0.5)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <h2 style={{ fontSize: '24px', color: darkMode ? '#f4f4f9' : '#333' }}>
          Inventory System Settings
        </h2>
        <form>
          {['storeName', 'storeEmail', 'storePhone', 'businessHours'].map((field) => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '5px',
                  color: darkMode ? '#f4f4f9' : '#333',
                }}
              >
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <input
                type={field.includes('Email') ? 'email' : 'text'}
                id={field}
                value={formData[field]}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  borderColor: darkMode ? '#444' : '#ccc',
                  backgroundColor: darkMode ? '#555' : '#fff',
                  color: darkMode ? '#f4f4f9' : '#333',
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Save Settings
          </button>
        </form>
      </div>

      <div
        style={{
          flex: '1',
          backgroundColor: darkMode ? '#222' : '#f4f4f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: darkMode ? '0 4px 8px rgba(0, 0, 0, 0.5)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <h3 style={{ fontSize: '20px', color: darkMode ? '#f4f4f9' : '#333' }}>System Information</h3>
        <p style={{ fontSize: '16px', color: darkMode ? '#ccc' : '#555' }}>
          This section can contain system-wide settings or information about your inventory system.
        </p>
        <ul style={{ fontSize: '16px', color: darkMode ? '#ccc' : '#555' }}>
          <li>System Version: 1.0.0</li>
          <li>Last Backup: 2025-02-01</li>
          <li>Current Users: 10</li>
        </ul>
      </div>
    </div>
  );
};

export default DashSettings;
