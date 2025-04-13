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
        const arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100) + 1);
        setArray(arr);
        setCurrComparing(null);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const getMax = (arr) => Math.max(...arr);

    const countingSort = async (arr, exp) => {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        // Count occurrences
        for (let i = 0; i < arr.length; i++) {
            const index = Math.floor(arr[i] / exp) % 10;
            count[index]++;
        }

        // Update count[i] to have actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build output array (stable sort)
        for (let i = arr.length - 1; i >= 0; i--) {
            const index = Math.floor(arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        // Copy back to original array with visualization
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            setCurrComparing(i);
            setArray([...arr]);
            await delay(100);
        }

        setCurrComparing(null);
    };

    const radixSort = async () => {
        setIsSorting(true);
        const newArr = [...array];
        const max = getMax(newArr);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await countingSort(newArr, exp);
        }

        setArray([...newArr]);
        setCurrComparing(null);
        setIsSorting(false);
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            await radixSort();
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
