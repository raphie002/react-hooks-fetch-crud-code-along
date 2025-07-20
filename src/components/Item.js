import React from "react";
// No need for useState here, as isInCart status is managed by parent via item prop

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handler for clicking the "Add/Remove from Cart" button
  function handleAddToCartClick() {
    // Send a PATCH request to toggle the isInCart status on the server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart, // Toggle the boolean value
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        // Call the onUpdateItem prop with the updated item received from the server
        onUpdateItem(updatedItem);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // Optionally, handle error state here
      });
  }

  // Handler for clicking the "Delete" button
  function handleDeleteClick() {
    // Send a DELETE request to the server to remove the item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) { // Check if the response status is successful (e.g., 200 OK, 204 No Content)
          // Call the onDeleteItem prop with the item that was just deleted
          onDeleteItem(item);
        } else {
          throw new Error(`Failed to delete item: ${r.status}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        // Optionally, handle error state here
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
