import express from 'express';
import { createItem, getItems, deleteItem, updateItem } from '../controllers/inventory.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Corrected routes
router.post('/', verifyUser, createItem); // Create an item
router.get('/', verifyUser, getItems); // Get inventory items
router.put('/:itemId', verifyUser, updateItem); // Update an item
router.delete('/:itemId', verifyUser, deleteItem); // Delete an item

export default router;
