let timerInterval;
let time = 0;
self.onmessage = function ({ data: { turn, duration } }) {
  if (turn === 'off' || timerInterval) {
    clearInterval(timerInterval);
  }
  if (turn === 'on') {
    clearInterval(timerInterval);
    time = duration;
    timerInterval = setInterval(() => {
      time -= 1;
      self.postMessage({ time });
    }, 1000);
  }
};
