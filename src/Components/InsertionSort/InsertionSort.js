import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const generateRandomArray = (size: number, min = 10, max = 100) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const Bar = ({ value, highlight }: { value: number; highlight: boolean }) => (
  <motion.div
    className={`rounded ${highlight ? 'bg-red-500' : 'bg-blue-500'}`}
    style={{ height: `${value * 3}px`, width: '20px' }}
    layout
    transition={{ duration: 0.2 }}
  />
);

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState<number[]>(generateRandomArray(25));
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
          New Array
        </Button>
        <Button onClick={insertionSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Sort"}
        </Button>
      </div>
    </div>
  );
}
