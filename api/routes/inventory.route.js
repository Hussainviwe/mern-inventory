import express from 'express';
import { createItem, getItems, deleteItem, updateItem } from '../controllers/inventory.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyAdmin, createItem);
router.get('/', verifyUser, getItems);
router.put('/:itemId', verifyAdmin, updateItem);
router.delete('/:itemId', verifyAdmin, deleteItem);

export default router;
