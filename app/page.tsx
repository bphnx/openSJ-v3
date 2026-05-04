"use client";

import React, { useState, useEffect } from 'react';
import StyleParameter from "./components/styleParameter";
import StyleSummary from './components/styleSummary';

const ALPHABET_23 = 'zyxwvutsrqpnmkjhgfedcba';
const PEN_CODE = '0123456789abcdefghjkm';

interface StyleParams {
  BAS: number; MOV: number; DIN: number; COM: number;
  SAPD: number; GCC: number; DIF: number; SOG: number; PEN: number;
}

const calculateCode = ({ BAS, MOV, DIN, COM, SAPD, GCC, DIF, SOG, PEN }: StyleParams) => {
  const basInt = Math.round(BAS * 2);
  const movInt = Math.round(MOV * 2);
  const dinInt = Math.round(DIN * 2);
  const comInt = Math.round(COM * 2);
  const sapdInt = Math.round(SAPD * 2);
  const gccInt = Math.round(GCC * 2);
  const difInt = Math.round(DIF * 2);

  const movLowDigit = movInt % 3;
  const movHighDigit = Math.floor(movInt / 3);
  const dinLowDigit = dinInt % 3;
  const dinHighDigit = Math.floor(dinInt / 3);
  const gccLowDigit = gccInt % 3;
  const gccHighDigit = Math.floor(gccInt / 3);

  let value =
    movLowDigit +
    gccLowDigit * 3 +
    dinLowDigit * 3 * 3 +
    movHighDigit * 3 * 3 * 3 +
    dinHighDigit * 3 * 3 * 3 * 3 +
    gccHighDigit * 3 * 3 * 3 * 3 * 3 +
    comInt * 3 * 3 * 3 * 3 * 3 * 3 +
    sapdInt * 3 * 3 * 3 * 3 * 3 * 3 * 7 +
    difInt * 3 * 3 * 3 * 3 * 3 * 3 * 7 * 7;

  const aVal = value % 23;
  value = Math.floor(value / 23);
  const bVal = value % 23;
  value = Math.floor(value / 23);
  const cVal = value % 23;
  value = Math.floor(value / 23);
  const dVal = value % 23;

  const d = dVal === 0 ? '' : ALPHABET_23[dVal];
  const c = cVal === 0 && d === '' ? '' : ALPHABET_23[cVal];
  const b = bVal === 0 && c === '' ? '' : ALPHABET_23[bVal];
  const a = ALPHABET_23[aVal];

  const pen = PEN === 0 ? '' : PEN_CODE[PEN];
  const sog = SOG === 0 && pen === '' ? '' : SOG.toString();

  let cFinal = c;
  if (sog !== '' && cFinal === '') {
    cFinal = 'z';
  }

  const points = basInt + movInt + dinInt + comInt + sapdInt + gccInt + difInt;
  return a + b + points.toString() + cFinal + d + sog + pen;
}

const useParameterState = (initialValue: number) => {
  const [leftValue, setLeftValue] = useState(initialValue);
  const [rightValue, setRightValue] = useState(initialValue);
  return { leftValue, setLeftValue, rightValue, setRightValue };
};

