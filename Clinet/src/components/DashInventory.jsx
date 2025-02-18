import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchInventory } from '../redux/inventory/inventorySlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function DashInventory() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { items: inventoryItems } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchInventory(currentUser._id));
    }
  }, [dispatch, currentUser]);

  // Table Headers
  const tableHeaders = ['Item Name', 'Quantity', 'Price ($)', 'Category', 'Last Updated'];

  // Prepare Bar Chart Data
  const barData = {
    labels: inventoryItems.map((item) => item.name),
    datasets: [
      {
        label: 'Inventory Quantity',
        data: inventoryItems.map((item) => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare Pie Chart Data
  const pieData = {
    labels: inventoryItems.map((item) => item.name),
    datasets: [
      {
        label: 'Item Count',
        data: inventoryItems.map(() => 1), // Each item contributes 1 count
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className='p-3'>
      <h2 className='text-2xl font-semibold mb-6'>Inventory Overview</h2>

      {/* Inventory Table */}
      <div className='mb-6 bg-white p-5 shadow-md rounded-md'>
        <h3 className='text-lg font-semibold mb-3'>Inventory List</h3>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              {tableHeaders.map((header, index) => (
                <th key={index} className='border border-gray-300 p-2 text-left'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length > 0 ? (
              inventoryItems.map((item) => (
                <tr key={item._id} className='border border-gray-300'>
                  <td className='p-2'>{item.name}</td>
                  <td className='p-2'>{item.quantity}</td>
                  <td className='p-2'>${item.price}</td>
                  <td className='p-2'>{item.category}</td>
                  <td className='p-2'>{new Date(item.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className='p-3 text-center text-gray-500'>
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-2 gap-6'>
        {/* Bar Chart */}
        <div className='bg-white p-5 shadow-md rounded-md'>
          <h3 className='text-lg font-semibold mb-3'>Inventory Quantity (Bar Chart)</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart */}
        <div className='bg-white p-5 shadow-md rounded-md'>
          <h3 className='text-lg font-semibold mb-3'>Item Distribution (Pie Chart)</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
