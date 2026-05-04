"use client";

import React from 'react';
import "./styles.css";

interface StyleSummaryProps {
  leftValue: number;
  rightValue: number;
  leftCode: string;
  rightCode: string;
  isFinalized: boolean;
  leftPenalty: boolean;
  rightPenalty: boolean;
}

const StyleSummary: React.FC<StyleSummaryProps> = ({ leftValue, rightValue, leftCode, rightCode, isFinalized, leftPenalty, rightPenalty }) => {
  if (!isFinalized) return null;

  return (
    <div className="summaryRow">
      <div className="summaryColumn">
        <span className={`scoreLarge ${leftPenalty ? 'penalty-active' : ''}`}>{leftValue}</span>
        <span className={`codeSmall ${leftPenalty ? 'penalty-active' : ''}`}>{leftCode}</span>
      </div>
      <div className="summaryColumn">
        <span className={`scoreLarge ${rightPenalty ? 'penalty-active' : ''}`}>{rightValue}</span>
        <span className={`codeSmall ${rightPenalty ? 'penalty-active' : ''}`}>{rightCode}</span>
      </div>
    </div>
  );
};

export default StyleSummary;
