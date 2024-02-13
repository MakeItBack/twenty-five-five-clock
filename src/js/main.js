// Import bootStrap custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

/* ------------------------------------------------ */

// Initiate the variables
let sessionMinutes = 25;
let breakMinutes = 5;
let inSession = true;
let timerRunning = false;
let secondsRemaining = resetSecondsRemaining();
let myInterval;

// Select the DOM elements
const sessionLength = document.getElementById("session-length");
const breakLength = document.getElementById("break-length");
const display = document.getElementById("time-left");
const timerName = document.getElementById("timer-label");
const startButton = document.getElementById("start_stop");
const resetButton = document.getElementById("reset");
const incrementBreak = document.getElementById("break-increment");
const decrementBreak = document.getElementById("break-decrement");
const incrementSession = document.getElementById("session-increment");
const decrementSession = document.getElementById("session-decrement");

// Set the initial displayed values
timerName.textContent = inSession ? "Session" : "Break";
sessionLength.textContent = sessionMinutes;
breakLength.textContent = breakMinutes;
display.textContent = `${sessionMinutes}:00`;
startButton.textContent = timerRunning ? "Stop" : "Start";

// Add event listeners to the buttons
incrementBreak.addEventListener("click", () => {
  if (breakMinutes < 60) {
    breakMinutes++;
    breakLength.textContent = breakMinutes;
  }
});
decrementBreak.addEventListener("click", () => {
  if (breakMinutes > 1) {
    breakMinutes--;
    breakLength.textContent = breakMinutes;
  }
});
incrementSession.addEventListener("click", () => {
  if (sessionMinutes < 60) {
    sessionMinutes++;
    sessionLength.textContent = sessionMinutes;
  }
});
decrementSession.addEventListener("click", () => {
  if (sessionMinutes > 1) {
    sessionMinutes--;
    sessionLength.textContent = sessionMinutes;
  }
});

startButton.addEventListener("click", operateTimer);

resetButton.addEventListener("click", () => {
  inSession = true;
  secondsRemaining = resetSecondsRemaining();
  display.textContent = `${sessionMinutes}:00`;
});

// Define a function to reset the timer
function resetSecondsRemaining() {
  return inSession ? 60 * sessionMinutes : 60 * breakMinutes;
}

function operateTimer() {
  timerRunning = !timerRunning;
  startButton.textContent = timerRunning ? "Stop" : "Start";
  if (timerRunning) {
    myInterval = setInterval(updateTimer, 1000);
  } else {
    clearInterval(myInterval);
  }
}

// Define a function to update the timer
function updateTimer() {
  timerName.textContent = inSession ? "Session" : "Break";
  // Calculate the remaining minutes and seconds
  let remainingMinutes = Math.floor(secondsRemaining / 60);
  let remainingSeconds = secondsRemaining % 60;

  // Format the output with leading zeros
  let minutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
  let seconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  // Display the timer
  display.textContent = `${minutes}:${seconds}`;

  // Decrement the duration by one second
  secondsRemaining--;

  if (!timerRunning) {
    return;
  }

  // Reset the duration when it reaches zero
  if (secondsRemaining < 0) {
    alert("Time's up!");
    /* when timer reaches 0, switch to break timer
  - sound an alarm
  - flip the inSession boolean
  - start the break timer
  */
    inSession = !inSession;
    resetSecondsRemaining();
  }
}
