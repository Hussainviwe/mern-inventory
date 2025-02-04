import Inventory from '../model/inventory.model.js';
import { errorHandler } from '../utils/error.js';

export const createItem = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to add inventory items'));
  }
  if (!req.body.name || !req.body.quantity || !req.body.price) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newItem = new Inventory({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const items = await Inventory.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await Inventory.countDocuments();
    res.status(200).json({
      items,
      totalItems,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to delete inventory items'));
  }
  try {
    await Inventory.findByIdAndDelete(req.params.itemId);
    res.status(200).json('The inventory item has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to update inventory items'));
  }
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.itemId,
      {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};
