//-------- Setting up chess board coloring

// for colors

const backgroundLight =
  "url('http://www.zingerbugimages.com/backgrounds/green_marble_background_seamless.jpg')";
const backgroundDark =
  "url('http://www.zingerbugimages.com/backgrounds/green_sand_stone.jpg')";
const colorYellow = "yellow";

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 === 0) {
      const thisSquare = document.getElementById(`r${i}c${j}`);
      thisSquare.style.backgroundImage = backgroundLight;
    } else {
      const thisSquare = document.getElementById(`r${i}c${j}`);
      thisSquare.style.backgroundImage = backgroundDark;
    }
  }
}

//common function
function checkInBetween(axis, row1, col1, row2, col2, arr) {
  switch (axis) {
    case "row": {
      for (let i = Math.min(row1, row2) + 1; i < Math.max(row1, row2); i++) {
        if (findElement(i, col1, arr) !== undefined) {
          console.log("blocked");
          return false;
        }
      }
      return true;
    }
    case "column": {
      for (let i = Math.min(col1, col2) + 1; i < Math.max(col1, col2); i++) {
        if (
          arr.find(
            ({ position }) => position[0] === row1 && position[1] === i
          ) !== undefined
        ) {
          return false;
        }
      }
      return true;
    }
    case "diagonal": {
      let step = Math.abs(row1 - row2) - 1;
      if (step == 0) {
        return true;
      }
      while (step > 0) {
        if (row1 > row2 && col1 > col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 - step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 < col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 + step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 > row2 && col1 < col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 > col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 + step && position[1] === col1 - step
            ) !== undefined
          ) {
            return false;
          }
        }
        step--;
      }
      return true;
    }
  }
}

//---------- Classes

class Pawn {
  constructor(type, color, position, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isNew = isNew;
  }
  checkValidMove(row2, col2, arr) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (col1 !== col2) {
      return false;
    }
    if (this.color === "white") {
      if (
        this.isNew === true &&
        row1 + 2 === row2 &&
        checkInBetween("row", row1, col1, row2, col2, arr) === true
      ) {
        return true;
      } else if (row1 + 1 === row2) {
        return true;
      } else {
        return false;
      }
    } else if (this.color === "black") {
      if (
        this.isNew === true &&
        row2 + 2 === row1 &&
        checkInBetween("row", row1, col1, row2, col2, arr) === true
      ) {
        return true;
      } else if (row2 + 1 === row1) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkCaptureMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (this.color === "white") {
      if (row1 + 1 === row2 && Math.abs(col1 - col2) === 1) {
        return true;
      }
    } else if (this.color === "black") {
      if (row2 + 1 === row1 && Math.abs(col1 - col2) === 1) {
        return true;
      }
    } else return false;
  }
}

class Rook {
  constructor(type, color, position, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isNew = isNew;
  }
  checkValidMove(row2, col2, arr) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else if (row1 == row2) {
      if (checkInBetween("column", row1, col1, row2, col2, arr) === false)
        return false;
      else return true;
    } else {
      if (checkInBetween("row", row1, col1, row2, col2, arr) === false)
        return false;
      // to review
      else return true;
    }
  }
}

class Knight {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) + Math.abs(col2 - col1) === 3 &&
      Math.abs(row2 - row1) !== 3 &&
      Math.abs(col2 - col1) !== 3
    ) {
      return true;
    } else return false;
  }
}

class Bishop {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2, arr) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else return false;
    // to add
  }
}

class Queen {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2, arr) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else if (
      row1 === row2 &&
      checkInBetween("column", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else if (
      col1 === col2 &&
      checkInBetween("row", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else return false;
  }
}

class King {
  constructor(type, color, position, inCheck = false, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.inCheck = inCheck;
    this.isNew = isNew;
  }

  checkValidMove(row2, col2, arr, board) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      //diagonal move
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      Math.abs(row2 - row1) === 1
    ) {
      return true;
    } else if (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1) {
      return true;
    } else if (
      (row1 === 0 &&
        row2 === 0 &&
        col1 === 4 &&
        col2 === 2 &&
        this.color === "white" &&
        this.isNew) ||
      (row1 === 0 &&
        row2 === 0 &&
        col1 === 4 &&
        col2 === 6 &&
        this.color === "white" &&
        this.isNew) ||
      (row1 === 7 &&
        row2 === 7 &&
        col1 === 4 &&
        col2 === 2 &&
        this.color === "black" &&
        this.isNew) ||
      (row1 === 7 &&
        row2 === 7 &&
        col1 === 4 &&
        col2 === 6 &&
        this.color === "black" &&
        this.isNew)
    ) {
      return castling(row1, col1, row2, col2, arr, board);
    } else return false;
  }
}

