import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Remove if not using shadcn/ui
import { motion } from "framer-motion";

// Generate a random array of integers between 10–99
const generateRandomArray = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);

// Delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Animated Bar component
const Bar = ({ value, isActive }) => (
  <motion.div
    layout
    transition={{ duration: 0.25 }}
    style={{
      height: `${value * 3}px`,
      width: "20px",
      backgroundColor: isActive ? "#ef4444" : "#0d9488",
      borderRadius: "4px",
    }}
  />
);

const RadixSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    setArray(generateRandomArray(25));
    setActiveIndex(null);
  };

  const countingSort = async (arr, exp) => {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }

    // Accumulate
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array (stable sort from right to left)
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      const pos = count[digit] - 1;
      output[pos] = arr[i];
      count[digit]--;

      setActiveIndex(i);
      setArray([...output]); // Animate partial result
      await delay(60);
    }

    return output;
  };

  const radixSort = async () => {
    if (isSorting || array.length === 0) return;
    setIsSorting(true);

    let arr = [...array];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      arr = await countingSort(arr, exp);
    }

    setArray(arr);
    setActiveIndex(null);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Radix Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center">
        {array.map((value, idx) => (
          <Bar key={idx} value={value} isActive={idx === activeIndex} />
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button onClick={resetArray} disabled={isSorting}>
          {isSorting ? "Sorting..." : "New Array"}
        </Button>
        <Button onClick={radixSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Sort"}
        </Button>
      </div>
    </div>
  );
};

export default RadixSortVisualizer;
