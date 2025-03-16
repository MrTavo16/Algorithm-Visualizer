import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const RadixSort = () => {
    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState([]);
    const [currComparing, setCurrComparing] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        generateArray();
    }, [reset]);

    const generateArray = () => {
        let arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100));
        setArray(arr);
        setCurrComparing(null);
    };

    const getMax = (arr) => Math.max(...arr);

    const countingSort = async (arr, exp) => {
        let output = new Array(arr.length).fill(0);
        let count = new Array(10).fill(0);

        // Count occurrences of each digit
        for (let i = 0; i < arr.length; i++) {
            let index = Math.floor(arr[i] / exp) % 10;
            count[index]++;
        }

        // Compute cumulative count
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array (sorting step)
        for (let i = arr.length - 1; i >= 0; i--) {
            let index = Math.floor(arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        // Copy sorted elements back to original array
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            setCurrComparing(i);
            setArray([...arr]); // Update UI
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    };

    const radixSort = async () => {
        let newArr = [...array];
        let max = getMax(newArr);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await countingSort(newArr, exp);
        }

        setCurrComparing(null);
        setArray([...newArr]); // Final UI update
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            setIsSorting(true);
            await radixSort();
            setIsSorting(false);
        }
    };

    const handleButtonReset = () => {
        if (!isSorting) {
            setReset((prev) => !prev);
        }
    };

    return (
        <div>
            <h1>Radix Sort</h1>
            <div className="array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{
                            height: `${num * 3}px`,
                            backgroundColor: idx === currComparing ? "red" : "teal",
                        }}
                    ></div>
                ))}
            </div>
            <div>
                <button onClick={handleSortButton} disabled={isSorting}>
                    {isSorting ? "Sorting..." : "Sort"}
                </button>
                <button onClick={handleButtonReset} disabled={isSorting}>
                    New Array
                </button>
            </div>
        </div>
    );
};

export default RadixSort;
