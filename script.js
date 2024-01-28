// Digital Clock
let clockInterval;
let timeFormat = 12;

function updateDigitalClock() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString(undefined, options);
  const timeStr = now.toLocaleTimeString(undefined, { hour12: timeFormat === 12 });

  document.getElementById('digitalClock').innerText = `${dateStr} - ${timeStr}`;
}

function toggleClock() {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  } else {
    updateDigitalClock();
    clockInterval = setInterval(updateDigitalClock, 1000);
  }
}

function changeTimeFormat() {
  timeFormat = parseInt(document.getElementById('timeFormat').value, 10);
  updateDigitalClock();
}

// Timer
let timerInterval;
let initialTimerValue;

function startTimer() {
  const hours = parseInt(document.getElementById('timerHours').value, 10) || 0;
  const minutes = parseInt(document.getElementById('timerMinutes').value, 10) || 0;

  initialTimerValue = hours * 60 + minutes;
  let timerValue = initialTimerValue;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (timerValue > 0) {
      timerValue--;
      updateTimerDisplay(timerValue);
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);

  updateTimerDisplay(timerValue);
}

function stopTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay(initialTimerValue);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timerHours').value = '';
  document.getElementById('timerMinutes').value = '';
  updateTimerDisplay(0);
}

function updateTimerDisplay(timerValue) {
  const hours = Math.floor(timerValue / 60);
  const minutes = timerValue % 60;
  document.getElementById('timerHours').value = hours.toString().padStart(2, '0');
  document.getElementById('timerMinutes').value = minutes.toString().padStart(2, '0');
}

// Stop Watch
let stopWatchInterval;
let stopWatchValue = 0;
let lapCount = 1;

function startStopWatch() {
if (stopWatchInterval) {
clearInterval(stopWatchInterval);
stopWatchInterval = null;
} else {
stopWatchValue = 0; // Reset stopwatch value when starting again
updateStopWatchDisplay();
stopWatchInterval = setInterval(() => {
  stopWatchValue++;
  updateStopWatchDisplay();
}, 1000);
}
}


function recordLap() {
  const lapTime = stopWatchValue;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
  document.getElementById('lapList').appendChild(lapItem);
  lapCount++;
}

function resetStopWatch() {
  clearInterval(stopWatchInterval);
  stopWatchValue = 0;
  updateStopWatchDisplay();
  lapCount = 1;
  document.getElementById('lapList').innerHTML = '';
}

function updateStopWatchDisplay() {
  document.getElementById('stopWatch').innerText = formatTime(stopWatchValue);
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}