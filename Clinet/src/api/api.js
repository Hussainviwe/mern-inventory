const addItem = async (itemData, token) => {
    try {
      // Send POST request to the correct API endpoint for adding an item
      const response = await fetch("http://localhost:3000/api/inventory", { // Use /api/inventory directly
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json(); // Return the response body
    } catch (error) {
      console.error("Error adding item:", error);
      return null;
    }
  };
