// ================================================== //
//                  DOM ELEMENT SELECTORS             //
// ================================================== //

// this is attached to all squares of class "card"
const gameCard = document.querySelectorAll(".card");

// this is attached to the game board.
const gameGrid = document.querySelector(".game__grid");

// the two below are attached to manipulate the text
// that serves as feedback/direction to the user
const gameOver = document.querySelector(".game-over");
const startOver = document.querySelector(".start-over");

// this is for the light/dark theme, unrelated
// to game logic
const checkBox = document.getElementById("checkbox");

// adding event listener to toggle light/dark themes
checkBox.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});

// ================================================== //
//                  GAME LOGIC VARIABLES              //
// ================================================== //

// We need a boolean to check if it's the next player's turn
let nextPlayer = true;

// We need a boolean to check if anyone has won yet.
let someoneHasWon = false;

// We will count the number of turns because at the end,
// the game is over.
let turn = 0;

// We need a variable to store the id of the currently
// clicked square
let squareClicked;

// Below, each player's clicks are stored in arrays.
// We initialize empty arrays below at the start of the game.
let playerOneClicks = [];
let playerTwoClicks = [];

// Win conditions: any 3-in-a-row combo that is a win.
// See diagram in google doc for which square is which number.
// These correspond to your id's in the HTML,
// so make sure these match.
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

// attached to the button below to start the game over
startOver.addEventListener("click", () => {
  location.reload();
});

// ================================================== //
//               ----------- CODE ---------           //
// ================================================== //

// adding event listeners to game grid squares
// this basically will start the game once any of these
// squares are clicked.
for (let i = 0; i < gameCard.length; i++) {
  // (e), or (event), in this case, a 'click',
  // will keep track of data related to it
  gameCard[i].addEventListener("click", function (e) {
    // assigning the id of the square you clicked
    // to the squareClicked variable.
    squareClicked = e.target.id;
    // once the game starts (once a player clicks on a square)
    // the 'game over' button will not be visible.
    gameOver.style.color = "transparent";
    // the game grid will be temporarily disabled
    // until user has received feedback that they have
    // clicked. this prevents endless clicking
    // we do this by adding this class.
    // in css, go see that this is defined as
    // pointer-events: none so that it is no longer
    // going to respond to the click event.
    gameGrid.classList.add("game__grid-disabled");

    // once a card has been clicked, you can't click
    // it again. in css, go see that this is defined as
    // pointer-events: none so that it is no longer
    // going to respond to the click event.
    gameCard[i].classList.add("card-disabled");

    // part of user feedback is knowing they clicked on something.
    // once you click, you see a flash of color to indicate
    // it has been pressed. a class is added to reflect
    // color change.
    gameCard[i].classList.add("card-clicked");

    // we can't keep the color there forever,
    // so the following makes sure we remove the class
    // in 50 milliseconds and this completes the click animation.
    setTimeout(() => {
      gameCard[i].classList.remove("card-clicked");
    }, "50");

    // once the card has been clicked,
    // the following occurs:
    continuePlay();
  });
}

// gameplay continues here
function continuePlay() {
  // these are just arbitrary variables
  // for dynamic JavaScript DOM manipulation
  // feel free to call them whatever you see fit
  let x, y;
  // default is that nobody has won yet.
  // we proceed.
  if (someoneHasWon === false) {
    // we start counting turns.
    // we increment by one each time
    turn++;

    // nextPlayer's default is true to begin
    // the game
    if (nextPlayer === true) {
      // we add the id value in the squareClicked variable
      // to player one's click array.
      playerOneClicks.push(squareClicked);
      // player one's click gets an "X" on the square
      x = document.querySelector(`#${squareClicked}`).textContent = "X";
      // now that an "X" is visible to the user as feedback
      // of their click, pointer events on the grid
      // are active again. We do this by removing the class
      // we added before.
      gameGrid.classList.remove("game__grid-disabled");
      // setting nextPlayer to false means it's
      // player two's turn.
      nextPlayer = false;
      // win conditions have not been met so
      // someoneHasWon is still false to keep game going.
      someoneHasWon = false;
      // we need to check player one's win condition.
      checkPlayerOne();
    } else {
      // we add the id value in the squareClicked variable
      // to player two's click array.
      playerTwoClicks.push(squareClicked);
      // player one's click gets an "O" on the square
      y = document.querySelector(`#${squareClicked}`);
      y.textContent = "O";
      y.style.color = "red";
      // now that an "O" is visible to the user as feedback
      // of their click, pointer events on the grid
      // are active again. We do this by removing the class
      // we added before.
      gameGrid.classList.remove("game__grid-disabled");
      // setting nextPlayer to true means it's
      // player one's turn.
      nextPlayer = true;
      // someoneHasWon is still false to keep game going.
      someoneHasWon = false;
      // we need to check player two's win condition.
      checkPlayerTwo();
    }
  }
}

// checking for win conditions for player 1
function checkPlayerOne() {
  // after 9 turns, the game is over as all 9 squares
  // have been clicked. therefore, "if" the turn count
  // has not reached 9, we will check for win conditions
  if (turn < 9) {
    // for each item of the 'win' conditions array...
    for (let i = 0; i < winConditions.length; i++) {
      // we initialize a check variable that will return
      // true if all ids in player one's array matches
      // one of the win conditions or not.
      // for example, if player one's click array is
      // [one, four], this will return false because
      // after checking 2 values, there isn't a 3rd and
      // you need a third value to make it a win
      let check = winConditions[i].every((value) => {
        return playerOneClicks.includes(value);
      });
      // if this check is true, player one wins, the game
      // grid is disabled, and the game is over.
      if (check) {
        gameGrid.classList.add("game__grid-disabled");
        endGame();
      }
    }
    // otherwise, nobody wins, we will disable grid,
    // and the game is over
  } else {
    gameGrid.classList.add("game__grid-disabled");
    endGame();
  }
}

// checking for win conditions for player 2
function checkPlayerTwo() {
  // player one's check up there checks for turn amount under 9.
  // here we just need to check that the game has started
  // if have turn < 9 here, we risk some weird behavior
  // saying the game is over when it isn't.
  // check google doc for bug that happens**
  if (turn > 0) {
    for (let i = 0; i < winConditions.length; i++) {
      // we initialize a check variable that will return
      // true if all ids in player two's array is a win
      // and false if it isn't
      let check = winConditions[i].every((value) => {
        return playerTwoClicks.includes(value);
      });
      // if this check is true, player two wins, the game
      // grid is disabled, and the game is over.
      if (check) {
        gameGrid.classList.add("game__grid-disabled");
        endGame();
      }
    }
    // otherwise, nobody wins, we will disable grid,
    // and the game is over
  } else {
    gameGrid.classList.add("game__grid-disabled");
    endGame();
  }
}

// end screen
function endGame() {
  gameOver.textContent = "GAME OVER!";
  gameOver.style.display = "flex";
  gameOver.style.fontSize = "2em";
  gameOver.style.color = "red";
}
