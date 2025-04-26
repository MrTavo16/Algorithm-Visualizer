import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const RadixSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 25 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(randomArray);
    setCurrent(null);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const countingSort = async (arr, exp) => {
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
    let max = Math.max(...arr);

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
              backgroundColor: idx === current ? "red" : "teal",
              borderRadius: "4px",
            }}
          ></div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => !isSorting && radixSort()}
          disabled={isSorting}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button
          onClick={() => !isSorting && generateRandomArray()}
          disabled={isSorting}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          New Array
        </button>
      </div>
    </div>
  );
};

export default RadixSortVisualizer;
