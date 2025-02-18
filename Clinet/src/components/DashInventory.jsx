import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchInventory } from '../redux/inventory/inventorySlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getDocs } from 'firebase/firestore';
import { itemsCollection } from '../firebase';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function DashInventory() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { items: inventoryItems } = useSelector((state) => state.inventory);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchInventory(currentUser._id));
    }
    fetchItems();
  }, [dispatch, currentUser]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(itemsCollection);
    const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(fetchedItems);
    setLoading(false);
    setFilteredItems(fetchedItems);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    filterItems(event.target.value, categoryFilter);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
    filterItems(search, event.target.value);
  };

  const filterItems = (searchTerm, category) => {
    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category && category !== 'All') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    setFilteredItems(filtered);
  };

  // Sorting function
  const handleSort = () => {
    setSortAscending(!sortAscending);
    setItems([...items].sort((a, b) => (sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity)));
  };

  // Calculate total inventory value
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0).toFixed(2);

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Table Headers
  const tableHeaders = ['Item Name', 'Quantity', 'Price ($)', 'Category', 'Last Updated'];

  // Prepare Bar Chart Data
  const barData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: items.map((item) => item.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare Pie Chart Data for Category Distribution
  const categoryData = {
    labels: [...new Set(items.map((item) => item.category))],
    datasets: [
      {
        label: 'Category Distribution',
        data: [...new Set(items.map((item) => item.category))].map(
          (category) => items.filter((item) => item.category === category).length
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF'],
      },
    ],
  };

  return (
    <div className='max-w-5xl mx-auto p-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-4'>Inventory Dashboard</h2>

      {/* Summary Section */}
      <div className='grid grid-cols-3 gap-6 mb-6'>
        <div className='flex flex-col p-4 dark:bg-slate-700 rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Total Items</h3>
          <p className='text-2xl'>{items.length}</p>
        </div>
        <div className='flex flex-col p-4 dark:bg-slate-700 rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Total Quantity</h3>
          <p className='text-2xl'>{items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0)}</p>
        </div>
        <div className='flex flex-col p-4 dark:bg-slate-700 rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Total Value ($)</h3>
          <p className='text-2xl'>${totalValue}</p>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="p-2 w-1/2 border rounded-lg"
          value={search}
          onChange={handleSearch}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setSearch('')}
        >
          Clear Search
        </button>
      </div>

      {/* Category Filter Dropdown */}
      <div className="mb-4">
        <select
          className="p-2 w-1/4 border rounded-lg"
          value={categoryFilter}
          onChange={handleCategoryFilter}
        >
          <option value="All">All Categories</option>
          {[...new Set(items.map(item => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {/* Charts Section */}
          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div className='p-4 bg-white dark:bg-slate-700 rounded-md shadow-md'>
              <h3 className='text-gray-500 text-md uppercase mb-2'>Stock Quantity</h3>
              <Bar data={barData} />
            </div>
            <div className='p-4 bg-white dark:bg-slate-700 rounded-md shadow-md'>
              <h3 className='text-gray-500 text-md uppercase mb-2'>Category Distribution</h3>
              <Pie data={categoryData} />
            </div>
          </div>

          {/* Inventory Table */}
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200 dark:bg-gray-700'>
                {tableHeaders.map((header) => (
                  <th key={header} className='border border-gray-300 p-2 text-left'>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className='border border-gray-300'>
                  <td className='p-2'>
                    {item.name}
                  </td>
                  <td className='p-2 flex items-center'>
                    {item.quantity}
                    <span
                      className={`ml-2 w-4 h-4 rounded-full ${
                        item.quantity < 10
                          ? 'bg-red-500'
                          : item.quantity < 100
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    ></span>
                  </td>
                  <td className='p-2'>${item.price}</td>
                  <td className='p-2'>{item.category}</td>
                  <td className='p-2'>{item.updatedAt || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
