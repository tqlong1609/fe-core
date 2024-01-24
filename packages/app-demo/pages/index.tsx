'use client';
import TimerBoxContainer from '../modules/timer/TimerBoxContainer';

export function Home() {
  const onTimeOff = () => {
    console.log('Time off');
  };
  return (
    <>
      <TimerBoxContainer onTimeOff={onTimeOff} />
    </>
  );
}

export default Home;
