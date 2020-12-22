// ANCHOR -- Element Selectors --
const playBtn = document.querySelector(".btn-play");
const playIcon = document.querySelector("#togglePlayStopIcon");
const deleteBtn = document.querySelector(".btn-delete");
const abateBtn = document.querySelector(".btn-abate");
const btn0 = document.querySelector(".btn-0");
const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btn4 = document.querySelector(".btn-4");
const btn5 = document.querySelector(".btn-5");
const btn6 = document.querySelector(".btn-6");
const btn7 = document.querySelector(".btn-7");
const btn8 = document.querySelector(".btn-8");
const btn9 = document.querySelector(".btn-9");
// const day1Display = document.querySelector('#days1');
const hourxDisplay = document.querySelector("#hoursx");
const hour1Display = document.querySelector("#hours1");
const hour2Display = document.querySelector("#hours2");
const minute1Display = document.querySelector("#minutes1");
const minute2Display = document.querySelector("#minutes2");
const second1Display = document.querySelector("#seconds1");
const second2Display = document.querySelector("#seconds2");

// ANCHOR -- Event Listeners --
playBtn.addEventListener("click", togglePlayStop);
deleteBtn.addEventListener("click", deleteTimer);
abateBtn.addEventListener("click", abateTimer);
btn0.addEventListener("click", appendTimer);
btn1.addEventListener("click", appendTimer);
btn2.addEventListener("click", appendTimer);
btn3.addEventListener("click", appendTimer);
btn4.addEventListener("click", appendTimer);
btn5.addEventListener("click", appendTimer);
btn6.addEventListener("click", appendTimer);
btn7.addEventListener("click", appendTimer);
btn8.addEventListener("click", appendTimer);
btn9.addEventListener("click", appendTimer);

// ANCHOR -- Global Variables --

currentTime = ["", "", "", "", "", "", ""];
let timerRunning = false;
let interval;

// ANCHOR -- Functions --

function appendTimer() {
  // timer cannot be running
  if (!timerRunning) {
    // Timer is empty, add digit to the end of the timer array
    if (checkForEmptyTime(currentTime)) {
      if (this.innerHTML != 0) {
        currentTime[6] = this.innerHTML;
      }
      // array is not empty
    } else {
      //check if array is full
      // console.log(currentTime[1]);
      if (currentTime[1] == 0) {
        // shift cells to the left
        shiftCellsLeft();
        // append new input to the last cell
        currentTime[6] = this.innerHTML;
      }
    }
    // Timer is not empty, cannot add more digits to timer
    renderTime();
  }
}

function togglePlayStop() {
  // if timer is not empty
  if (!checkForEmptyTime(currentTime)) {
    // toggle the play/stop icon
    if (timerRunning === true) {
      console.log("stopping timer");
      playIcon.classList.add("fa-play");
      playIcon.classList.remove("fa-pause");
      stopTimer();
    } else {
      console.log("starting timer");
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
      timerRunning = true;
      currentTime = addTimeUpwards(currentTime);
      renderTime();
      runTimer();
    }
  }
  // } else {
  //   console.log("it thinks the time is empty");
  // }
}

function stopTimer() {
  timerRunning = false;
  clearInterval(interval);
}

function deleteTimer() {
  // timer cannot be empty
  if (!checkForEmptyTime(currentTime)) {
    currentTime = ["", "", "", "", "", "", ""];
    stopTimer();
    playIcon.classList.add("fa-play");
    playIcon.classList.remove("fa-pause");
    renderTime();
  }
}

function abateTimer() {
  if (!timerRunning) {
    if (!checkForEmptyTime(currentTime)) {
      shiftCellsRight();
      currentTime[0] = "";
      renderTime();
    }
  }
}

function runTimer() {
  if (timerRunning === true) {
    interval = setInterval(function () {
      decreaseSeconds();
      renderTime();
    }, 1000);
  }
}

function decreaseSeconds() {
  // decrease the single-second digit if over 0
  if (currentTime[6] > 0) {
    currentTime[6]--;

    // if the last digit is zero
  } else if (parseInt(currentTime[6], 10) === 0) {
    // check if timer is up
    if (checkForEmptyTime(currentTime)) {
      console.log(`CheckForEmpty is true!`);

      //  Times up!
      deleteTimer();
      timeEnd();
    }
    // loop backwards through the current time to find the next digit to decrease
    let indexFound;
    for (var i = currentTime.length - 1; i >= 1; i--) {
      if (currentTime[i] > 0) {
        indexFound = i;
        currentTime[i]--;
        break;
      }
    }
    // now loop forward through the array, from the position you stopped at,
    // and fill all the zeros appropriately
    for (var i = indexFound + 1; i < currentTime.length; i++) {
      switch (i) {
        case 0:
          currentTime[i]--;
          break;
        case 1:
          currentTime[i] = 9;
          break;
        case 2:
          currentTime[i] = 9;
          break;
        case 3:
          currentTime[i] = 5;
          break;
        case 4:
          currentTime[i] = 9;
          break;
        case 5:
          currentTime[i] = 5;
          break;

        case 6:
          currentTime[i] = 9;
          break;
      }
    }
  }
}