export default function Home() {
  const [leftValue, setLeftValue] = useState(5.5);
  const [rightValue, setRightValue] = useState(5.5);
  const [isFinalized, setIsFinalized] = useState(false);

  const bas = useParameterState(0);
  const mov = useParameterState(0);
  const din = useParameterState(0);
  const com = useParameterState(0);
  const sapd = useParameterState(0);
  const gcc = useParameterState(0);
  const dif = useParameterState(0);
  const sog = useParameterState(0);
  const pen = useParameterState(0);

  const leftPenalty = pen.leftValue > 0;
  const rightPenalty = pen.rightValue > 0;

  const [leftCode, setLeftCode] = useState(calculateCode({ BAS: bas.leftValue, MOV: mov.leftValue, DIN: din.leftValue, COM: com.leftValue, SAPD: sapd.leftValue, GCC: gcc.leftValue, DIF: dif.leftValue, SOG: sog.leftValue, PEN: pen.leftValue }));
  const [rightCode, setRightCode] = useState(calculateCode({ BAS: bas.rightValue, MOV: mov.rightValue, DIN: din.rightValue, COM: com.rightValue, SAPD: sapd.rightValue, GCC: gcc.rightValue, DIF: dif.rightValue, SOG: sog.rightValue, PEN: pen.rightValue }));

  useEffect(() => {
    setLeftCode(calculateCode({ BAS: bas.leftValue, MOV: mov.leftValue, DIN: din.leftValue, COM: com.leftValue, SAPD: sapd.leftValue, GCC: gcc.leftValue, DIF: dif.leftValue, SOG: sog.leftValue, PEN: pen.leftValue }));
  }, [bas.leftValue, mov.leftValue, din.leftValue, com.leftValue, sapd.leftValue, gcc.leftValue, dif.leftValue, sog.leftValue, pen.leftValue]);

  useEffect(() => {
    setRightCode(calculateCode({ BAS: bas.rightValue, MOV: mov.rightValue, DIN: din.rightValue, COM: com.rightValue, SAPD: sapd.rightValue, GCC: gcc.rightValue, DIF: dif.rightValue, SOG: sog.rightValue, PEN: pen.rightValue }));
  }, [bas.rightValue, mov.rightValue, din.rightValue, com.rightValue, sapd.rightValue, gcc.rightValue, dif.rightValue, sog.rightValue, pen.rightValue]);


  const incrementLeftValue = (value: number) => {
    setLeftValue(prev => parseFloat((prev + value).toFixed(1)));
  };

  const incrementRightValue = (value: number) => {
    setRightValue(prev => parseFloat((prev + value).toFixed(1)));
  };

  const resetValues = () => {
    bas.setLeftValue(0);
    bas.setRightValue(0);
    mov.setLeftValue(0);
    mov.setRightValue(0);
    din.setLeftValue(0);
    din.setRightValue(0);
    com.setLeftValue(0);
    com.setRightValue(0);
    sapd.setLeftValue(0);
    sapd.setRightValue(0);
    gcc.setLeftValue(0);
    gcc.setRightValue(0);
    dif.setLeftValue(0);
    dif.setRightValue(0);
    sog.setLeftValue(0);
    sog.setRightValue(0);
    pen.setLeftValue(0);
    pen.setRightValue(0);
    setLeftValue(5.5);
    setRightValue(5.5);
    setIsFinalized(false);
  };

  let pressTimer: NodeJS.Timeout;

  const handleMouseDown = () => {
    pressTimer = setTimeout(resetValues, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div className="container grid">
      <main>
        <StyleSummary leftValue={leftValue} rightValue={rightValue} leftCode={leftCode} rightCode={rightCode} isFinalized={isFinalized} leftPenalty={leftPenalty} rightPenalty={rightPenalty} />
        <StyleParameter label="BAS" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={bas.leftValue} rightValue={bas.rightValue} setLeftValue={bas.setLeftValue} setRightValue={bas.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="MOV" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={mov.leftValue} rightValue={mov.rightValue} setLeftValue={mov.setLeftValue} setRightValue={mov.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="DIN" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={din.leftValue} rightValue={din.rightValue} setLeftValue={din.setLeftValue} setRightValue={din.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="COM" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={com.leftValue} rightValue={com.rightValue} setLeftValue={com.setLeftValue} setRightValue={com.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="SAPD" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={sapd.leftValue} rightValue={sapd.rightValue} setLeftValue={sapd.setLeftValue} setRightValue={sapd.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="GCC" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={gcc.leftValue} rightValue={gcc.rightValue} setLeftValue={gcc.setLeftValue} setRightValue={gcc.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="DIF" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={dif.leftValue} rightValue={dif.rightValue} setLeftValue={dif.setLeftValue} setRightValue={dif.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="SOG" isSog={true} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={sog.leftValue} rightValue={sog.rightValue} setLeftValue={sog.setLeftValue} setRightValue={sog.setRightValue} isFinalized={isFinalized} />
        <StyleParameter label="PEN" isSog={false} isPen={true} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={pen.leftValue} rightValue={pen.rightValue} setLeftValue={pen.setLeftValue} setRightValue={pen.setRightValue} isFinalized={isFinalized} />
        {!isFinalized && (
          <button
            onClick={() => setIsFinalized(true)}
            className="finalize-button"
          >
            Finalize Evaluation
          </button>
        )}
        {isFinalized && (
          <div className="finalized-banner">
            Evaluation Finalized
          </div>
        )}
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="reset-button"
        >
          {isFinalized ? 'New Evaluation' : 'Reset All'}
        </button>
      </main>
    </div>
  );
}
