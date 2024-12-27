import React, { useState, useEffect } from "react";
import "./Visualizer.css";

const Visualizer = () => {
    const [bubbleSwitch, setBubbleSwitch] = useState(false);
    const [array, setArray] = useState([]);
    const [currNumOne, setCurrNumOne] = useState(null);
    const [currNumTwo, setCurrNumTwo] = useState(null);
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const arr = [];
        for (let i = 1; i <= 25; i++) {
            arr.push(i);
        }
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setArray(arr);
    }, [reset])

    const bubbleSort = async (arr) => {
        let newArr = [...arr];
        let l = newArr.length;
        for (let i = 0; i < l - 1; i++) {
            for (let j = 0; j < l - i - 1; j++) {
                if (newArr[j] > newArr[j + 1]) {
                    setCurrNumOne(newArr[j]);
                    setCurrNumTwo(newArr[j + 1]);
                    let temp = newArr[j];
                    newArr[j] = newArr[j + 1];
                    newArr[j + 1] = temp;
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 100);
                    });
                    setArray([...newArr]);
                }
            }
        }
        return newArr;
    };

    const handleSortButton = async () => {
        if (!bubbleSwitch) {
            setBubbleSwitch(true);
            await bubbleSort(array);
            setBubbleSwitch(false);
        }
    };

    const handleButtonReset = ()=>{
        setReset(!reset)
    }

    return (
        <div>
            <h1>Bubble Sort</h1>
            <div className="array-container">
                {array.length ? array.map((num, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{
                            height: `${num * 7}px`,
                            backgroundColor:
                                num === currNumOne || num === currNumTwo
                                    ? "orange"
                                    : "teal",
                        }}
                    ></div>
                )) : <></>}
            </div>
            <div>
                <button onClick={handleSortButton} disabled={bubbleSwitch}>
                    {bubbleSwitch ? "Sorting..." : "Sort"}
                </button>
                <button onClick={handleButtonReset}>
                    {'New Array'}
                </button>
            </div>

        </div>
    );
};

export default Visualizer;
