let timerInterval;
let centiseconds = 0;
let seconds = 0;
let minutes = 0;
let lapCounter = 1;

const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const centisecondsSpan = document.getElementById("centiseconds");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const numLapDiv = document.querySelector(".num-lap");
const lapDurationDiv = document.querySelector(".lap-duration");
const totalTimeDiv = document.querySelector(".total-time");

let lastLapTime = 0;

function formatTime(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function getTotalCentiseconds() {
  return centiseconds + seconds * 100 + minutes * 6000;
}

function startTimer() {
  timerInterval = setInterval(() => {
    centiseconds++;
    if (centiseconds === 100) {
      centiseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
    }
    minutesSpan.textContent = formatTime(minutes);
    secondsSpan.textContent = formatTime(seconds);
    centisecondsSpan.textContent = formatTime(centiseconds);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  lapCounter = 1;
  lastLapTime = 0;
  minutesSpan.textContent = "00";
  secondsSpan.textContent = "00";
  centisecondsSpan.textContent = "00";
  numLapDiv.innerHTML = "<h6>Lap</h6>";
  lapDurationDiv.innerHTML = "<h6>Time</h6>";
  totalTimeDiv.innerHTML = "<h6>Total Time</h6>";
}

function recordLap() {
  const currentTime = getTotalCentiseconds();
  const lapTime = currentTime - lastLapTime;
  lastLapTime = currentTime;

  const lapTimeMinutes = Math.floor(lapTime / 6000);
  const lapTimeSeconds = Math.floor((lapTime % 6000) / 100);
  const lapTimeCentiseconds = lapTime % 100;

  const totalMinutes = Math.floor(currentTime / 6000);
  const totalSeconds = Math.floor((currentTime % 6000) / 100);
  const totalCentiseconds = currentTime % 100;

  numLapDiv.innerHTML += `<p>${lapCounter}</p>`;
  lapDurationDiv.innerHTML += `<p>${formatTime(totalMinutes)}:${formatTime(totalSeconds)}:${formatTime(totalCentiseconds)}</p>`;
  totalTimeDiv.innerHTML += `<p>${formatTime(lapTimeMinutes)}:${formatTime(lapTimeSeconds)}:${formatTime(lapTimeCentiseconds)}</p>`;

  lapCounter++;
}

startButton.addEventListener("click", () => {
  if (startButton.textContent === "Start") {
    startTimer();
    startButton.textContent = "Stop";
    resetButton.textContent = "Lap";
  } else {
    stopTimer();
    startButton.textContent = "Start";
    resetButton.textContent = "Reset";
  }
});

resetButton.addEventListener("click", () => {
  if (resetButton.textContent === "Reset") {
    resetTimer();
  } else {
    recordLap();
  }
});
