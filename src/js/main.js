// Import bootStrap custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

/* ------------------------------------------------ */

// Initiate the variables
let sessionMinutes;
let breakMinutes;
let inSession;
let timerRunning;
let secondsRemaining;
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
const honkAudio = document.getElementById("beep");
const clickAudio = document.getElementById("click");
clickAudio.volume = 0.1;

function initialise() {
  sessionMinutes = 25;
  breakMinutes = 5;
  inSession = true;
  timerRunning = false;
  secondsRemaining = resetSecondsRemaining();
  myInterval = null;
  timerName.textContent = inSession ? "Session" : "Break";
  sessionLength.textContent = sessionMinutes;
  breakLength.textContent = breakMinutes;
  display.textContent = formatTime(secondsRemaining);
  startButton.textContent = timerRunning ? "Stop" : "Start";
  clickAudio.load();
  honkAudio.load();
}
initialise();

// TODO: change button click events to press not release

// Add event listeners to the buttons
incrementBreak.addEventListener("click", () => {
  if (breakMinutes < 60) {
    clickAudio.play();
    breakMinutes++;
    breakLength.textContent = breakMinutes;
  }
});
decrementBreak.addEventListener("click", () => {
  if (breakMinutes > 1) {
    clickAudio.play();
    breakMinutes--;
    breakLength.textContent = breakMinutes;
  }
});
incrementSession.addEventListener("click", () => {
  if (sessionMinutes < 60) {
    clickAudio.play();
    sessionMinutes++;
    sessionLength.textContent = sessionMinutes;
  }
});
decrementSession.addEventListener("click", () => {
  if (sessionMinutes > 1) {
    clickAudio.play();
    sessionMinutes--;
    sessionLength.textContent = sessionMinutes;
  }
});
function disableAdjustment() {
  incrementBreak.classList.add("disabled");
  decrementBreak.classList.add("disabled");
  incrementSession.classList.add("disabled");
  decrementSession.classList.add("disabled");
}
function enableAdjustment() {
  incrementBreak.classList.remove("disabled");
  decrementBreak.classList.remove("disabled");
  incrementSession.classList.remove("disabled");
  decrementSession.classList.remove("disabled");
}
startButton.addEventListener("click", startStopTimer);
resetButton.addEventListener("click", resetTimer);

// Define a function to reset the timer seconds to match
function resetSecondsRemaining() {
  return inSession ? 60 * sessionMinutes : 60 * breakMinutes;
}

function resetTimer() {
  // reset
  initialise();
  // Clear the interval (stop the timer)
  clearInterval(myInterval);
  // Stop the sound (if it is playing) and rewind it to the beginning
  honkAudio.pause();
  honkAudio.load();
}

function startStopTimer() {
  timerRunning = !timerRunning;
  startButton.textContent = timerRunning ? "Stop" : "Start";
  if (timerRunning) {
    myInterval = setInterval(runTimer, 1000);
    disableAdjustment();
  } else {
    clearInterval(myInterval);
    enableAdjustment();
  }
}

function formatTime(totalSeconds) {
  // Calculate minutes and seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  // Format the output with leading zeros
  let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${displayMinutes}:${displaySeconds}`;
}

function runTimer() {
  // Update the timer name
  timerName.textContent = inSession ? "Session" : "Break";
  // Update the timer digits
  display.textContent = formatTime(secondsRemaining);
  // Decrement the time remaining by one second
  secondsRemaining--;
  // When timer reaches zero do all the things - play sound, reset timer, and start new timer
  if (secondsRemaining < 0) {
    timesUp();
  }
}

function timesUp() {
  // Sound an alarm
  honkAudio.play();
  // Clear the interval - yes
  clearInterval(myInterval);
  // Clear the inverval variable to null
  myInterval = null;
  // Flip the inSession boolean
  inSession = !inSession;
  // Set the duration to the next timer (secondsRemaining)
  secondsRemaining = resetSecondsRemaining();
  // Start the next timer
  myInterval = setInterval(runTimer, 1000);
}
