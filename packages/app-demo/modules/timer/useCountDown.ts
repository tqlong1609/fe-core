import { useEffect, useState } from 'react';

const formatTime = (value: string): string => {
  return value.length > 1 ? value : `0${value}`;
};

export const useCountDown = (initSecond: number) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initSecond);
  const [timerWorker, setTimerWorker] = useState<Worker>();

  useEffect(() => {
    setTimerWorker(
      new Worker(new URL('./countdownWorker.js', import.meta.url))
    );
  }, []);

  useEffect(() => {
    if (timerWorker) {
      timerWorker.onmessage = ({ data: { time } }) => {
        setSecondsRemaining(time);
        if (time === 0) {
          handleStop();
        }
      };
    }
  }, [timerWorker]);

  const handleStop = () => {
    timerWorker?.postMessage({ turn: 'off' });
  };

  const handleStart = (initTime = secondsRemaining) => {
    timerWorker?.postMessage({ turn: 'on', duration: initTime });
  };

  const handleReset = (time = initSecond) => {
    setSecondsRemaining(time);
    timerWorker?.postMessage({ turn: 'on', duration: time });
  };

  const minute = Math.trunc(secondsRemaining / 60);
  const second = secondsRemaining % 60;

  return {
    timerWorker,
    secondsRemaining,
    minute: formatTime(minute.toString()),
    second: formatTime(second.toString()),
    handleStart,
    handleStop,
    handleReset,
  };
};
