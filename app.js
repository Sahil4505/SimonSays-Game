let gameStarted = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let red = document.querySelector("#red");
let green = document.querySelector("#green");
let orange = document.querySelector("#orange");
let blue = document.querySelector("#blue");

start();

function start() {
  document.addEventListener("keypress", function () {
    if (!gameStarted) {
      console.log("Game Started");
      gameStarted = true;
      levelUp();
    }
  });
}

function randomGenerator() {
  // generate random number from 1 to 4
  let num = Math.floor(Math.random() * 4) + 1;
  return num;
}

function gamePlay() {
  let num = randomGenerator();
  gameSeq.push(num);
  console.log(num);
  if (num == 1) {
    btnFlash(red);
  } else if (num == 2) {
    btnFlash(green);
  } else if (num == 3) {
    btnFlash(orange);
  } else {
    btnFlash(blue);
  }
}

function handleUserClick(colorNum, colorBtn) {
  return function () {
    userSeq.push(colorNum);
    btnFlash(colorBtn);
    if (!checkUserInput()) {
      gameOver();
    } else if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  };
}

function humanPlay() {
  userSeq = [];
}

red.addEventListener("click", handleUserClick(1, red));
green.addEventListener("click", handleUserClick(2, green));
orange.addEventListener("click", handleUserClick(3, orange));
blue.addEventListener("click", handleUserClick(4, blue));

function levelUp() {
  level++;
  let h3 = document.querySelector("h3");
  h3.innerText = `Level ${level}`;
  gamePlay();
  humanPlay();
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}

function checkUserInput() {
  for (let i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== gameSeq[i]) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  let h3 = document.querySelector("h3");
  h3.innerText = `Game is over!! Your Score is ${level}`;
  gameStarted = false;
  setTimeout(function () {
    h3.innerText = "Press Any key To start";
  }, 3000);
 
  userSeq = [];
  gameSeq = [];
  level = 0;
}
