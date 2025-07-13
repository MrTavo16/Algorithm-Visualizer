import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Optional: remove if not using shadcn/ui
import { motion } from "framer-motion";

// Generate random array
const generateRandomArray = (size: number, min = 10, max = 100): number[] =>
  Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

// Bar component
const Bar = ({
  value,
  isActive,
  isCompare,
}: {
  value: number;
  isActive: boolean;
  isCompare: boolean;
}) => (
  <motion.div
    layout
    transition={{ duration: 0.25 }}
    className={`rounded ${
      isActive ? "bg-red-500" : isCompare ? "bg-yellow-400" : "bg-blue-500"
    }`}
    style={{
      height: `${value * 3}px`,
      width: "20px",
    }}
  />
);

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState<number[]>(generateRandomArray(25));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      setActiveIndex(i);
      setCompareIndex(j);
      await delay(100);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;

        setArray([...arr]);
        setCompareIndex(j >= 0 ? j : null);
        await delay(100);
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setActiveIndex(j + 1);
      setCompareIndex(null);
      await delay(100);
    }

    setActiveIndex(null);
    setCompareIndex(null);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(25));
      setActiveIndex(null);
      setCompareIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Insertion Sort Visualizer</h1>

      <div className="flex gap-1 items-end h-80 w-full justify-center">
        {array.map((value, idx) => (
          <Bar
            key={`bar-${idx}`}
            value={value}
            isActive={idx === activeIndex}
            isCompare={idx === compareIndex}
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
