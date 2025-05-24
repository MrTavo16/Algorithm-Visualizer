import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Optional: Tailwind UI (shadcn)

const generateRandomArray = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Bar = ({ value, isActive }) => (
  <div
    style={{
      height: `${value * 3}px`,
      width: "20px",
      backgroundColor: isActive ? "#ef4444" : "#0d9488", // Red or Teal
      borderRadius: "4px",
      transition: "all 0.3s ease",
    }}
  />
);

const RadixSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(25));
      setCurrentIndex(null);
    }
  };

  const countingSort = async (arr, exp) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    // Count digits by exponent
    for (const num of arr) {
      const index = Math.floor(num / exp) % 10;
      count[index]++;
    }

    // Update count[i] so it contains actual position of digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array from end to start (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    // Copy output to original array with animation
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setArray([...arr]);
      setCurrentIndex(i);
      await delay(50);
    }

    setCurrentIndex(null);
  };

  const radixSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(arr, exp);
    }

    setArray(arr);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Radix Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center transition-all">
        {array.map((value, idx) => (
          <Bar key={idx} value={value} isActive={idx === currentIndex} />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={resetArray} disabled={isSorting}>
          {isSorting ? "Sorting..." : "New Array"}
        </Button>
        <Button onClick={radixSort} disabled={isSorting}>
          Start Sort
        </Button>
      </div>
    </div>
  );
};

export default RadixSortVisualizer;
