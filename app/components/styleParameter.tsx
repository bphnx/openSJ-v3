"use client";

import React from 'react';
import "./styles.css";

interface StyleParameterProps {
    label: string;
    isSog: boolean;
    isPen: boolean;
    leftValue: number;
    rightValue: number;
    setLeftValue: React.Dispatch<React.SetStateAction<number>>;
    setRightValue: React.Dispatch<React.SetStateAction<number>>;
    incrementLeftValue: (value: number) => void;
    incrementRightValue: (value: number) => void;
    isFinalized: boolean;

}

const StyleParameter: React.FC<StyleParameterProps> = ({ label, isSog, isPen, incrementLeftValue, incrementRightValue, leftValue, rightValue, setLeftValue, setRightValue, isFinalized }) => {
    const max = isPen ? 20 : 3;
    const step = (isPen || isSog) ? 1 : 0.5;
    const numSteps = Math.round(max / step);

    const incrementValue = (value: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
        const newValue = parseFloat((value + step).toFixed(1));
        setValue(newValue > max ? 0 : newValue);
    };

    const checkColor = () => {
        if (isPen) return "red";
        if (isSog) return "grey";
        return "#007bff";
    };

    const handleLeftClick = () => {
        if (isFinalized) return;
        const wasMax = leftValue === max;
        incrementValue(leftValue, setLeftValue);
        if (isPen) {
            incrementLeftValue(wasMax ? (numSteps * 0.5) : -0.5);
        } else {
            incrementLeftValue(wasMax ? -(numSteps * 0.1) : 0.1);
        }
    };

    const handleRightClick = () => {
        if (isFinalized) return;
        const wasMax = rightValue === max;
        incrementValue(rightValue, setRightValue);
        if (isPen) {
            incrementRightValue(wasMax ? (numSteps * 0.5) : -0.5);
        } else {
            incrementRightValue(wasMax ? -(numSteps * 0.1) : 0.1);
        }
    };

    return (
        <div className="row" style={{ backgroundColor: `${checkColor()}` }}>
            <button
                disabled={isFinalized}
                style={{ flex: '1', backgroundColor: `${checkColor()}`, width: '10vw', opacity: isFinalized ? 0.5 : 1, cursor: isFinalized ? 'not-allowed' : 'pointer' }}
                onClick={handleLeftClick}
            >
                {leftValue}
            </button>
            <div style={{ flex: '2', textAlign: 'center', width: '50vw', maxWidth: '200px' }}>{label}</div>
            <button
                disabled={isFinalized}
                style={{ flex: '1', backgroundColor: `${checkColor()}`, width: '10vw', opacity: isFinalized ? 0.5 : 1, cursor: isFinalized ? 'not-allowed' : 'pointer' }}
                onClick={handleRightClick}
            >
                {rightValue}
            </button>
        </div >
    );
};

export default StyleParameter;