//----------------castling function
function castling(row1, col1, row2, col2, arr, board) {
  if (col2 === 2) {
    const arrLoop = [];
    arrLoop.push(findElement(row1, 0, arr));
    for (let i = 1; i < 4; i++) {
      arrLoop.push(findElement(row1, i, arr));
      if (arrLoop[i] !== undefined) return false;
      if (checkFor(arrLoop[0].color, arr, row1, i)) {
        return false;
      }
    }
    if (row1 === 0) {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "white" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3, board);
        return true;
      } else return false;
    } else {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "black" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3, board);
        return true;
      } else return false;
    }
  } else {
    const arrLoop = [];
    arrLoop.push(findElement(row1, 7, arr));
    for (let i = 6; i > 4; i--) {
      arrLoop.push(findElement(row1, i, arr));
      if (arrLoop[i] !== undefined) return false;
      if (checkFor(arrLoop[0].color, arr, row1, i)) {
        return false;
      }
    }

    if (row1 === 0) {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "white" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5, board);
        return true;
      } else return false;
    } else {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "black" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5, board);
        return true;
      } else return false;
    }
  }
}
//-------------creating pieces

const activePiecesLeft = [];

for (let i = 0; i < 8; i++) {
  activePiecesLeft.push(new Pawn("pawn", "white", [1, i]));
}
for (let i = 0; i < 8; i++) {
  activePiecesLeft.push(new Pawn("pawn", "black", [6, i]));
}

activePiecesLeft.push(new Rook("rook", "white", [0, 0]));
activePiecesLeft.push(new Rook("rook", "white", [0, 7]));
activePiecesLeft.push(new Rook("rook", "black", [7, 0]));
activePiecesLeft.push(new Rook("rook", "black", [7, 7]));
activePiecesLeft.push(new Knight("knight", "white", [0, 1]));
activePiecesLeft.push(new Knight("knight", "white", [0, 6]));
activePiecesLeft.push(new Knight("knight", "black", [7, 1]));
activePiecesLeft.push(new Knight("knight", "black", [7, 6]));
activePiecesLeft.push(new Bishop("bishop", "white", [0, 2]));
activePiecesLeft.push(new Bishop("bishop", "white", [0, 5]));
activePiecesLeft.push(new Bishop("bishop", "black", [7, 2]));
activePiecesLeft.push(new Bishop("bishop", "black", [7, 5]));
activePiecesLeft.push(new Queen("queen", "white", [0, 3]));
activePiecesLeft.push(new Queen("queen", "black", [7, 3]));
activePiecesLeft.push(new King("king", "white", [0, 4]));
activePiecesLeft.push(new King("king", "black", [7, 4]));

console.log(`activePiecesLeft array contains`);
console.log(activePiecesLeft);

// ------------ function declarations

function updateHTML(row1, col1, row2, col2, board) {
  let originalHTML = "";
  let destinationHTML = "";

  if (board === "left") {
    originalHTML = document.getElementById(`r${row1}c${col1}`);
    destinationHTML = document.getElementById(`r${row2}c${col2}`);
  } else {
    originalHTML = document.getElementById(`R${row1}C${col1}`);
    destinationHTML = document.getElementById(`R${row2}C${col2}`);
  }

  destinationHTML.innerHTML = originalHTML.innerHTML;

  originalHTML.innerHTML = "";
}

function unhighlightSquare(row1, col1, board) {
  let activatedHTML = "";
  if (board === "left") {
    activatedHTML = document.getElementById(`r${row1}c${col1}`);
  } else {
    activatedHTML = document.getElementById(`R${row1}C${col1}`);
  }

  if ((row1 + col1) % 2 === 0) {
    activatedHTML.style.backgroundImage = backgroundLight;
  } else {
    activatedHTML.style.backgroundImage = backgroundDark;
  }
}

function highlightSquare(squareId) {
  const activatedHTML = document.getElementById(squareId);
  activatedHTML.style.backgroundImage = "none";
  activatedHTML.style.backgroundColor = colorYellow;
}

function addCaptured(color, id, board) {
  const box = document.getElementById(`captured${color}Display${board}`);
  box.innerHTML += document.getElementById(id).innerHTML;
}

function checkFor(color, arr, row = undefined, col = undefined) {
  // locating the kings
  if (row === undefined) {
    let blackKing = arr.find(
      (piece) => piece.color === "black" && piece.type === "king"
    );

    let whiteKing = arr.find(
      (piece) => piece.color === "white" && piece.type === "king"
    );

    if (color === "white") {
      row = whiteKing.position[0];
      col = whiteKing.position[1];
    } else {
      row = blackKing.position[0];
      col = blackKing.position[1];
    }
  }

  // return true is white king is in check
  if (color === "white") {
    for (const piece of arr.filter((piece) => piece.color === "black")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(row, col, arr) === true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(row, col, arr) === true)
      ) {
        return true;
      }
    }
    return false;
  }

  // return true if black king is in check
  if (color === "black") {
    for (const piece of arr.filter((piece) => piece.color === "white")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(row, col, arr) === true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(row, col, arr) === true)
      ) {
        console.log("black king is in check");
        return true;
      }
    }
    return false;
  }
}

