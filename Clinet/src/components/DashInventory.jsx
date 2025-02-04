import { Modal, Table, Button, TextInput, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashInventory() {
  const { currentUser } = useSelector((state) => state.user);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState('');
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(`/api/inventory/getitems?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setInventoryItems(data.items);
          if (data.items.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchInventory();
    }
  }, [currentUser._id]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/inventory/additem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, userId: currentUser._id })
      });
      const data = await res.json();
      if (res.ok) {
        setInventoryItems((prev) => [...prev, data.item]);
        setNewItem({ name: '', quantity: '', price: '', category: '' });
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleDeleteItem = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/inventory/deleteitem/${itemIdToDelete}/${currentUser._id}`, { method: 'DELETE' });
      if (res.ok) {
        setInventoryItems((prev) => prev.filter((item) => item._id !== itemIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-3'>
      {currentUser.isAdmin && inventoryItems.length === 0 && (
        <form onSubmit={handleAddItem} className='mb-5 bg-white p-5 shadow-md rounded-md'>
          <h2 className='text-lg font-semibold mb-3'>Add Inventory Item</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Name</Label>
              <TextInput type='text' value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
            </div>
            <div>
              <Label>Quantity</Label>
              <TextInput type='number' value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} required />
            </div>
            <div>
              <Label>Price</Label>
              <TextInput type='number' value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
            </div>
            <div>
              <Label>Category</Label>
              <TextInput type='text' value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required />
            </div>
          </div>
          <Button type='submit' className='mt-4' isProcessing={loading}>Add Item</Button>
        </form>
      )}
      {currentUser.isAdmin && inventoryItems.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          {inventoryItems.map((item) => (
            <Table.Body className='divide-y' key={item._id}>
              <Table.Row>
                <Table.Cell>{new Date(item.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell><Link to={`/inventory/${item._id}`}>{item.name}</Link></Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>${item.price}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell><span onClick={() => { setShowModal(true); setItemIdToDelete(item._id); }} className='text-red-500 cursor-pointer'>Delete</span></Table.Cell>
                <Table.Cell><Link to={`/update-item/${item._id}`} className='text-teal-500'>Edit</Link></Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>No inventory items found!</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3>Are you sure you want to delete this item?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteItem}>Yes, I'm sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
