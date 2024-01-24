'use client';
import { useVisiblePage } from '@tqlong1609/hooks';
import moment from 'moment';
import React from 'react';
import TimerBox from './TimerBox';
import {
  COUNT_TIMER_MAX,
  TIMER_SECOND,
  TIMER_SECOND_EXTEND,
  TIMER_SHOW_WARNING_SECONDS,
} from './const';
import {
  getExtendsTimer,
  getSecondTimer,
  putExtendsTimer,
  putSecondTimer,
  removeSecondTimer,
} from './localstorage';
import { useCountDown } from './useCountDown';

const isEquals = (a: number, b: number): boolean => {
  return Math.abs(a - b) < 0.0000001;
};

type TimerBoxContainerProps = {
  isShowWarning?: boolean;
  onTimeOff?: () => void;
};

const TimerBoxContainer: React.FC<TimerBoxContainerProps> = ({
  isShowWarning = true,
  onTimeOff,
}) => {
  const countMaximumTimer = React.useRef(COUNT_TIMER_MAX);
  const timeRef = React.useRef<number | undefined>();
  const timeStart = React.useRef<Date>();
  const timeCurrentStart = React.useRef<number>();

  const { timerWorker, secondsRemaining, minute, second, handleReset } =
    useCountDown(TIMER_SECOND);

  React.useEffect(() => {
    const time = getSecondTimer();
    if (time) {
      handleReset(time);
    }
  }, []);

  React.useEffect(() => {
    const time = getExtendsTimer();
    if (time) {
      countMaximumTimer.current = time;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      putExtendsTimer(countMaximumTimer.current);
      putSecondTimer(timeRef.current ?? TIMER_SECOND);
    };
  }, []);

  // remaining count maximum timer to localstorage
  React.useEffect(() => {
    const unLoadEvent = () => {
      putExtendsTimer(countMaximumTimer.current);
    };
    window.addEventListener('beforeunload', unLoadEvent);
    return () => {
      window.removeEventListener('beforeunload', unLoadEvent);
    };
  }, []);

  // remaining second time to localstorage
  React.useEffect(() => {
    const alertUser = () => {
      putSecondTimer(secondsRemaining);
    };
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, [secondsRemaining]);

  React.useEffect(() => {
    if (timerWorker) {
      resetTimer();
    }
  }, [timerWorker]);

  React.useEffect(() => {
    timeRef.current = secondsRemaining;
    if (
      isShowWarning &&
      isEquals(secondsRemaining, TIMER_SHOW_WARNING_SECONDS)
    ) {
      onWarning && onWarning();
    } else if (secondsRemaining === 0) {
      onTimeOff && onTimeOff();
    }
  }, [secondsRemaining]);

  useVisiblePage(
    () => {
      if (timeCurrentStart.current && timeStart.current && timeRef.current) {
        const timeEnd = moment(new Date());
        const timeCurrentEnd = timeRef.current;
        const diffTimeEnd = timeEnd.diff(moment(timeStart.current), 'seconds');
        const diffTimeCurrent = timeCurrentStart.current - timeCurrentEnd;
        const diffTime = Math.abs(diffTimeCurrent - diffTimeEnd);
        if (!(diffTime >= 0 && diffTime <= 5)) {
          handleReset(timeCurrentStart.current - diffTimeEnd);
        }
      }
    },
    () => {
      if (timeRef.current) {
        timeStart.current = new Date();
        timeCurrentStart.current = timeRef.current;
      }
    },
    [timerWorker]
  );

  const resetTimer = () => {
    handleReset(secondsRemaining);
    removeSecondTimer();
  };

  const extendsTimer = (mins = TIMER_SECOND_EXTEND) => {
    handleReset(mins);
  };

  const onCancel = () => {};

  const onWarning = () => {
    countMaximumTimer.current--;
    if (countMaximumTimer.current > 0) {
      // show warning
    }
  };

  return (
    <div>
      <TimerBox minute={minute} second={second} />
      <button
        onClick={() => {
          extendsTimer();
        }}
      >
        Continue
      </button>
      <button
        onClick={() => {
          onCancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default TimerBoxContainer;
