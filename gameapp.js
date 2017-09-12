console.log("Tic - Tac - Toe");

var board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
var win1 = ["X", "X", "X"];

var rowPlace = 0;
var colPlace = 0;
var i = 0;
var ties = 0;
var xWins = 0;
var oWins = 0;

var twoPlayers = function(event){
  i++;
  var position = event.target.textContent.split("");
  var row = Number(position[0]) - 1;
  var col = Number(position[1]) - 1;
  if (i % 2 ===1) {
    board[row][col] = "X";
    event.target.textContent = board[row][col];
  } else {
    board[row][col] = "O";
    event.target.textContent = board[row][col];
  }
  event.target.style.color = "black";
  checkWinner();
}

var checkWinner = function(){
  if (true) {

  }
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
var gameBoard = document.querySelector(".board");
var cloneBoard = gameBoard.innerHTML;
var resetButton = document.querySelector("button");

gameBoard.addEventListener("click", twoPlayers);
