import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Helper function to generate random colors
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Recursive function to remove a partition with the given id
const removeChildren = (partition, id) => {
  if (partition.id === id) {
    // If the current partition's ID matches, return null to remove it
    return null;
  } else {
    return {
      ...partition,
      // Filter out any children that are null (which have been removed)
      children: partition.children
        .map((child) => removeChildren(child, id))
        .filter((child) => child !== null),
    };
  }
};


// Partition Component
const Partition = ({ partition, onSplit, onRemoveChildren }) => {
  const { id, color, direction, children } = partition;

  return (
    <div
      className={`relative flex ${
        direction === "H" ? "flex-row" : direction === "V" ? "flex-col" : ""
      } border-2 grow`}
      style={{ backgroundColor: color }}
    >
      {children.length === 0 && (
        <div className="text-white">
          <div className="absolute top-0 right-2">
            {/* Call the onRemoveChildren function when the "-" button is clicked */}
            <button onClick={() => onRemoveChildren(id)}>-</button>
          </div>
          {/* Split Buttons */}
          <div className="mt-4">
            <button className="btn px-4 py-4" onClick={() => onSplit(id, "H")}>
              H
            </button>
            <button className="btn px-4 py-4" onClick={() => onSplit(id, "V")}>
              V
            </button>
          </div>
        </div>
      )}

      {/* Recursively Render Child Partitions */}
      {children.map((child) => (
        <Partition
          key={child.id}
          partition={child}
          onSplit={onSplit}
          onRemoveChildren={onRemoveChildren}
        />
      ))}
    </div>
  );
};

const TaskOne = () => {
  const [rootPartition, setRootPartition] = useState({
    id: uuidv4(),
    color: randomColor(),
    direction: null,
    children: [],
  });

  // Recursive function to handle partition splitting
  const splitPartition = (partition, id, direction) => {
    if (partition.id === id) {
      // Split the current partition
      const newPartition1 = {
        id: uuidv4(),
        color: partition.color, // Keep the same color for one partition
        direction: null,
        children: [],
      };

      const newPartition2 = {
        id: uuidv4(),
        color: randomColor(), // Assign a new random color to the second partition
        direction: null,
        children: [],
      };

      // Set children as two new partitions with specified direction
      return {
        ...partition,
        direction: direction,
        children: [newPartition1, newPartition2],
      };
    } else {
      // Recursively search for the partition to split
      return {
        ...partition,
        children: partition.children.map((child) =>
          splitPartition(child, id, direction)
        ),
      };
    }
  };

  // Recursive function to handle removing children from a partition
  const handleRemoveChildren = (id) => {
    const updatedPartition = removeChildren(rootPartition, id);
    setRootPartition(updatedPartition);
  };

  // Handle partition splitting
  const handleSplit = (id, direction) => {
    const updatedPartition = splitPartition(rootPartition, id, direction);
    setRootPartition(updatedPartition);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2">
        {/* Recursively Render Partitions */}
        <Partition
          partition={rootPartition}
          onSplit={handleSplit}
          onRemoveChildren={handleRemoveChildren}
        />
      </div>
    </div>
  );
};

export default TaskOne;