function nextMoveCheck(
  color,
  isCapture,
  arr,
  board,
  targetRow,
  targetCol,
  capturedPieceIndex
) {
  let removedPiece = "";
  let temp = false;

  let activePieceIndex = 0;
  let activatedPieceRow = 0;
  let activatedPieceCol = 0;

  if (board === "left") {
    activePieceIndex = activePieceIndexLeft;
    activatedPieceRow = activatedPieceRowLeft;
    activatedPieceCol = activatedPieceColLeft;
  } else {
    activePieceIndex = activePieceIndexRight;
    activatedPieceRow = activatedPieceRowRight;
    activatedPieceCol = activatedPieceColRight;
  }

  arr[activePieceIndex].position = [targetRow, targetCol];

  if (isCapture) {
    removedPiece = arr.splice(capturedPieceIndex, 1);
  }

  if (color === "white") {
    if (checkFor("white", arr)) {
      temp = true;
    }
  }

  if (color === "black") {
    if (checkFor("black", arr)) {
      temp = true;
    }
  }

  if (isCapture) {
    arr.splice(capturedPieceIndex, 0, removedPiece[0]);
  }

  arr[activePieceIndex].position = [activatedPieceRow, activatedPieceCol];

  return temp;
}

function stateIncrement(board) {
  if (board === "left") {
    stateLeft++;
    if (stateLeft === 5) {
      stateLeft = 1;
    }
  } else {
    stateRight++;
    if (stateRight === 5) {
      stateRight = 1;
    }
  }
}

function findElement(row, col, arr) {
  return arr.find(({ position }) => position[0] === row && position[1] === col);
}

// ----------------------- variable declaration

// ==> Right board

// states = ["activated_piece_white", "destination_square_white".... then black]
let stateLeft = 1;

// Activated piece, e.g. pawn_white_1
let activatedPieceLeft = "";

// Activated piece square aka first click square coordination
let activatedPieceSquareLeft = "";

// row and column number of activated piece square
let activatedPieceRowLeft = 0;
let activatedPieceColLeft = 0;

// index of the activated piece in the activePieces array
let activePieceIndexLeft = 0;

// array to store captured pieces
const capturedWhiteLeft = [];
const capturedBlackLeft = [];

// querySelector
const logDisplayLeft = document.getElementById("log");

// =>  for fun
const emoji = ["&#x1f622", "&#x1f44f"];

// ==> Right board

// states = ["activated_piece_white", "destination_square_white".... then black]
let stateRight = 1;

// Activated piece, e.g. pawn_white_1
let activatedPieceRight = "";

// Activated piece square aka first click square coordination
let activatedPieceSquareRight = "";

// row and column number of activated piece square
let activatedPieceRowRight = 0;
let activatedPieceColRight = 0;

// index of the activated piece in the activePieces array
let activePieceIndexRight = 0;

// array to store captured pieces
const capturedWhiteRight = [];
const capturedBlackRight = [];

// querySelector
const logDisplayRight = document.getElementById("log");

// ------------ upon clicking the start button
function startFunction() {
  document.querySelector("button").remove();
  document.querySelector("#board").addEventListener("click", gamePlay);
  document.querySelector("#log").innerText = "White to start";
}

// ------------- main function

