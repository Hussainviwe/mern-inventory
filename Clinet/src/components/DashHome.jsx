import { useState, useEffect } from 'react';
import { Button, TextInput, Table, Modal } from 'flowbite-react';
import { db, itemsCollection } from '../firebase';
import { addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons from react-icons

export default function DashHome() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', category: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState({ id: '', name: '', quantity: '', price: '', category: '' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(itemsCollection);
      setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || newItem.quantity <= 0 || !newItem.price || !newItem.category) {
      alert('Please enter valid item details.');
      return;
    }
    setIsLoading(true);
    try {
      const docRef = await addDoc(itemsCollection, newItem);
      setItems([...items, { id: docRef.id, ...newItem }]);
      setNewItem({ name: '', quantity: '', price: '', category: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClick = (item) => {
    setUpdateItem(item);
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateItem.name || updateItem.quantity <= 0 || !updateItem.price || !updateItem.category) {
      alert('Please enter valid item details.');
      return;
    }
    try {
      const itemRef = doc(db, "inventory", updateItem.id);
      await updateDoc(itemRef, updateItem);
      setItems(items.map(item => (item.id === updateItem.id ? updateItem : item)));
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const itemRef = doc(db, "inventory", deleteId);
      await deleteDoc(itemRef);
      setItems(items.filter(item => item.id !== deleteId));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto dark:bg-slate-800 p-5 bg-white rounded-lg shadow-lg'>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col p-3 dark:bg-slate-700 w-full rounded-md shadow-md">
          <h3 className="text-gray-500 text-md uppercase">In Stock Items</h3>
          <p className="text-2xl">{items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0)}</p>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-700 w-full rounded-md shadow-md">
          <h3 className="text-gray-500 text-md uppercase">Total Inventory Items</h3>
          <p className="text-2xl">{items.length}</p>
        </div>
      </div>
      <div className="my-7 flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>Add Item</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2 justify-center">
                  <Button
                    onClick={() => handleUpdateClick(item)}
                    size="xs"
                    color="blue"
                    className="flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(item.id)}
                    size="xs"
                    color="red"
                    className="flex items-center justify-center"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create Item</Modal.Header>
        <Modal.Body>
          <form onSubmit={addItem} className='flex flex-col gap-4'>
            <TextInput name='name' placeholder='Item Name' value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <TextInput name='quantity' type='number' placeholder='Quantity' value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            <TextInput name='price' type='number' placeholder='Price' value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
            <TextInput name='category' placeholder='Category' value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
            <Button type='submit' disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Item'}</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Update Modal */}
      <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <Modal.Header>Update Item</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit} className='flex flex-col gap-4'>
            <TextInput name='name' placeholder='Item Name' value={updateItem.name} onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })} />
            <TextInput name='quantity' type='number' placeholder='Quantity' value={updateItem.quantity} onChange={(e) => setUpdateItem({ ...updateItem, quantity: e.target.value })} />
            <TextInput name='price' type='number' placeholder='Price' value={updateItem.price} onChange={(e) => setUpdateItem({ ...updateItem, price: e.target.value })} />
            <TextInput name='category' placeholder='Category' value={updateItem.category} onChange={(e) => setUpdateItem({ ...updateItem, category: e.target.value })} />
            <Button type='submit' disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Item'}</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Modal.Header>Delete Item</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex space-x-2 justify-end">
            <Button color="red" onClick={confirmDelete}>Confirm</Button>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
