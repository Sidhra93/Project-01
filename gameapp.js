console.log("Tic - Tac - Toe");

var board = [["", "", ""], ["", "", ""], ["", "", ""]];

var rowPlace = 0;
var colPlace = 0;
var turn = 0;
var ties = 0;
var xWins = 0;
var oWins = 0;

var twoPlayers = function(event){
  turn++;
  var row = event.target.parentElement.dataset.positionX;
  var col = event.target.parentElement.dataset.positionY;
  var player = "O";
  if (turn % 2 === 1) {
    player = "X";
  }
  board[row][col] = player;
  event.target.parentElement.innerHTML = "<span>" + player + "</span>";
  var result = checkWinner(player);
  if (result === true) {
    winner(player);
  }else if (result === false && turn === 9) {
    tie();
  }
}

// var onePlayer = function(event){
//   var row = event.target.parentElement.dataset.positionX;
//   var col = event.target.parentElement.dataset.positionY;
//   var player = "X"
//   board[row][col] = player;
//   event.target.parentElement.innerHTML = "<span>" + player + "</span>";
//   computerPlayer();
//   checkWinner(player);
// }
//
// var computerPlayer = function(){
//   var randomRow = Math.floor(Math.random() * board.length);
//   var randomCol = Math.floor(Math.random() * board.length);
//   var player = "O"
//   if (board[randomRow][randomCol] === "") {
//     board[randomRow][randomCol] = player;
//     event.target.parentElement.innerHTML = "<span>" + player + "</span>";
//   } else {
//     computerPlayer();
//   }
//   checkWinner(player);
// }

var checkWinner = function(player){
  for (var i = 0; i < board.length; i++) {
    if ((board[i][0] === player && board[i][1] === player && board[i][2] === player)) {
      return true;
    }
    if ((board[0][i] === player && board[1][i] === player && board[2][i] === player)) {
      return true;
    }
  }
  if ((board[0][0] === player && board[1][1] === player && board[2][2] === player)) {
    return true;
  }
  if ((board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
    return true;
  }
  return false;
}

//==================================
// PRESENTATION FUNCTIONS
//==================================

var title = document.querySelector(".title");
var playButton = document.querySelector(".title button");
var restart = document.querySelector(".nav .restart-button")
var scoreDiv = document.querySelector(".scores");
var xScore = document.querySelector(".x-wins span");
var oScore = document.querySelector(".o-wins span");
var tieScore = document.querySelector(".ties span");
var gameBoard = document.querySelector(".board");
var cloneBoard = gameBoard.innerHTML;
var winnerDisplay = document.querySelector(".winner-display p");


var winner = function(player){
  if (player === "X") {
    xWins++;
    xScore.textContent = xWins;
    winnerDisplay.textContent = "X Wins!";
    setTimeout(clearBoard, 1000);
    return;
  }
  oWins++;
  oScore.textContent = oWins;
  winnerDisplay.textContent = "O Wins!";
  setTimeout(clearBoard, 1000);
}

var tie = function(){
  ties++;
  tieScore.textContent = ties;
  winnerDisplay.textContent = "It's a Tie!";
  setTimeout(clearBoard, 1000);
}

var startGame = function(){
  scoreDiv.style = "display:block";
  gameBoard.style = "display:block";
  title.style = "display:none";
  clearBoard();
}

var restartGame = function(){
  xWins = 0;
  oWins = 0;
  ties = 0;
  xScore.textContent = xWins;
  oScore.textContent = oWins;
  tieScore.textContent = ties;
  clearBoard();
}

var clearBoard = function(){
  turn = 0;
  board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  gameBoard.innerHTML = cloneBoard;
  setTimeout(function(){
    winnerDisplay.textContent = "";
  }, 1200);
  var gameBoardSquares = document.querySelectorAll(".board a")
  gameBoardSquares.forEach(function(square){
    square.addEventListener("click", twoPlayers);
  });
}

playButton.addEventListener("click", startGame);

restart.addEventListener("click", restartGame);
