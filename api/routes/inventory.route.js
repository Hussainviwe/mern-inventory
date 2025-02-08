import express from 'express';
import { addItem, getItems, deleteItem, updateItem } from '../controllers/inventory.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Ensure routes match the frontend API calls
router.post('/', verifyUser, addItem);  // POST -> Add item
router.get('/getitems', verifyUser, getItems);    // GET -> Fetch items
router.put('/updateitem/:itemId', verifyUser, updateItem); // PUT -> Update item
router.delete('/deleteitem/:itemId', verifyUser, deleteItem); // DELETE -> Remove item

export default router;
