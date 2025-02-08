import Inventory from '../model/inventory.model.js';
import { errorHandler } from '../utils/error.js';

export const addItem = async (req, res, next) => {
  if (!req.body.name || !req.body.quantity || !req.body.price) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newItem = new Inventory({
    ...req.body,
    userId: req.user.id, // Assign the user ID to the item
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
    
    const filter = { userId: req.query.userId }; // Users can only access their own items
    if (req.query.category) filter.category = req.query.category;
    if (req.query.searchTerm) {
      filter.$or = [
        { name: { $regex: req.query.searchTerm, $options: 'i' } },
        { description: { $regex: req.query.searchTerm, $options: 'i' } },
      ];
    }

    const items = await Inventory.find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await Inventory.countDocuments(filter);
    res.status(200).json({ items, totalItems });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await Inventory.findOne({ _id: req.params.itemId, userId: req.user.id });
    if (!item) return next(errorHandler(403, 'You are not allowed to delete this item'));

    await Inventory.findByIdAndDelete(req.params.itemId);
    res.status(200).json('The inventory item has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await Inventory.findOne({ _id: req.params.itemId, userId: req.user.id });
    if (!item) return next(errorHandler(403, 'You are not allowed to update this item'));

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
