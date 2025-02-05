import { useState, useEffect } from 'react';
import { Button, TextInput, Table, Modal } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBox } from 'react-icons/fa';

export default function DashHome() {
  const dispatch = useDispatch();
  // Safely destructuring currentUser from state.user with fallback to {}
  const { currentUser } = useSelector((state) => state?.user || {});

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update modal states
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete confirmation modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  // Handlers for the add modal
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity > 0 && newItem.price && newItem.category) {
      setIsLoading(true);
      setTimeout(() => {
        setItems([...items, newItem]);
        setNewItem({ name: '', quantity: '', price: '', category: '' });
        setIsLoading(false);
        setIsModalOpen(false);
      }, 500); // Simulate loading time
    } else {
      alert('Please enter valid item details.');
    }
  };

  // Handlers for the update modal
  const handleUpdateClick = (index) => {
    setUpdateItem(items[index]);
    setUpdateIndex(index);
    setUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (updateItem.name && updateItem.quantity > 0 && updateItem.price && updateItem.category) {
      setIsUpdating(true);
      setTimeout(() => {
        const updatedItems = [...items];
        updatedItems[updateIndex] = updateItem;
        setItems(updatedItems);
        setIsUpdating(false);
        setUpdateModalOpen(false);
        alert("Successfully updated!");
      }, 500); // Simulate loading time
    } else {
      alert('Please enter valid item details.');
    }
  };

  // Handlers for the delete confirmation modal
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedItems = items.filter((_, i) => i !== deleteIndex);
    setItems(updatedItems);
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const totalQuantity = items.reduce((sum, item) => sum + parseInt(item.quantity || 0, 10), 0);
  const totalInventoryItems = items.length;

  return (
    <div className='max-w-4xl mx-auto p-5 w-full bg-white rounded-lg shadow-lg relative'>
      {/* Stock Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* In-Stock Summary */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">In Stock Items</h3>
              <p className="text-2xl">{totalQuantity}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Items Summary</span>
              <FaBox className="bg-green-600 text-white text-5xl p-3 shadow-lg" />
            </div>
          </div>
        </div>

        {/* Total Inventory Summary */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Inventory Items</h3>
              <p className="text-2xl">{totalInventoryItems}</p>
            </div>
            <FaBox className="bg-indigo-600 text-white text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
      {/* Add Button at the Top Corner */}
      <div className="absolute my-7 right-5">
        <Button gradientDuoTone='greenToBlue' onClick={() => setIsModalOpen(true)}>
          Add Item
        </Button>
      </div>

      {/* Displaying the Stock in a Table */}
      <div className="mt-6">
        <h2 className="my-7 text-center font-semibold text-3xl text-gray-800">Stock Items</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {items.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button
                    onClick={() => handleUpdateClick(index)}
                    gradientDuoTone='purpleToPink'
                    size="xs"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(index)}
                    gradientDuoTone='redToYellow'
                    size="xs"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Add Item Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <Modal.Header>Create Item</Modal.Header>
        <Modal.Body>
          <form className='flex flex-col gap-4' onSubmit={addItem}>
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
        </Modal.Body>
      </Modal>

      {/* Update Item Modal */}
      <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)} size="lg">
        <Modal.Header>Update Item</Modal.Header>
        <Modal.Body>
          <form className='flex flex-col gap-4' onSubmit={handleUpdateSubmit}>
            <TextInput 
              type='text' 
              name='name' 
              placeholder='Item Name' 
              value={updateItem.name} 
              onChange={handleUpdateChange} 
            />
            <TextInput 
              type='number' 
              name='quantity' 
              placeholder='Quantity' 
              value={updateItem.quantity} 
              onChange={handleUpdateChange} 
            />
            <TextInput 
              type='number' 
              name='price' 
              placeholder='Price' 
              value={updateItem.price} 
              onChange={handleUpdateChange} 
            />
            <TextInput 
              type='text' 
              name='category' 
              placeholder='Category' 
              value={updateItem.category} 
              onChange={handleUpdateChange} 
            />
            <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Item'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} size="md">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Do you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmDelete} gradientDuoTone='redToYellow'>
            Delete
          </Button>
          <Button onClick={cancelDelete} gradientDuoTone='gray'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
