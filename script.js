let mark = "X"
let gameBoard = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
const dialog = document.querySelector("dialog");
const showWinner = document.querySelector(".show-winner");
const reBtn = document.querySelector(".restart");


function createBoard(rows, cols) {
  const gameBoard = document.querySelector(".game-board")
  const boardContainer = document.createElement("div");
  boardContainer.className = "board-container";
 
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "row";
   
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.setAttribute("data-index", `${i}${j}`);
      row.appendChild(cell);
    }

    boardContainer.appendChild(row);
  }

  gameBoard.appendChild(boardContainer);
}

function gameStart() {
  const startBtn = document.querySelector(".game-start");
  startBtn.addEventListener("click", () => {
  createBoard(3, 3);
  startBtn.setAttribute("class", "dissapear");
  gamePlay();
});
}  

function gamePlay() {
  const cells = document.querySelectorAll(".cell")
  const cellArray = Array.prototype.slice.call(cells);

  cellArray.forEach((item) => {
    item.addEventListener("click", () => {
      if(mark === "X"){
        item.textContent = "X"
        item.classList.add("red");
        item.disabled = true;
        mark = "O";
      }else if (mark === "O"){
        item.textContent = "O"
        item.classList.add("blue");
        item.disabled = true;
        mark = "X";
      }
      const index = item.getAttribute("data-index")
      gameBoard[index.charAt(0)][index.charAt(1)] = mark;
      
      getWinner();
    });
  });
}

function getWinner() {
  const condition = (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2])
  || (gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2])
  || (gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2])

  || (gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0])
  || (gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1])
  || (gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2])

  || (gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0])
  || (gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2])

  if (condition){
    if(mark === "O") {
      dialog.showModal();
      showWinner.textContent = "player1"
    }else if(mark === "X"){
      dialog.showModal();
      showWinner.textContent = "player2"
    }
  }
  const result = gameBoard.every((row, i) => {
    return row.every((cell, j) => {
      return cell !== `${i}${j}`;
    });
  });

  if (result && !condition) {
    dialog.showModal();
    showWinner.textContent = "Draw!"
  }
}

reBtn.addEventListener("click", () => {
  gameBoard = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
  const cells = document.querySelectorAll(".cell")
  const cellArray = Array.prototype.slice.call(cells);
  cellArray.forEach((item) => {
    item.textContent ="";
    item.classList.remove("red");
    item.classList.remove("blue");
    item.disabled = false;
  });
  dialog.close();
});

gameStart();