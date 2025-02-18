import React, { useState, useEffect } from 'react';

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setIsDarkMode(currentTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#F0F4F8';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '40px',
        background: isDarkMode ? '#121212' : '#F0F4F8',
        color: isDarkMode ? '#fff' : '#333',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: isDarkMode ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            color: '#4A90E2',
            textAlign: 'center',
          }}
        >
          Welcome to Usman's Inventory
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: isDarkMode ? '#ddd' : '#333',
            lineHeight: '1.6',
            textAlign: 'justify',
          }}
        >
          Usman's Inventory is a powerful platform designed to help businesses and individuals keep track of their valuable items with ease. Our system is built with intuitive features that allow for smooth inventory management.
        </p>

        <section style={{ marginTop: '40px' }}>
          <h2
            style={{
              fontSize: '28px',
              color: '#6E44FF',
              textAlign: 'center',
            }}
          >
            Features of the Inventory System
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                background: '#6E44FF',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Inventory Tracking</h3>
              <p>Keep track of your items with real-time updates on stock levels and their locations.</p>
            </div>
            <div
              style={{
                background: '#FF6347',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>User-Friendly Interface</h3>
              <p>Designed to be intuitive and easy to navigate for all users, no technical expertise required.</p>
            </div>
            <div
              style={{
                background: '#FFD700',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Reports & Insights</h3>
              <p>Generate insightful reports on inventory levels, sales, and stock usage to help you make informed decisions.</p>
            </div>
            <div
              style={{
                background: '#32CD32',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Real-Time Updates</h3>
              <p>Get real-time notifications when stock levels change, items are added, or sales are made.</p>
            </div>
            <div
              style={{
                background: '#FF4500',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Multi-Warehouse Management</h3>
              <p>Manage multiple warehouses and track inventory across different locations easily and efficiently.</p>
            </div>
            <div
              style={{
                background: '#1E90FF',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Barcode Scanning</h3>
              <p>Integrate barcode scanning functionality to easily add and manage inventory items, reducing human error.</p>
            </div>
            <div
              style={{
                background: '#DC143C',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Order Management</h3>
              <p>Keep track of customer orders and automatically adjust your inventory levels upon completion of sales.</p>
            </div>
            <div
              style={{
                background: '#FF8C00',
                color: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3>Inventory Auditing</h3>
              <p>Perform regular audits to ensure your inventory matches the actual stock and adjust discrepancies efficiently.</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2
            style={{
              fontSize: '28px',
              color: '#6E44FF',
              textAlign: 'center',
            }}
          >
            Why Choose Usman's Inventory?
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ddd' : '#333',
              lineHeight: '1.6',
              textAlign: 'justify',
            }}
          >
            Our inventory system offers a seamless experience for businesses and individuals looking to manage their assets with ease. Whether you have a small collection of items or a large inventory, our platform scales to meet your needs.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ddd' : '#333',
              lineHeight: '1.6',
              textAlign: 'justify',
            }}
          >
            Key benefits include secure login, customizable inventory categories, detailed search features, and a responsive interface that works across all devices. With our system, you can easily track your items, generate reports, and optimize your inventory management processes.
          </p>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2
            style={{
              fontSize: '28px',
              color: '#6E44FF',
              textAlign: 'center',
            }}
          >
            Integrations and Scalability
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ddd' : '#333',
              lineHeight: '1.6',
              textAlign: 'justify',
            }}
          >
            Usman's Inventory is designed to integrate seamlessly with other business tools. It supports integration with e-commerce platforms, accounting software, and more, making it an ideal solution for businesses looking to streamline their operations.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: isDarkMode ? '#ddd' : '#333',
              lineHeight: '1.6',
              textAlign: 'justify',
            }}
          >
            Our system is also scalable, meaning that it grows with your business. Whether you're managing a small local shop or a large warehouse with thousands of items, Usman's Inventory can handle the complexity with ease.
          </p>
        </section>
      </div>
    </div>
  );
}
