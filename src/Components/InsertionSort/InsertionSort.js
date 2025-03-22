import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const InsertionSort = () => {
    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState([]);
    const [currComparing, setCurrComparing] = useState(null);
    const [currSwapping, setCurrSwapping] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        generateArray();
    }, [reset]);

    const generateArray = () => {
        let arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100) + 1);
        setArray(arr);
        setCurrComparing(null);
        setCurrSwapping(null);
    };

    const insertionSort = async () => {
        let newArr = [...array];
        let n = newArr.length;

        for (let i = 1; i < n; i++) {
            let key = newArr[i];
            let j = i - 1;
            setCurrComparing(i);
            await new Promise((resolve) => setTimeout(resolve, 200));

            while (j >= 0 && newArr[j] > key) {
                setCurrSwapping(j + 1);
                newArr[j + 1] = newArr[j];
                setArray([...newArr]); // Update UI
                await new Promise((resolve) => setTimeout(resolve, 200));
                j--;
            }

            newArr[j + 1] = key;
            setArray([...newArr]); // Ensure UI update after placing the key
            setCurrComparing(null);
            setCurrSwapping(null);
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        setIsSorting(false);
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            setIsSorting(true);
            await insertionSort();
        }
    };

    const handleButtonReset = () => {
        if (!isSorting) {
            setReset((prev) => !prev);
        }
    };

    return (
        <div>
            <h1>Insertion Sort</h1>
            <div className="array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{
                            height: `${num * 3}px`,
                            backgroundColor:
                                idx === currComparing
                                    ? "red"
                                    : idx === currSwapping
                                    ? "orange"
                                    : "teal",
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

export default InsertionSort;
