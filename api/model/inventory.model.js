import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: 'general',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
