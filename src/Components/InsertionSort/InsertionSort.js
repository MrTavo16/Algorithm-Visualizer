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
        const arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100) + 1);
        setArray(arr);
        setCurrComparing(null);
        setCurrSwapping(null);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const insertionSort = async () => {
        setIsSorting(true);
        const newArr = [...array];

        for (let i = 1; i < newArr.length; i++) {
            const key = newArr[i];
            let j = i - 1;

            while (j >= 0 && newArr[j] > key) {
                setCurrComparing(j);
                setCurrSwapping(j + 1);

                newArr[j + 1] = newArr[j];
                setArray([...newArr]);

                await delay(150);
                j--;
            }

            newArr[j + 1] = key;
            setArray([...newArr]);
            await delay(150);
        }

        setCurrComparing(null);
        setCurrSwapping(null);
        setIsSorting(false);
    };

    const handleSortButton = async () => {
        if (!isSorting) {
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
                                idx === currSwapping
                                    ? "orange"
                                    : idx === currComparing
                                    ? "red"
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