function gamePlay(e) {
  if (e.target.className === "square") {
    if (stateLeft === 1 || stateLeft === 3) {
      //first click

      activatedPieceSquareLeft = e.target.id;
      activatedPieceRowLeft = Number(activatedPieceSquareLeft[1]);
      activatedPieceColLeft = Number(activatedPieceSquareLeft[3]);

      activatedPieceLeft = findElement(
        activatedPieceRowLeft,
        activatedPieceColLeft,
        activePiecesLeft
      );
      activePieceIndexLeft = activePiecesLeft.indexOf(activatedPieceLeft);

      // if empty square
      if (activatedPieceLeft === undefined) {
        logDisplayLeft.innerText = "empty square selected";
      }

      // if not empty square => check for color ~~~ proceed
      else {
        if (
          (stateLeft === 1 && activatedPieceLeft.color === "white") ||
          (stateLeft === 3 && activatedPieceLeft.color === "black")
        ) {
          logDisplayLeft.innerText = `${activatedPieceLeft.type} at ${activatedPieceRowLeft},${activatedPieceColLeft} is selected`;
          highlightSquare(activatedPieceSquareLeft, activePiecesLeft, "left");
          stateIncrement("left");
        } else {
          logDisplayLeft.innerText = "wrong color is selected";
        }
      }
    } else if (stateLeft === 2 || stateLeft === 4) {
      //second click

      const targetSquare = e.target.id;
      const targetRow = Number(targetSquare[1]);
      const targetCol = Number(targetSquare[3]);

      const targetPiece = findElement(targetRow, targetCol, activePiecesLeft);

      let capturedPieceIndex = -1;
      if (targetPiece !== undefined) {
        capturedPieceIndex = activePiecesLeft.indexOf(targetPiece);
      }

      const isSameSquare = activatedPieceSquareLeft === targetSquare;
      const isOccupied = targetPiece !== undefined;
      const isSameColor =
        isOccupied && targetPiece.color === activatedPieceLeft.color;
      let isValidMove = false;
      let inCheck = false;
      let inCheckNext = false;

      // not run if targeting pieces of the same color
      if (!isSameColor) {
        if (stateLeft === 2) {
          const inCheck = checkFor("white", activePiecesLeft);
          const inCheckNext = nextMoveCheck(
            "white",
            isOccupied,
            activePiecesLeft,
            "left",
            targetRow,
            targetCol,
            capturedPieceIndex
          );
        } else {
          inCheck = checkFor("black", activePiecesLeft);
          inCheckNext = nextMoveCheck(
            "black",
            isOccupied,
            activePiecesLeft,
            "left",
            targetRow,
            targetCol,
            capturedPieceIndex
          );
        }
      } else {
        inCheck = false;
        inCheckNext = false;
      }

      if (activatedPieceLeft.type === "pawn" && isOccupied & !isSameColor) {
        isValidMove = activatedPieceLeft.checkCaptureMove(
          targetRow,
          targetCol,
          activePiecesLeft
        );
      } else {
        isValidMove = activatedPieceLeft.checkValidMove(
          targetRow,
          targetCol,
          activePiecesLeft,
          "left"
        );
      }

      // same square
      if (isSameSquare) {
        logDisplayLeft.innerText = "cancelled";
        unhighlightSquare(activatedPieceRowLeft, activatedPieceColLeft, "left");
        stateLeft--;
      }
      // different square
      else {
        // different square => if valid move or color is different
        if (!isSameColor && isValidMove) {
          if (!inCheck && inCheckNext) {
            logDisplayLeft.innerText =
              "invalid move - king is moved into check";
            stateLeft--;
            unhighlightSquare(
              activatedPieceRowLeft,
              activatedPieceColLeft,
              "left"
            );
          } else if (inCheck && inCheckNext) {
            logDisplayLeft.innerText = "invalid move - king is still in check";
            stateLeft--;
            unhighlightSquare(
              activatedPieceRowLeft,
              activatedPieceColLeft,
              "left"
            );
          } else {
            logDisplayLeft.innerText = `moved`;
            activePiecesLeft[activePieceIndexLeft].position = [
              targetRow,
              targetCol,
            ];
            unhighlightSquare(
              activatedPieceRowLeft,
              activatedPieceColLeft,
              "left"
            );
            if (isOccupied) {
              if (activePiecesLeft[capturedPieceIndex].color === "white") {
                capturedWhiteLeft.push(
                  activePiecesLeft.splice(capturedPieceIndex, 1)
                );
                addCaptured("white", targetSquare, "Left");
              } else {
                capturedBlackLeft.push(
                  activePiecesLeft.splice(capturedPieceIndex, 1)
                );
                addCaptured("black", targetSquare, "Left");
              }

              const temp = Math.floor(Math.random() * 2);
              logDisplayLeft.innerHTML = `captured ${emoji[temp]}`;
            }

            if (activatedPieceLeft.type === "pawn") {
              activatedPieceLeft.isNew = false;
            } else if (activatedPieceLeft.type === "rook") {
              activatedPieceLeft.isNew = false;
            } else if (activatedPieceLeft.type === "king") {
              activatedPieceLeft.isNew = false;
            }

            stateIncrement("left");
            updateHTML(
              activatedPieceRowLeft,
              activatedPieceColLeft,
              targetRow,
              targetCol,
              "left"
            );
          }
        } else {
          logDisplayLeft.innerText = "invalid move";
          unhighlightSquare(
            activatedPieceRowLeft,
            activatedPieceColLeft,
            "left"
          );
          stateLeft--;
        }
      }
    }
    console.log(`current state is ${stateLeft}`);
  }
}

document.querySelector("button").addEventListener("click", startFunction);
