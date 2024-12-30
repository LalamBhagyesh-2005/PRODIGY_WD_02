let timer;
let microseconds = 0;
let seconds = 0;
let minutes = 0;
let running = false;
let lapCount = 1;  // To keep track of lap numbers

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

function formatTime() {
    const formattedMicroseconds = microseconds.toString().padStart(3, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}:${formattedMicroseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime();
}

function addLap() {
    const lapTime = formatTime();
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCount++;
}

function pauseStopwatch() {
    running = false;
    clearInterval(timer);
    addLap(); // Add lap when paused
}

function startStopwatch() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            microseconds++;
            if (microseconds === 100) {
                microseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10); // Update every 10 milliseconds (for microseconds effect)
    }
}

startButton.addEventListener('click', () => {
    startStopwatch();
});

pauseButton.addEventListener('click', () => {
    pauseStopwatch();
});

resetButton.addEventListener('click', () => {
    running = false;
    clearInterval(timer);
    microseconds = 0;
    seconds = 0;
    minutes = 0;
    lapCount = 1; // Reset lap count
    updateDisplay();
    lapsList.innerHTML = '';  // Clear lap list
});

lapButton.addEventListener('click', () => {
    if (running || !running) {  // Lap can be added even if the stopwatch is running or paused
        addLap();  // Add lap time when lap button is clicked
    }
});
