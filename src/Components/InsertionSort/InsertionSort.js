import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Optional: depends on your UI library
import { motion } from 'framer-motion';

// Generate a random array of numbers between min and max
const generateRandomArray = (size, min = 10, max = 100) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Bar component
const Bar = ({ value, highlight }) => (
  <motion.div
    className={`rounded ${highlight ? 'bg-red-500' : 'bg-blue-500'}`}
    style={{ height: `${value * 3}px`, width: '20px' }}
    layout
    transition={{ duration: 0.2 }}
  />
);

// Main component
export default function InsertionSortVisualizer() {
  const [array, setArray] = useState(generateRandomArray(25));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  // Delay utility
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Insertion sort animation
  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      setCurrentIndex(i);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setHighlightIndex(j);
        setArray([...arr]);
        await delay(100);
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      await delay(100);
    }

    setCurrentIndex(null);
    setHighlightIndex(null);
    setIsSorting(false);
  };

  // Reset the array
  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(25));
      setCurrentIndex(null);
      setHighlightIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Insertion Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center">
        {array.map((value, idx) => (
          <Bar
            key={idx}
            value={value}
            highlight={idx === highlightIndex || idx === currentIndex}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={resetArray} disabled={isSorting}>
          {isSorting ? "Resetting..." : "New Array"}
        </Button>
        <Button onClick={insertionSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Sort"}
        </Button>
      </div>
    </div>
  );
}
