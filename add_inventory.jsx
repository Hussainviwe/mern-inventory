const addItemToInventory = async (itemId, quantity) => {
  try {
    const response = await fetch('/api/inventory/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, quantity }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Item added successfully:', data);
    } else {
      console.error('Error adding item:', data.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

// Example usage
addItemToInventory('12345', 10);


//basic inventory adding setup