function renderTime() {
  currentTime = convertEmptyToZeros(currentTime);
  // console.log(`rendering...: ${currentTime}`);
  hourxDisplay.innerHTML = currentTime[0];
  hour1Display.innerHTML = currentTime[1];
  hour2Display.innerHTML = currentTime[2];
  minute1Display.innerHTML = currentTime[3];
  minute2Display.innerHTML = currentTime[4];
  second1Display.innerHTML = currentTime[5];
  second2Display.innerHTML = currentTime[6];
  // console.log(`hourxDisplay: ${hourxDisplay.innerHTML}`);
  // console.log(typeof currentTime[0]);
  // console.log(`_hourx: ${_hourx}`);
  // console.log(typeof _hourx);
  if (hourxDisplay.innerHTML > 0) {
    // console.log(`Removed hidden class`);
    hourxDisplay.classList.remove("hidden");
  } else {
    hourxDisplay.classList.add("hidden");
    // console.log(`add hidden class`);
  }
  console.log(`Post-render: ${currentTime}`);
}

function checkForEmptyTime(timeArray) {
  var empty = true;
  for (var i = 0; i < timeArray.length - 1; i++) {
    console.log(`timeArray: ${timeArray}`);
    console.log(`timeArray[i]: ${timeArray[i]}`);
    if (timeArray[i] === 0) {
      empty = false;
    }
    // var empty = timeArray.every((el) => {
    //   return el === "0";
    // });
    // var empty = currentTime.every(function (val) {
    //   val === 0;
    //   console.log(`val: ${val}`);
    //   return val;
    // });
    // return empty;
  }
  console.log(empty);
  return empty;
}

function checkForRestEmpty(index) {
  var isEmpty = true;
  for (var i = index; i >= 0; i--) {
    if (currentTime[i] != "") {
      isEmpty = false;
    }
    return isEmpty;
  }
}

function shiftCellsLeft() {
  currentTime[0] = currentTime[1];
  currentTime[1] = currentTime[2];
  currentTime[2] = currentTime[3];
  currentTime[3] = currentTime[4];
  currentTime[4] = currentTime[5];
  currentTime[5] = currentTime[6];
}

function shiftCellsRight() {
  currentTime[6] = currentTime[5];
  currentTime[5] = currentTime[4];
  currentTime[4] = currentTime[3];
  currentTime[3] = currentTime[2];
  currentTime[2] = currentTime[1];
  currentTime[1] = currentTime[0];
}

function convertEmptyToZeros(timeArray) {
  var copy = [...timeArray];
  for (var i = 0; i < copy.length; i++) {
    if (copy[i] === "") {
      copy[i] = 0;
    }
  }
  return copy;
}

function addTimeUpwards(timeArray) {
  var _copyArray = [...timeArray];
  let secondsAdded = _copyArray[5].toString() + _copyArray[6].toString();
  let minutesAdded = _copyArray[3].toString() + _copyArray[4].toString();
  let hoursAdded =
    _copyArray[0] + _copyArray[1].toString() + _copyArray[2].toString();
  secondsAdded = parseInt(secondsAdded, 10);
  minutesAdded = parseInt(minutesAdded, 10);
  hoursAdded = parseInt(hoursAdded, 10);

  if (secondsAdded - 60 >= 0) {
    secondsAdded -= 60;
    minutesAdded += 1;
  }

  if (minutesAdded - 60 >= 0) {
    minutesAdded -= 60;
    hoursAdded++;
  }

  secondsAdded += "";
  minutesAdded += "";
  hoursAdded += "";

  secondsAdded = secondsAdded.split("");
  while (secondsAdded.length < 2) {
    secondsAdded.unshift(0);
  }

  minutesAdded = minutesAdded.split("");
  while (minutesAdded.length < 2) {
    minutesAdded.unshift(0);
  }

  hoursAdded = hoursAdded.split("");
  _copyArray = [...hoursAdded, ...minutesAdded, ...secondsAdded];
  while (_copyArray.length !== 7) {
    _copyArray.unshift(0);
  }
  return _copyArray;
}

// Timer Done!
function timeEnd() {
  console.log("Times UP!!!!");
  // set confetti parameters
  confetti.maxCount = 150; //set max confetti count
  confetti.speed = 10; //set the particle animation speed
  confetti.frameInterval = 20; //the confetti animation frame interval in milliseconds
  confetti.alpha = 1; //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
  confetti.gradient = false; //whether to use gradients for the confetti particles

  confetti.start(2000);

  var audio = new Audio("birthdaySound.mp3");
  audio.play();
}
