import { COUNT_TIMER_MAX } from './const';

const MAXIMUM_EXTENDS_TIME = 'mxe';
const TIMER_LOCAL_STORAGE = 'timer';

export const getExtendsTimer = (): number | null => {
  if (typeof window === 'undefined') return null;
  const maximumExtend = localStorage.getItem(MAXIMUM_EXTENDS_TIME);
  if (maximumExtend) {
    return Number(maximumExtend);
  } else {
    return null;
  }
};

export const getSecondTimer = (): number | null => {
  if (typeof window === 'undefined') return null;
  const timer = localStorage.getItem(TIMER_LOCAL_STORAGE);
  if (timer) {
    return Number(timer);
  } else {
    return null;
  }
};

export const putSecondTimer = (second: number) => {
  if (typeof window === 'undefined') return null;
  localStorage.setItem(TIMER_LOCAL_STORAGE, second.toString());
};

export const removeSecondTimer = () => {
  if (typeof window === 'undefined') return null;
  localStorage.removeItem(TIMER_LOCAL_STORAGE);
};

export const putExtendsTimer = (time = COUNT_TIMER_MAX) => {
  if (typeof window === 'undefined') return null;
  localStorage.setItem(MAXIMUM_EXTENDS_TIME, time.toString());
};
