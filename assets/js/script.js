const gameCard = document.querySelectorAll(".card");
const gameGrid = document.querySelector(".game__grid");
const gameOver = document.querySelector(".game-over");
const startOver = document.querySelector(".start-over");

let nextPlayer = true;
let someoneHasWon = false;
let turn = 0;
let squareClicked;
let playerOneClicks = [];
let playerTwoClicks = [];
const winConditions = [
  ["one", "two", "three"],
  ["one", "four", "seven"],
  ["one", "five", "nine"],
  ["four", "five", "six"],
  ["seven", "eight", "nine"],
  ["three", "six", "nine"],
  ["three", "five", "seven"],
  ["two", "five", "eight"],
];

startOver.addEventListener("click", () => {
  location.reload();
});

for (let i = 0; i < gameCard.length; i++) {
  gameCard[i].addEventListener("click", function (e) {
    squareClicked = e.target.id;
    gameOver.style.color = "transparent";
    gameGrid.classList.add("game__grid-disabled");
    gameCard[i].classList.add("card-disabled");
    gameCard[i].classList.add("card-clicked");
    setTimeout(() => {
      gameCard[i].classList.remove("card-clicked");
    }, "50");
    continuePlay();
  });
}

function continuePlay() {
  let x, y;
  if (someoneHasWon === false) {
    turn++;
    if (nextPlayer === true) {
      playerOneClicks.push(squareClicked);
      x = document.querySelector(`#${squareClicked}`).textContent = "X";
      gameGrid.classList.remove("game__grid-disabled");
      nextPlayer = false;
      someoneHasWon = false;
      checkPlayerOne();
    } else {
      playerTwoClicks.push(squareClicked);
      y = document.querySelector(`#${squareClicked}`);
      y.textContent = "O";
      y.style.color = "red";
      gameGrid.classList.remove("game__grid-disabled");
      nextPlayer = true;
      someoneHasWon = false;
      checkPlayerTwo();
    }
  }
}

function checkPlayerOne() {
  if (turn < 9) {
    for (let i = 0; i < winConditions.length; i++) {
      let check = winConditions[i].every((value) => {
        return playerOneClicks.includes(value);
      });
      if (check) {
        gameGrid.classList.add("game__grid-disabled");
        endGame();
      }
    }
  } else {
    gameGrid.classList.add("game__grid-disabled");
    endGame();
  }
}

function checkPlayerTwo() {
  if (turn > 0) {
    for (let i = 0; i < winConditions.length; i++) {
      let check = winConditions[i].every((value) => {
        return playerTwoClicks.includes(value);
      });
      if (check) {
        gameGrid.classList.add("game__grid-disabled");
        endGame();
      }
    }
  } else {
    gameGrid.classList.add("game__grid-disabled");
    endGame();
  }
}

function endGame() {
  gameOver.textContent = "GAME OVER!";
  gameOver.style.display = "flex";

  gameOver.style.fontSize = "2em";
  gameOver.style.color = "red";
}
