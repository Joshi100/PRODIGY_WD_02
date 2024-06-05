let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapElement.className = 'lap';
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 100) ? '0' + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? '00' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
