import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch inventory items
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/getitems?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add new inventory item
export const addInventoryItem = createAsyncThunk(
  'inventory/addInventoryItem',
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/additem/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update inventory item
export const updateInventoryItem = createAsyncThunk(
  'inventory/updateInventoryItem',
  async ({ userId, itemId, itemData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/updateitem/${itemId}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.updatedItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete inventory item
export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteInventoryItem',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/deleteitem/${itemId}/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;
