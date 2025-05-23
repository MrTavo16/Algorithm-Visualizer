import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Optional, remove if not using shadcn/ui

const generateRandomArray = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RadixSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(25));
      setCurrent(null);
    }
  };

  const countingSort = async (arr, exp) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    // Count digits at current exponent
    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    // Copy output to arr and animate step-by-step
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setArray([...arr]); // Trigger re-render
      setCurrent(i);
      await delay(50);
    }

    setCurrent(null);
  };

  const radixSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(arr, exp);
    }

    setArray([...arr]); // Final sorted array
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Radix Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${value * 3}px`,
              width: "20px",
              backgroundColor: idx === current ? "#ef4444" : "#0d9488",
              borderRadius: "4px",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={resetArray} disabled={isSorting}>
          New Array
        </Button>
        <Button onClick={radixSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Sort"}
        </Button>
      </div>
    </div>
  );
};

export default RadixSortVisualizer;
