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

var checkWinner = function(player){
  for (var i = 0; i < board.length; i++) {
    if ((board[i][0] === player && board[i][1] === player && board[i][2] === player)) {
      console.log("winner");
      return true;
    }
    if ((board[0][i] === player && board[1][i] === player && board[2][i] === player)) {
      console.log("winner");
      return true;
    }
  }
  if ((board[0][0] === player && board[1][1] === player && board[2][2] === player)) {
    console.log("winner");
    return true;
  }
  if ((board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
    console.log("winner");
    return true;
  }
  return false;
}

// var onePlayer = function(event){
//   var position = event.target.textContent.split("");
//   var row = Number(position[0]) - 1;
//   var col = Number(position[1]) - 1;
//   board[row][col] = "X";
//   event.target.textContent = board[row][col];
//   event.target.style.color = "black";
//   computerPlayer()
// }
//
// var computerPlayer = function(){
//   var randomRow = Math.floor(Math.random() * board.length);
//   var randomCol = Math.floor(Math.random() * board.length);
//   if (board[randomRow][randomCol] === " ") {
//     board[randomRow][randomCol] = "O";
//     event.target.textContent = board[randomRow][randomCol];
//     event.target.style.color = "black";
//   } else {
//     computerPlayer();
//   }
// }


//=============================================================================
// PRESENTATION FUNCTIONS
//=============================================================================

var gameBoard = document.querySelector(".board");
var cloneBoard = gameBoard.innerHTML;
var xScore = document.querySelector(".x-wins span");
var oScore = document.querySelector(".o-wins span");
var tieScore = document.querySelector(".ties span");
var winnerDisplay = document.querySelector(".winner-display p")

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

var clearBoard = function(){
  turn = 0;
  board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  gameBoard.innerHTML = cloneBoard;
  setTimeout(function(){
    winnerDisplay.textContent = "";
  }, 2000);
  var gameBoardSquares = document.querySelectorAll(".board a")
  gameBoardSquares.forEach(function(square){
    square.addEventListener("click", twoPlayers);
  });
}


clearBoard();
