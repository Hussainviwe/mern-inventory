import React, { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([
    { _id: '1', name: 'Item 1', quantity: 10, price: 20 },
    { _id: '2', name: 'Item 2', quantity: 5, price: 30 },
    { _id: '3', name: 'Item 3', quantity: 8, price: 15 }
  ]); // Sample items data
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Inventory Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="border rounded p-3 w-2/3 text-black"
          value={search}
          onChange={handleSearch}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-md">
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-700 p-5 rounded-lg text-center shadow-lg">
          <h2 className="text-lg font-semibold">Total Items</h2>
          <p className="text-2xl font-bold">{items.length}</p>
        </div>
        <div className="bg-blue-700 p-5 rounded-lg text-center shadow-lg">
          <h2 className="text-lg font-semibold">Total Quantity</h2>
          <p className="text-2xl font-bold">{items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
        <div className="bg-yellow-600 p-5 rounded-lg text-center shadow-lg">
          <h2 className="text-lg font-semibold">Total Value</h2>
          <p className="text-2xl font-bold">$
            {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Item Name</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <tr key={item._id} className="text-center border-b border-gray-700">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-5 text-lg">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
