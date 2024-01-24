'use client';
import React from 'react';

interface TimerBoxProps {
  minute: string;
  second: string;
}

const TimerBox: React.FC<TimerBoxProps> = ({ minute, second }) => {
  return (
    <div>
      {minute}:{second} mins
    </div>
  );
};

export default TimerBox;
