import { useState, useEffect } from 'react';
import { Button, TextInput, Table } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';

export default function DashHome() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [editItem, setEditItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(0);

  // Load items from localStorage if they exist
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity > 0 && newItem.price && newItem.category) {
      setIsLoading(true);
      setTimeout(() => {
        setItems([...items, newItem]);
        setNewItem({ name: '', quantity: '', price: '', category: '' });
        setIsLoading(false);
      }, 500); // Simulate loading time
    } else {
      alert('Please enter valid item details.');
    }
  };

  const updateItem = () => {
    if (items.length > 0) {
      const updatedItems = [...items];
      updatedItems[items.length - 1] = editItem; // Update the last item
      setItems(updatedItems);
      setEditItem({ name: '', quantity: '', price: '', category: '' });
      alert("Item updated successfully!");
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const totalQuantity = items.reduce((sum, item) => sum + parseInt(item.quantity), 0);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    // Clear localStorage when the user logs out
    localStorage.removeItem('items');
    dispatch({ type: 'LOGOUT' }); // Example logout action
  };

  return (
    <div className='max-w-4xl mx-auto p-5 w-full bg-white rounded-lg shadow-lg'>
      <h1 className='my-7 text-center font-semibold text-3xl text-gray-800'>Inventory Dashboard</h1>

      <div className="relative">
        <div className="flex space-x-4 overflow-hidden">
          {/* Slider for Create Item */}
          <div className={`w-full ${currentSlider === 0 ? 'block' : 'hidden'}`}>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">Create Item</h2>
              <form className='flex flex-col gap-4 mb-5' onSubmit={addItem}>
                <TextInput 
                  type='text' 
                  name='name' 
                  placeholder='Item Name' 
                  value={newItem.name} 
                  onChange={handleInputChange} 
                />
                <TextInput 
                  type='number' 
                  name='quantity' 
                  placeholder='Quantity' 
                  value={newItem.quantity} 
                  onChange={handleInputChange} 
                />
                <TextInput 
                  type='number' 
                  name='price' 
                  placeholder='Price' 
                  value={newItem.price} 
                  onChange={handleInputChange} 
                />
                <TextInput 
                  type='text' 
                  name='category' 
                  placeholder='Category' 
                  value={newItem.category} 
                  onChange={handleInputChange} 
                />
                <Button type='submit' gradientDuoTone='greenToBlue' outline disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Item'}
                </Button>
              </form>
            </div>
          </div>

          {/* Slider for Update Item */}
          <div className={`w-full ${currentSlider === 1 ? 'block' : 'hidden'}`}>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">Update Item</h2>
              <form className='flex flex-col gap-4 mb-5' onSubmit={(e) => { e.preventDefault(); updateItem(); }}>
                <TextInput 
                  type='text' 
                  name='name' 
                  placeholder='Item Name' 
                  value={editItem.name} 
                  onChange={handleEditChange} 
                />
                <TextInput 
                  type='number' 
                  name='quantity' 
                  placeholder='Quantity' 
                  value={editItem.quantity} 
                  onChange={handleEditChange} 
                />
                <TextInput 
                  type='number' 
                  name='price' 
                  placeholder='Price' 
                  value={editItem.price} 
                  onChange={handleEditChange} 
                />
                <TextInput 
                  type='text' 
                  name='category' 
                  placeholder='Category' 
                  value={editItem.category} 
                  onChange={handleEditChange} 
                />
                <Button type='submit' gradientDuoTone='purpleToPink' outline>
                  Update Item
                </Button>
              </form>
            </div>
          </div>

          {/* Slider for Delete Item */}
          <div className={`w-full ${currentSlider === 2 ? 'block' : 'hidden'}`}>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">Delete Item</h2>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Item Name</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y'>
                  {filteredItems.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.quantity}</Table.Cell>
                      <Table.Cell>{item.price}</Table.Cell>
                      <Table.Cell>{item.category}</Table.Cell>
                      <Table.Cell>
                        <Button onClick={() => handleDelete(index)} gradientDuoTone='redToYellow' size="xs">
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          <Button onClick={() => setCurrentSlider(0)} gradientDuoTone='greenToBlue' outline>
            Add Item
          </Button>
          <Button
            onClick={() => {
              if (items.length > 0) {
                setEditItem(items[items.length - 1]); // Set last item in edit mode
                setCurrentSlider(1);
              } else {
                alert("No items available to update!");
              }
            }}
            gradientDuoTone='purpleToPink'
            outline
          >
            Update Item
          </Button>
          <Button onClick={() => setCurrentSlider(2)} gradientDuoTone='redToYellow' outline>
            Delete Item
          </Button>
        </div>
      </div>

      {/* Displaying the Stock in a Table */}
      <div className="mt-6">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Stock Items</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {items.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Logout Button */}
      <div className="mt-4 text-center">
        <Button onClick={handleLogout} gradientDuoTone='redToYellow'>
          Logout
        </Button>
      </div>
    </div>
  );
}
