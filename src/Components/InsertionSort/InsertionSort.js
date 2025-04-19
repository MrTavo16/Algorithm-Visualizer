import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const generateRandomArray = (size, min = 10, max = 100) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const Bar = ({ value, highlight }) => (
  <motion.div
    className={`rounded bg-blue-500 ${highlight ? 'bg-red-500' : ''}`}
    style={{ height: `${value * 3}px`, width: '20px' }}
    layout
    transition={{ duration: 0.2 }}
  />
);

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState(generateRandomArray(20));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      setCurrentIndex(i);
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setHighlightIndex(j);
        setArray([...arr]);
        await new Promise(res => setTimeout(res, 200));
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise(res => setTimeout(res, 200));
    }
    setCurrentIndex(null);
    setHighlightIndex(null);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray(20));
      setCurrentIndex(null);
      setHighlightIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <div className="flex gap-1 items-end h-80">
        {array.map((value, index) => (
          <Bar
            key={index}
            value={value}
            highlight={index === highlightIndex || index === currentIndex}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={resetArray} disabled={isSorting}>Reset</Button>
        <Button onClick={insertionSort} disabled={isSorting}>Sort</Button>
      </div>
    </div>
  );
}
