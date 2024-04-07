let timers = {
    'work': { minutes: 25, seconds: 0, display: 'time-display' },
    'short-break': { minutes: 5, seconds: 0, display: 'short-break-display' },
    'long-break': { minutes: 15, seconds: 0, display: 'long-break-display' }
};

let timer;
let currentTimer = 'work';
let isRunning = false;

function startTimer(timerType) {
    if (!isRunning) {
        currentTimer = timerType;
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer(timerType) {
    clearInterval(timer);
    isRunning = false;
    let timerData = timers[timerType];
    timerData.minutes = timerType === 'work' ? 25 : timerType === 'short-break' ? 5 : 15;
    timerData.seconds = 0;
    updateDisplay(timerData.display, timerData.minutes, timerData.seconds);
}

function updateTimer() {
    let timerData = timers[currentTimer];
    if (timerData.minutes === 0 && timerData.seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        alert("Time's up!");
        return;
    }
    if (timerData.seconds === 0) {
        timerData.minutes--;
        timerData.seconds = 59;
    } else {
        timerData.seconds--;
    }
    updateDisplay(timerData.display, timerData.minutes, timerData.seconds);
}

function updateDisplay(displayId, minutes, seconds) {
    document.getElementById(displayId).innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer(timerType) {
    document.getElementById(currentTimer + '-timer').style.display = 'none';
    document.getElementById(timerType + '-timer').style.display = 'block';
    currentTimer = timerType;
    resetTimer(timerType);
}
