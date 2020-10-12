// ==============================
// ELEMENT SELECTORS
// ==============================
const playBtn = document.querySelector('.btn-play');
const deleteBtn = document.querySelector('.btn-delete');
const abateBtn = document.querySelector('.btn-abate');
const btn0 = document.querySelector('.btn-0');
const btn1 = document.querySelector('.btn-1');
const btn2 = document.querySelector('.btn-2');
const btn3 = document.querySelector('.btn-3');
const btn4 = document.querySelector('.btn-4');
const btn5 = document.querySelector('.btn-5');
const btn6 = document.querySelector('.btn-6');
const btn7 = document.querySelector('.btn-7');
const btn8 = document.querySelector('.btn-8');
const btn9 = document.querySelector('.btn-9');
// const day1Display = document.querySelector('#days1');
const hourxDisplay = document.querySelector('#hoursx');
const hour1Display = document.querySelector('#hours1');
const hour2Display = document.querySelector('#hours2');
const minute1Display = document.querySelector('#minutes1');
const minute2Display = document.querySelector('#minutes2');
const second1Display = document.querySelector('#seconds1');
const second2Display = document.querySelector('#seconds2');

// ==============================
// EVENT LISTENERS
// ==============================
playBtn.addEventListener('click', togglePlayStop);
deleteBtn.addEventListener('click', deleteTimer);
abateBtn.addEventListener('click', abateTimer);
btn0.addEventListener('click', appendTimer);
btn1.addEventListener('click', appendTimer);
btn2.addEventListener('click', appendTimer);
btn3.addEventListener('click', appendTimer);
btn4.addEventListener('click', appendTimer);
btn5.addEventListener('click', appendTimer);
btn6.addEventListener('click', appendTimer);
btn7.addEventListener('click', appendTimer);
btn8.addEventListener('click', appendTimer);
btn9.addEventListener('click', appendTimer);

// ==============================
// FUNCTIONS
// ==============================

let currentTime = ["","","","","",""];
let timerRunning = false;

function appendTimer() {
  if (checkForEmptyTime()){
    if (this.innerHTML != 0) {
      currentTime[5] = this.innerHTML;
    } 
  // array is not empty
  } else {
    //check if array is full
    if (currentTime.lastIndexOf("") !== -1) {
      // shift cells to the left
      shiftCellsLeft();
      // append new input to the last cell
      currentTime[5] = this.innerHTML;
    }
  }
  // console.log(`currentTime: ${currentTime}`);
  renderTime();
}
  

function togglePlayStop() {
  if (!checkForEmptyTime()) {
    var icon = playBtn.childNodes[0];
    icon.classList.toggle("fa-pause");
    icon.classList.toggle("fa-play");
    if (timerRunning === true) {
      timerRunning = false;
    } else {
      timerRunning = true;
      runTimer();
    }
  }
  console.log(timerRunning);
}

function abateTimer() {
  if (!checkForEmptyTime()) {
    console.log('yo');
    shiftCellsRight();
    currentTime[0] = '';
    renderTime();
    console.log(`currentTime: ${currentTime}`);
  }
}

function deleteTimer() {
  currentTime = ["","","","","",""];
  renderTime();
}

function convertEnteredTime() {
  // code
}

function runTimer() {
  if (timerRunning === true) {
      setInterval(function() {
        console.log(currentTime);
        seconds1();
      renderTime();
    }, 1000);
  }
}
// [00:02:00]
function seconds1() {
  console.log('seconds1');
  if (currentTime[5] > 0) {
    currentTime[5]--;
  } else if (currentTime[5] === 0) {
    seconds2();
  }
}

function seconds2() {
  console.log('seconds2');
  if (currentTime[4] > 0) {
    console.log('yo');
    currentTime[4]--;
  } else if (currentTime[4] === 0) {
    console.log('y2');
    currentTime[5] = 9;
    minutes1();
  }
}

function minutes1() {
  if (currentTime[3] > 0) {
    currentTime[3]--;
  } else if (currentTime[3] === 0) {
    currentTime[4] = 5;
    minutes2();
  }
}

function minutes2() {
  if (currentTime[2] > 0) {
    currentTime[2]--;
  } else if (currentTime[2] === 0) {
    currentTime[3] = 9;
    hours1();
  }
}

function hours1() {
  if (currentTime[1] > 0) {
    currentTime[1]--;
  }else if (currentTime[1] === 0) {
    currentTime[2] = 5;
    hours2();
  }
}

function hours2() {
  if (currentTime[0] > 0) {
    currentTime[0]--;
  } else if (currentTime[0] === 0) {
    currentTime[1] = 9;
  }
}

// function decreaseSeconds() {

//   if (currentTime[5] > 0) {
//     currentTime[5]--;

//   }else {

//     if (currentTime[4] > 0) {

//       currentTime[5] = 9;
//     } else {
//       if (currentTime[3] > 0) {
//         currentTime[3]--;
//         currentTime[4] = 9;
//         currentTime[5] = 9;
//       }
//     }
//     if (currentTime[4] > 0) {
//       currentTime[4]--;
//     } else {
//       currentTime[4] = 5;
//       decreaseMinutes();
//     }
//   }
//   console.log(currentTime);
// }

function decreaseMinutes() {
  if (currentTime[3] > 0) {
    currentTime[3]--;
  }else {
    currentTime[3] = 9;
    if (currentTime[2] > 0) {
      currentTime[2]--;
    } else {
      currentTime[2] = 5;
      decreaseHours();
    }
  }
}

function decreaseHours() {
  if (currentTime[1] > 0) {
    currentTime[1]--;
  }else {
    currentTime[1] = 9;
    if (currentTime[0] > 0) {
      currentTime[0]--;
    } else {
      currentTime[0] = 9;
    }
  }
}


function renderTime() {
  var copy = convertEmptyToZeros();
  hour1Display.innerHTML = copy[0];
  hour2Display.innerHTML = copy[1];
  minute1Display.innerHTML = copy[2];
  minute2Display.innerHTML = copy[3];
  second1Display.innerHTML = copy[4];
  second2Display.innerHTML = copy[5];
}

function convertEmptyToZeros(val) {
  switch(val.length) {
    case 0:
      val = "00";
      break;
    case 1:
      val = "0" + val.toString();
      break;
  }
  return val;
}

function checkForEmptyTime() {
  var empty = currentTime.every(function(val) {
    return val === "";
  });
  return empty;
};

function checkForRestEmpty(index) {
  var isEmpty = true;
  for (var i = index; i >= 0; i-- ) {
    if (currentTime[i] != "") {
      isEmpty = false;
    }
    return isEmpty;
  };
};

function shiftCellsLeft() {
  currentTime[0] = currentTime[1];
  currentTime[1] = currentTime[2];
  currentTime[2] = currentTime[3];
  currentTime[3] = currentTime[4];
  currentTime[4] = currentTime[5];
}

function shiftCellsRight() {
  currentTime[5] = currentTime[4];
  currentTime[4] = currentTime[3];
  currentTime[3] = currentTime[2];
  currentTime[2] = currentTime[1];
  currentTime[1] = currentTime[0];
}

function convertEmptyToZeros() {
  var copy = [...currentTime];
  for (var i = 0; i < copy.length; i++) {
    if (copy[i] === "") {
      copy[i] = 0;
    }
  }
  return copy;
}