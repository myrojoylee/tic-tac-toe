const gameCard = document.querySelectorAll(".card");
const gameGrid = document.querySelector(".game__grid");
const gameOver = document.querySelector(".game-over");

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

for (let i = 0; i < gameCard.length; i++) {
  gameCard[i].addEventListener("click", function (e) {
    squareClicked = e.target.id;
    console.log("hey");
    gameGrid.classList.add("game__grid-disabled");
    gameCard[i].classList.add("card-disabled");
    gameCard[i].classList.add("card-clicked");
    setTimeout(() => {
      gameCard[i].classList.remove("card-clicked");
    }, "100");
    continuePlay();
  });
}

function continuePlay() {
  if (someoneHasWon === false) {
    if (nextPlayer === true) {
      // console.log(squareClicked);
      playerOneClicks.push(squareClicked);
      let x = (document.querySelector(`#${squareClicked}`).textContent = "X");
      gameGrid.classList.remove("game__grid-disabled");
      nextPlayer = false;
      someoneHasWon = false;
    } else {
      // playerTwoTurn++;
      // console.log(squareClicked);
      playerTwoClicks.push(squareClicked);
      let y = (document.querySelector(`#${squareClicked}`).textContent = "O");
      gameGrid.classList.remove("game__grid-disabled");
      nextPlayer = true;
      someoneHasWon = false;
    }
    turn++;
    checkWin();
  }
}

function checkWin() {
  let x = [];
  let y = [];
  let tempCountOne = 0;
  let tempCountTwo = 0;
  if (turn >= 5) {
    for (let i = 0; i < playerOneClicks.length; i++) {
      for (let j = 0; j < winConditions.length; j++) {
        for (let k = 0; k < winConditions[j].length; k++) {
          if (
            playerOneClicks.includes(winConditions[j][k]) &&
            x.includes(winConditions[j][k]) === false
          ) {
            x.push("true");
            // x.push(winConditions[j][k]);
            tempCountOne++;
            console.log(tempCountOne);
            console.log(x);
            if (tempCountOne === 3) {
              if (x.length === 3) {
                someoneHasWon === true;
                gameGrid.classList.add("game__grid-disabled");
                endGame();
              }
            }
          } else {
            x = [];
            tempCountOne = 0;
          }
        }
      }

      // if (
      //   playerTwoClicks.includes(winConditions[i][j]) &&
      //   y.includes(winConditions[i][j]) === false
      // ) {
      //   y.push(winConditions[i][j]);
      //   console.log("player two wins!");
      // }
    }
  }
}

function endGame() {
  gameOver.style.color = "red";
}
