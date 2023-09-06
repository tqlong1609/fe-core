import { useState } from 'react';
import { useInterval } from './useInterval';

const INITIAL_COUNT = 120;
const TIME_COUNT = 1000;

export const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

export const useCountDown = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState<string>(STATUS.STOPPED);

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STARTED);
    setSecondsRemaining(INITIAL_COUNT);
  };

  const isStopped = () => {
    return status === STATUS.STOPPED;
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    // passing null stops the interval
    status === STATUS.STARTED ? TIME_COUNT : null
  );
  const minute = Math.trunc(secondsRemaining / 60);
  const second = secondsRemaining % 60;

  return {
    minute,
    second,
    secondsRemaining,
    handleStart,
    handleStop,
    handleReset,
    status,
    isStopped: isStopped(),
  };
};
