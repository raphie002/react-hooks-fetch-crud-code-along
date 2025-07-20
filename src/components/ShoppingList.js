import React, { useEffect, useState } from "react"; // Import useEffect
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]); // Initialize items as an empty array

  // useEffect hook to fetch items when the component first renders
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((fetchedItems) => {
        // Update the state with the items fetched from the server
        setItems(fetchedItems);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        // Optionally, handle error state here (e.g., display an error message to the user)
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Callback function to add a new item to the state
  function handleAddItem(newItem) {
    // Create a new array with all existing items plus the new item
    setItems((currentItems) => [...currentItems, newItem]);
  }

  // Callback function to update an item's isInCart status in the state
  function handleUpdateItem(updatedItem) {
    // Map over the current items and replace the updated item with its new version
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem; // Replace with the updated item
      } else {
        return item; // Keep other items as they are
      }
    });
    setItems(updatedItems); // Update the state with the new array
  }

  // Callback function to delete an item from the state
  function handleDeleteItem(deletedItem) {
    // Filter out the deleted item from the current items array
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems); // Update the state with the new array
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* Pass the handleAddItem callback to ItemForm */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem} // Pass the update callback
            onDeleteItem={handleDeleteItem} // Pass the delete callback
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
