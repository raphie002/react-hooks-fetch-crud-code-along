import React, { useState } from "react";
// No need for uuid here, as json-server will generate the ID

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce"); // Initial value for select

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const itemData = {
      name: name,
      category: category,
      isInCart: false, // New items are initially not in the cart
    };

    // Send a POST request to the server to create a new item
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData), // Convert itemData object to JSON string
    })
      .then((r) => r.json())
      .then((newItem) => {
        // Call the onAddItem prop with the new item received from the server
        onAddItem(newItem);
        // Clear the form fields after successful submission
        setName("");
        setCategory("Produce");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        // Optionally, handle error state here
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
