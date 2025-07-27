import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Remove if unused
import { motion } from "framer-motion";

// Generate random array between min and max
const generateRandomArray = (size, min = 10, max = 100) =>
  Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

// Bar component with animated height and color
const Bar = ({ value, isActive, isCompare }) => (
  <motion.div
    layout
    transition={{ duration: 0.2 }}
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
  const [array, setArray] = useState(generateRandomArray(25));
  const [activeIndex, setActiveIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      if (!isMounted.current) return;

      setActiveIndex(i);
      setCompareIndex(j);
      await delay(100);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;

        if (!isMounted.current) return;

        setArray([...arr]);
        setCompareIndex(j >= 0 ? j : null);
        await delay(100);
      }

      arr[j + 1] = key;

      if (!isMounted.current) return;

      setArray([...arr]);
      setActiveIndex(j + 1);
      setCompareIndex(null);
      await delay(100);
    }

    if (!isMounted.current) return;

    setActiveIndex(null);
    setCompareIndex(null);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;

    setArray(generateRandomArray(25));
    setActiveIndex(null);
    setCompareIndex(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Insertion Sort Visualizer</h1>

      {/* Bars */}
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

      {/* Controls */}
      <div className="flex gap-4">
        <Button onClick={resetArray} disabled={isSorting}>
          New Array
        </Button>
        <Button onClick={insertionSort} disabled={isSorting}>
          Sort
        </Button>
      </div>
    </div>
  );
}
