import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts"; // Install recharts for charting

const DashInventory = () => {
  const [inventorySummary, setInventorySummary] = useState({
    totalGems: 500,
    rareGems: 50,
    outOfStock: 10,
    totalCategories: 8,
    recentGems: [
      { name: "Blue Sapphire", price: "$5000", rarity: "Rare" },
      { name: "Ruby", price: "$4000", rarity: "Very Rare" },
      { name: "Emerald", price: "$3500", rarity: "Rare" },
      { name: "Amethyst", price: "$150", rarity: "Common" },
      { name: "Topaz", price: "$200", rarity: "Uncommon" }
    ],
    gemDistribution: { Rare: 50, VeryRare: 20, Common: 100, Uncommon: 150, OutOfStock: 180 } // Sample data for pie chart
  });

  useEffect(() => {
    const fetchInventorySummary = async () => {
      try {
        const response = await axios.get("/api/inventory/summary");
        setInventorySummary(response.data);
      } catch (error) {
        console.error("Error fetching inventory summary", error);
      }
    };
    fetchInventorySummary();
  }, []);

  const pieData = Object.keys(inventorySummary.gemDistribution).map((key) => ({
    name: key,
    value: inventorySummary.gemDistribution[key]
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Total Gems */}
      <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Total Gems</h2>
        <p className="text-4xl font-bold">{inventorySummary.totalGems}</p>
        <div className="mt-3">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300">
            Add New Gem
          </button>
        </div>
      </div>

      {/* Rare Gems */}
      <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Rare Gems</h2>
        <p className="text-4xl font-bold text-yellow-300">{inventorySummary.rareGems}</p>
        <div className="mt-3">
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition duration-300">
            View All Rare Gems
          </button>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Out of Stock</h2>
        <p className="text-4xl font-bold text-white">{inventorySummary.outOfStock}</p>
        <div className="mt-3">
          <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300">
            Restock Gems
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <p className="text-4xl font-bold text-yellow-200">{inventorySummary.totalCategories}</p>
        <div className="mt-3">
          <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-500 transition duration-300">
            View Categories
          </button>
        </div>
      </div>

      {/* Gem Distribution Chart */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-6 border rounded-lg shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Gem Distribution</h2>
        <PieChart width={400} height={400}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#ffbb28", "#ff8042", "#0088FE", "#00C49F", "#FF6666"][index % 5]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Recently Added Gems */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-6 border rounded-lg shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Recently Added Gems</h2>
        <ul className="space-y-3">
          {inventorySummary.recentGems.map((gem, index) => (
            <li key={index} className="text-lg font-medium flex items-center">
              <span className="mr-2">💎</span>
              <span className="font-bold text-lg">{gem.name}</span> - <span className="text-green-300">{gem.price}</span> ({gem.rarity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashInventory;
