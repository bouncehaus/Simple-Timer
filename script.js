const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

let intervalId;
let totalTime;
let currentTime;
let timerWasRunning = false;

function updateTimerDisplay() {
    const displayHours = Math.floor(currentTime / 3600)

    const displayMinutes = Math.floor((currentTime % 3600) / 60)

    const displaySeconds = Math.floor(currentTime % 60)

    const formattedHours = displayHours < 10 ? "0" + displayHours : displayHours;

    const formattedMinutes = displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;

    const formattedSeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;

    timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

function startTimer() {
    currentTime = totalTime;
    updateTimerDisplay();

    intervalId = setInterval(function  () {
        currentTime--;
        updateTimerDisplay();

        if(currentTime === 0) {
            clearInterval(intervalId);
        }
    }, 1000)
}

startButton.addEventListener("click", function () {
    if (intervalId) {
        clearInterval(intervalId);
    }

    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
        if (!timerWasRunning) {
            startTimer();
        } else {
            intervalId = setInterval(function () {
                currentTime--;
                updateTimerDisplay();

                if(currentTime === 0) {
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    }
});

pauseButton.addEventListener("click", function () {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        timerWasRunning = true;
    }
});

resetButton.addEventListener("click", function () {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    timerWasRunning = false;
    totalTime = 0;
    currentTime = 0;
    updateTimerDisplay();
    timerDisplay.currentTime = 0;
    hoursInput.value = null;
    minutesInput.value = null;
    secondsInput.value = null;
})