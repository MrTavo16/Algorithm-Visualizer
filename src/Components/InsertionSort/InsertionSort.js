import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const Insertion = () => {
    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState([]);
    const [currComparing, setCurrComparing] = useState(null);
    const [currSwapping, setCurrSwapping] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        generateArray();
    }, [reset]);

    const generateArray = () => {
        let arr = Array.from({ length: 25 }, (_, i) => i + 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setArray(arr);
    };

    const insertionSort = async (arr) => {
        let newArr = [...arr];
        let n = newArr.length;

        for (let i = 1; i < n; i++) {
            let key = newArr[i];
            let j = i - 1;
            setCurrComparing(i);
            
            while (j >= 0 && newArr[j] > key) {
                setCurrSwapping(j + 1);
                newArr[j + 1] = newArr[j];
                setArray([...newArr]);
                await new Promise((resolve) => setTimeout(resolve, 100));
                j = j - 1;
            }
            newArr[j + 1] = key;
            setArray([...newArr]);
            await new Promise((resolve) => setTimeout(resolve, 300));
        }
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            setIsSorting(true);
            await insertionSort(array);
            setIsSorting(false);
        }
    };

    const handleButtonReset = () => {
        setReset(!reset);
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
                            height: `${num * 7}px`,
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
                <button onClick={handleButtonReset}>New Array</button>
            </div>
        </div>
    );
};

export default Insertion;
