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

    const getMax = (arr) => Math.max(...arr);

    const countingSort = async (arr, exp) => {
        const output = new Array(arr.length);
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
            setCurrComparing(i);
            await new Promise((resolve) => setTimeout(resolve, 100));
            arr[i] = output[i];
            setArray([...arr]); // trigger re-render
        }
    };

    const radixSort = async () => {
        const newArr = [...array];
        const max = getMax(newArr);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await countingSort(newArr, exp);
        }

        setCurrComparing(null);
        setArray([...newArr]);
        setIsSorting(false);
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            setIsSorting(true);
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
