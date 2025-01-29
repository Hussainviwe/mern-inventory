import React, { useState, useEffect } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
        setError('Failed to load inventory.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
      
      {/* Search and Add Item Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="border rounded p-2 w-1/2"
          value={search}
          onChange={handleSearch}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Loading inventory...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Statistics Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Items</h2>
          <p className="text-2xl font-bold">{items.length}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Quantity</h2>
          <p className="text-2xl font-bold">{items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Value</h2>
          <p className="text-2xl font-bold">$
            {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Inventory Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Item Name</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                <td className="border border-gray-300 p-2 text-center">${item.price}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
