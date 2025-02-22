import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const Selection = () => {
    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState([]);
    const [currMinIndex, setCurrMinIndex] = useState(null);
    const [currComparing, setCurrComparing] = useState(null);
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

    const selectionSort = async (arr) => {
        let newArr = [...arr];
        let n = newArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            setCurrMinIndex(minIndex);
            
            for (let j = i + 1; j < n; j++) {
                setCurrComparing(j);
                await new Promise((resolve) => setTimeout(resolve, 100));
                
                if (newArr[j] < newArr[minIndex]) {
                    minIndex = j;
                    setCurrMinIndex(minIndex);
                }
            }
            
            if (minIndex !== i) {
                [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
                setArray([...newArr]);
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
        }
    };

    const handleSortButton = async () => {
        if (!isSorting) {
            setIsSorting(true);
            await selectionSort(array);
            setIsSorting(false);
        }
    };

    const handleButtonReset = () => {
        setReset(!reset);
    };

    return (
        <div>
            <h1>Selection Sort</h1>
            <div className="array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{
                            height: `${num * 7}px`,
                            backgroundColor:
                                idx === currMinIndex
                                    ? "red"
                                    : idx === currComparing
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

export default Selection;
