import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Optional if you're using shadcn or similar

const generateRandomArray = (length: number): number[] =>
  Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RadixSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(25));
      setCurrent(null);
    }
  };

  const countingSort = async (arr: number[], exp: number) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setCurrent(i);
      setArray([...arr]);
      await delay(50);
    }

    setCurrent(null);
  };

  const radixSort = async () => {
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
      <h1 className="text-2xl font-bold">Radix Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${value * 3}px`,
              width: "20px",
              backgroundColor: idx === current ? "#ef4444" : "#0d9488", // red or teal
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
