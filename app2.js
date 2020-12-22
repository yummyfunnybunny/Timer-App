// ==============================
// ELEMENT SELECTORS
// ==============================
const playBtn = document.querySelector(".btn-play");
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

// ==============================
// EVENT LISTENERS
// ==============================
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

// ==============================
// FUNCTIONS
// ==============================
let timer = ["", "", "", "", "", ""];

function runTimer() {
  setInterval(function () {
    console.log(`1 second has gone by...`);
  }, 1000);
}
