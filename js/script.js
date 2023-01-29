const hideBtn = document.querySelector(".hide");
const startGameBtn = document.querySelector("#start-game");
const newGameBtn = document.querySelector(".new-game");
const rollDice = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");
const target = document.querySelector(".target");
const scorePlayer1 = document.querySelector(".scorePlayer1");
const scorePlayer2 = document.querySelector(".scorePlayer2");
const ul = document.querySelector(".box-player1");
let counterPlayer1 = document.querySelector(".counter1");
let counterPlayer2 = document.querySelector(".counter2");
const header1 = document.querySelector(".header1");
const header2 = document.querySelector(".header2");

const player1Background = document.querySelector(".player1");
const player2Background = document.querySelector(".player2");
const playerVin = document.createElement("b");
const playerLoose = document.createElement("b");
let textVin = (playerVin.textContent = "You vin!");

let text = (playerLoose.textContent = "Passed the target score");
playerLoose.style.fontSize = "20px";
playerVin.style.fontSize = "20px";
let backgroundSong = new Audio("/assets/audio/relaxed-vlog-131746.mp3");
backgroundSong.volume = 0.01;
let song = new Audio("/assets/audio/Mouse Click - Sound Effect (HD).mp3");
song.volume = 1;
let yourImages = [
  "assets/images/dice-1.png",
  "assets/images/dice-2.png",
  "assets/images/dice-3.png",
  "assets/images/dice-4.png",
  "assets/images/dice-5.png",
  "assets/images/dice-6.png",
];

const player1 = 1;
const player2 = 2;
let currentPlayer = 1;
let player1counter = 0;
let player2counter = 0;
let player1TurnCounter = 0;
let player2TurnCounter = 0;

startGameBtn.addEventListener("click", function (e) {
  console.log("startGameBtn click");
  backgroundSong.play();
  hideBtn.style.display = "none";
});

let getDiceImageValue = function (value) {
  return yourImages[value - 1];
};

let updateDiceImages = function (firstDiceImg, secondDiceImg) {
  document.querySelector(".img1").src = firstDiceImg;
  document.querySelector(".img2").src = secondDiceImg;
};

let onSuccess = function () {
  if (currentPlayer === player1) {
    // header1.appendChild(playerVin);
    player1Background.style.backgroundColor = "red";
    player2Background.style.backgroundColor = "white";
    rollDice.disabled = true;
  } else if (currentPlayer === player2) {
    // header2.appendChild(playerVin);
    player2Background.style.backgroundColor = "red";
    player1Background.style.backgroundColor = "white";
    rollDice.disabled = true;
  }
};

let onError = function () {
  if (currentPlayer === player1) {
    header1.appendChild(playerLoose);
    header2.appendChild(playerVin);
    header2.style.color = "rgb(225, 110, 190)";
    player1Background.style.backgroundColor = "rgb(225, 110, 190)";
    player2Background.style.backgroundColor = "black";

    rollDice.disabled = true;
  } else if (currentPlayer === player2) {
    header2.appendChild(playerLoose);
    header1.appendChild(playerVin);
    header1.style.color = "rgb(225, 110, 190)";
    player2Background.style.backgroundColor = "rgb(225, 110, 190)";
    player1Background.style.backgroundColor = "black";
    rollDice.disabled = true;
  }
};

rollDice.addEventListener("click", function () {
  song.play();
  let firstDiceValue = Math.floor(Math.random() * 6) + 1;
  let secondDiceValue = Math.floor(Math.random() * 1) + 6;
  // if (firstDiceValue === secondDiceValue && secondDiceValue === 6) {
  //   player1counter = 0;
  //   player1TurnCounter = 0;
  //   counterPlayer1.innerHTML = player1TurnCounter;
  // }
  updateDiceImages(
    getDiceImageValue(firstDiceValue),
    getDiceImageValue(secondDiceValue)
  );

  if (currentPlayer === player1) {
    player1counter = player1counter + firstDiceValue + secondDiceValue;
    player1TurnCounter = player1TurnCounter + firstDiceValue + secondDiceValue;
    counterPlayer1.innerHTML = player1TurnCounter;
  } else if (currentPlayer === player2) {
    player2counter = player2counter + firstDiceValue + secondDiceValue;
    player2TurnCounter = player2TurnCounter + firstDiceValue + secondDiceValue;
    counterPlayer2.innerHTML = player2TurnCounter;
  }
  console.log(target.value);
});

holdBtn.addEventListener("click", function () {
  if (currentPlayer === player1) {
    player2Background.style.backgroundColor = "  rgb(226, 36, 207";
    player1Background.style.backgroundColor = " rgb(225, 110, 190";

    player1TurnCounter = 0;
    scorePlayer1.innerHTML = player1counter;
    counterPlayer1.innerHTML = player1TurnCounter;
  } else if (currentPlayer === player2) {
    player1Background.style.backgroundColor = "  rgb(226, 36, 207";
    player2Background.style.backgroundColor = " rgb(225, 110, 190";
    scorePlayer2.innerHTML = player2counter;
    player2TurnCounter = 0;
    counterPlayer2.innerHTML = player2TurnCounter;
  }

  const targetValue = target.value;
  if (currentPlayer == player1) {
    if (player1counter === targetValue) {
      onSuccess();
      return;
    } else if (player1counter > targetValue) {
      onError();
      return;
    }
  } else if (currentPlayer == player2) {
    if (player2counter == targetValue) {
      onSuccess();
      return;
    } else if (player2counter > targetValue) {
      onError();
      return;
    }
  }

  currentPlayer = currentPlayer === player1 ? player2 : player1;
});

newGameBtn.addEventListener("click", function () {
  // new game will reset the value of the pwo players
  playerVin.remove();
  playerLoose.remove();
  header2.style.color = "black";
  header1.style.color = "black";
  rollDice.disabled = false;
  player1TurnCounter = 0;
  player2TurnCounter = 0;
  scorePlayer1.value = 0;
  scorePlayer2.value = 0;
  player1counter = 0;
  player2counter = 0;
  currentPlayer = 1;
  player2Background.style.backgroundColor = " rgb(226, 36, 207)";
  player1Background.style.backgroundColor = " rgb(225, 110, 190)";
  scorePlayer1.innerHTML = 0;
  counterPlayer1.innerHTML = 0;
  scorePlayer2.innerHTML = 0;
  counterPlayer2.innerHTML = 0;
});
