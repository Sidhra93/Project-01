console.log("Tic - Tac - Toe");

var board = [["", "", ""], ["", "", ""], ["", "", ""]];

var turn = 0;
var ties = 0;
var xWins = 0;
var oWins = 0;
var game = 0;
var playerX = "X";
var playerO = "O";
var timerId = null;

var twoPlayers = function(event){
  turn++;
  var row = event.target.parentElement.dataset.positionX;
  var col = event.target.parentElement.dataset.positionY;
  if (game % 2 === 0) {
    var player = playerO;
    if (turn % 2 === 1) {
      player = playerX;
    }
    board[row][col] = player;
    event.target.parentElement.innerHTML = "<span>" + player + "</span>";
  } else {
    var player = playerX;
    if (turn % 2 === 1) {
      player = playerO;
    }
    board[row][col] = player;
    event.target.parentElement.innerHTML = "<span>" + player + "</span>";
  }
  var result = checkWinner(player);
  if (result === true) {
    winner(player);
  }else if (result === false && turn === 9) {
    tie();
  }
}

var onePlayer = function(event){
  var row = event.target.parentElement.dataset.positionX;
  var col = event.target.parentElement.dataset.positionY;
  var player = playerX;
  board[row][col] = player;
  event.target.parentElement.innerHTML = "<span>" + player + "</span>";
  turn++;
  var result = checkWinner(player);
  if (result === true) {
    winner(player);
  }else if (result === false && turn === 9) {
    tie();
  }else {
    timerId = setTimeout(computerPlayer, 500);
  }
}

var computerPlayer = function(){
  var randomRow = Math.floor(Math.random() * board.length);
  var randomCol = Math.floor(Math.random() * board.length);
  var squarePosition = document.querySelectorAll(".board .square");
  var player = playerO;
  if (board[randomRow][randomCol] === "") {
    board[randomRow][randomCol] = player;
    squarePosition.forEach(function(square){
      if (square.dataset.positionX == String(randomRow) && square.dataset.positionY == String(randomCol)) {
        square.innerHTML = "<span>" + player + "</span>";
        turn++;
      }
    });
    return;
  }else {
    computerPlayer();
  }
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
var onePlayerButton = document.querySelector(".title .one-player");
var twoPlayerButton = document.querySelector(".title .two-players");
var restart = document.querySelector(".nav .restart-button");
var instructionsButton = document.querySelector(".nav .instructions-button");
var instructions = document.querySelector(".instructions");
var scoreDiv = document.querySelector(".scores");
var xScore = document.querySelector(".x-wins span");
var oScore = document.querySelector(".o-wins span");
var tieScore = document.querySelector(".ties span");
var gameBoard = document.querySelector(".board");
var cloneBoard = gameBoard.innerHTML;
var isOnePlayer = false;


var winner = function(player){
  if (player === "X") {
    xWins++;
    game++;
    xScore.textContent = xWins;
    displayResult("X Wins!")
    return;
  }
  oWins++;
  game++;
  oScore.textContent = oWins;
  displayResult("O Wins!")
}

var tie = function(){
  ties++;
  game++;
  tieScore.textContent = ties;
  displayResult("It's a Tie!")
}

var displayResult = function(result){
  var winnerDisplay = document.querySelector(".winner-display p");
  winnerDisplay.textContent = result;
  gameBoard.classList.add("result");
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
  game = 0;
  xScore.textContent = xWins;
  oScore.textContent = oWins;
  tieScore.textContent = ties;
  scoreDiv.style = "display:none";
  gameBoard.style = "display:none";
  title.style = "display:block";
  //clearBoard();
}

var clearBoard = function(){
  turn = 0;
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  gameBoard.classList.remove("result");
  gameBoard.innerHTML = cloneBoard;
  clearTimeout(timerId);
  timerId = null;
  var gameBoardSquares = document.querySelectorAll(".board a")
  gameBoardSquares.forEach(function(square){
    if (isOnePlayer) {
      square.addEventListener("click", onePlayer);
    } else {
      square.addEventListener("click", twoPlayers);
    }
  });
  var playAgain = document.querySelector(".winner-display button");
  playAgain.addEventListener("click", clearBoard);
}

onePlayerButton.addEventListener("click", function(){
  isOnePlayer = true;
  startGame();
});
twoPlayerButton.addEventListener("click", function(){
  isOnePlayer = false;
  startGame();
});
restart.addEventListener("click", restartGame);
instructionsButton.addEventListener("click", function(){
  instructions.classList.toggle("show");
})
