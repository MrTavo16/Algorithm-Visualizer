import React, { useState, useEffect } from "react";
import "./MergeSort.css";

const MergeSort = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        generateNewArray();
    }, []);

    // Generate a new random array
    const generateNewArray = () => {
        const newArray = Array.from({ length: 50 }, () =>
            Math.floor(Math.random() * 100) + 5
        );
        setArray(newArray);
    };

    // Merge Sort Algorithm with animations
    const getMergeSortAnimations = (arr) => {
        const animations = [];
        const auxiliaryArray = [...arr];

        const mergeSortRecursive = (mainArray, start, end) => {
            if (start >= end) return;
            const mid = Math.floor((start + end) / 2);
            mergeSortRecursive(mainArray, start, mid);
            mergeSortRecursive(mainArray, mid + 1, end);
            merge(mainArray, auxiliaryArray, start, mid, end, animations);
        };

        const merge = (mainArray, auxiliaryArray, start, mid, end, animations) => {
            let i = start, j = mid + 1, k = start;

            while (i <= mid && j <= end) {
                animations.push({ type: "compare", indices: [i, j] });
                if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
                    mainArray[k++] = auxiliaryArray[i++];
                } else {
                    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
                    mainArray[k++] = auxiliaryArray[j++];
                }
            }

            while (i <= mid) {
                animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
                mainArray[k++] = auxiliaryArray[i++];
            }

            while (j <= end) {
                animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
                mainArray[k++] = auxiliaryArray[j++];
            }
        };

        mergeSortRecursive(auxiliaryArray, 0, arr.length - 1);
        return animations;
    };

    const animateMergeSort = (animations) => {
        const bars = document.getElementsByClassName("merge-sort-array-bar");

        animations.forEach((animation, idx) => {
            setTimeout(() => {
                if (animation.type === "compare") {
                    const [barOneIdx, barTwoIdx] = animation.indices;
                    highlightBars(bars, [barOneIdx, barTwoIdx], "red");
                } else if (animation.type === "overwrite") {
                    const { index, value } = animation;
                    bars[index].style.height = `${value}px`;
                }
            }, idx * 50);

            setTimeout(() => {
                if (animation.type === "compare") {
                    const [barOneIdx, barTwoIdx] = animation.indices;
                    highlightBars(bars, [barOneIdx, barTwoIdx], "teal");
                }
            }, idx * 50 + 25);
        });

        setTimeout(() => setIsSorting(false), animations.length * 50);
    };

    const highlightBars = (bars, indices, color) => {
        indices.forEach((idx) => {
            bars[idx].style.backgroundColor = color;
        });
    };

    const handleMergeSort = () => {
        if (isSorting) return;
        setIsSorting(true);
        const animations = getMergeSortAnimations(array);
        animateMergeSort(animations);
    };

    return (
        <div>
            <h1>Merge Sort Visualizer</h1>
            <div className="merge-sort-array-container">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="merge-sort-array-bar"
                        style={{
                            height: `${value}px`,
                            backgroundColor: "teal",
                        }}
                    ></div>
                ))}
            </div>
            <div className="merge-sort-controls">
                <button
                    className="merge-sort-button"
                    onClick={generateNewArray}
                    disabled={isSorting}
                >
                    {isSorting ? "Sorting..." : "Generate New Array"}
                </button>
                <button
                    className="merge-sort-button"
                    onClick={handleMergeSort}
                    disabled={isSorting}
                >
                    {isSorting ? "Sorting..." : "Merge Sort"}
                </button>
            </div>
        </div>
    );
};

export default MergeSort;
