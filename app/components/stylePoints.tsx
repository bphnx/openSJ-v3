"use client";

import React from 'react';
import "./styles.css";

interface StylePointsProps {
    leftValue: number;
    rightValue: number;
    isFinalized: boolean;
    leftPenalty: boolean;
    rightPenalty: boolean;
}

const StylePoints: React.FC<StylePointsProps> = ({ leftValue, rightValue, isFinalized, leftPenalty, rightPenalty }) => {
    if (!isFinalized) {
        return null;
    }

    return (
        <div className="row">
            <span className={`scorePoints ${leftPenalty ? 'penalty-active' : ''}`}>{leftValue}</span>
            <div className="internalRow" ></div>
            <span className={`scorePoints ${rightPenalty ? 'penalty-active' : ''}`}>{rightValue}</span>
        </div>
    );
};

export default StylePoints;