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
function checkInBetween(axis, row1, col1, row2, col2) {
  switch (axis) {
    case "row": {
      for (let i = Math.min(row1, row2) + 1; i < Math.max(row1, row2); i++) {
        if (
          activePieces.find(
            ({ position }) => position[0] === i && position[1] === col1
          ) !== undefined
        ) {
          console.log("blocked");
          return false;
        }
      }
      return true;
    }
    case "column": {
      for (let i = Math.min(col1, col2) + 1; i < Math.max(col1, col2); i++) {
        if (
          activePieces.find(
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
            activePieces.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 - step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 < col2) {
          if (
            activePieces.find(
              ({ position }) =>
                position[0] === row1 + step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 > row2 && col1 < col2) {
          if (
            activePieces.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 > col2) {
          if (
            activePieces.find(
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
  checkValidMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (col1 !== col2) {
      return false;
    }
    if (this.color === "white") {
      if (
        this.isNew === true &&
        row1 + 2 === row2 &&
        checkInBetween("row", row1, col1, row2, col2) === true
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
        checkInBetween("row", row1, col1, row2, col2) === true
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
  checkValidMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else if (row1 == row2) {
      if (checkInBetween("column", row1, col1, row2, col2) === false)
        return false;
      else return true;
    } else {
      if (checkInBetween("row", row1, col1, row2, col2) === false) return false;
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
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2) === true
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
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2) === true
    ) {
      return true;
    } else if (
      row1 === row2 &&
      checkInBetween("column", row1, col1, row2, col2) === true
    ) {
      return true;
    } else if (
      col1 === col2 &&
      checkInBetween("row", row1, col1, row2, col2) === true
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

  checkValidMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      //diagonal move
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      Math.abs(row2 - row1) === 1
    ) {
      console.log("Hi");
      return true;
    } else if (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1) {
      console.log("Hi");
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
      console.log(`${row1}, ${col1},${row2},${col2}`);
      return castling(row1, col1, row2, col2);
    } else return false;
  }
}

//----------------castling function
function castling(row1, col1, row2, col2) {
  if (col2 === 2) {
    console.log("lol");
    const arr = [];
    arr.push(findElement(row1, 0));
    for (let i = 1; i < 4; i++) {
      arr.push(findElement(row1, i));
      if (arr[i] !== undefined) return false;
      if (checkFor(arr[i].color, activePieces, row1, i)) {
        return false;
      }
    }
    if (row1 === 0) {
      if (arr[0].type === "rook" && arr[0].color === "white" && arr[0].isNew) {
        arr[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3);
        return true;
      } else return false;
    } else {
      if (arr[0].type === "rook" && arr[0].color === "black" && arr[0].isNew) {
        arr[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3);
        return true;
      } else return false;
    }
  } else {
    const arr = [];
    arr.push(findElement(row1, 7));
    for (let i = 6; i > 4; i--) {
      arr.push(findElement(row1, i));
      if (arr[i] !== undefined) return false;
      if (checkFor(arr[0].color, activePieces, row1, i)) {
        return false;
      }
    }

    if (row1 === 0) {
      if (arr[0].type === "rook" && arr[0].color === "white" && arr[0].isNew) {
        arr[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5);
        return true;
      } else return false;
    } else {
      if (arr[0].type === "rook" && arr[0].color === "black" && arr[0].isNew) {
        arr[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5);
        return true;
      } else return false;
    }
  }
}
//-------------creating pieces

const activePieces = [];

for (let i = 0; i < 8; i++) {
  activePieces.push(new Pawn("pawn", "white", [1, i]));
}
for (let i = 0; i < 8; i++) {
  activePieces.push(new Pawn("pawn", "black", [6, i]));
}

activePieces.push(new Rook("rook", "white", [0, 0]));
activePieces.push(new Rook("rook", "white", [0, 7]));
activePieces.push(new Rook("rook", "black", [7, 0]));
activePieces.push(new Rook("rook", "black", [7, 7]));
activePieces.push(new Knight("knight", "white", [0, 1]));
activePieces.push(new Knight("knight", "white", [0, 6]));
activePieces.push(new Knight("knight", "black", [7, 1]));
activePieces.push(new Knight("knight", "black", [7, 6]));
activePieces.push(new Bishop("bishop", "white", [0, 2]));
activePieces.push(new Bishop("bishop", "white", [0, 5]));
activePieces.push(new Bishop("bishop", "black", [7, 2]));
activePieces.push(new Bishop("bishop", "black", [7, 5]));
activePieces.push(new Queen("queen", "white", [0, 3]));
activePieces.push(new Queen("queen", "black", [7, 3]));
activePieces.push(new King("king", "white", [0, 4]));
activePieces.push(new King("king", "black", [7, 4]));

console.log(`activePieces array contains`);
console.log(activePieces);

// ------------ function declarations

function updateHTML(row1, col1, row2, col2) {
  const originalHTML = document.getElementById(`r${row1}c${col1}`);
  const destinationHTML = document.getElementById(`r${row2}c${col2}`);

  destinationHTML.innerHTML = originalHTML.innerHTML;

  originalHTML.innerHTML = "";
}

function unhighlightSquare(row1, col1) {
  const activatedHTML = document.getElementById(`r${row1}c${col1}`);

  if ((row1 + col1) % 2 === 0) {
    activatedHTML.style.backgroundImage = backgroundLight;
  } else {
    activatedHTML.style.backgroundImage = backgroundDark;
  }
}

function checkFor(color, arr, row = undefined, col = undefined) {
  // locating the kings
  if (row === undefined) {
    let blackKing = activePieces.find(
      (piece) => piece.color === "black" && piece.type === "king"
    );

    let whiteKing = activePieces.find(
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
        (piece.type !== "pawn" && piece.checkValidMove(row, col) === true) ||
        (piece.type === "pawn" && piece.checkCaptureMove(row, col) === true)
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
        (piece.type !== "pawn" && piece.checkValidMove(row, col) === true) ||
        (piece.type === "pawn" && piece.checkCaptureMove(row, col) === true)
      ) {
        console.log("black king is in check");
        return true;
      }
    }
    return false;
  }
}

function nextMoveCheck(color, isCapture) {
  let removedPiece = "";
  let temp = false;

  activePieces[activePieceIndex].position = [targetRow, targetCol];

  if (isCapture) {
    removedPiece = activePieces.splice(capturedPieceIndex, 1);
  }

  if (color === "white") {
    if (checkFor("white", activePieces)) {
      temp = true;
    }
  }

  if (color === "black") {
    if (checkFor("black", activePieces)) {
      temp = true;
    }
  }

  // console.log(removedPiece);
  // console.log(temp);
  // console.log(checkFor("white", activePieces));
  // console.log(capturedPieceIndex);
  // console.log(activatedPieceRow, activatedPieceCol);
  // console.log(targetRow, targetCol);

  if (isCapture) {
    activePieces.splice(capturedPieceIndex, 0, removedPiece[0]);
    console.log("below is the piece put back");
    console.log(activePieces[capturedPieceIndex]);
  }

  activePieces[activePieceIndex].position = [
    activatedPieceRow,
    activatedPieceCol,
  ];

  return temp;
}

function stateIncrement() {
  state++;
  if (state === 5) {
    state = 1;
  }
}

function findElement(row, col) {
  return activePieces.find(
    ({ position }) => position[0] === row && position[1] === col
  );
}

// ----------------------- variable declaration

// states = ["activated_piece_white", "destination_square_white".... then black]
let state = 1;

// Activated piece, e.g. pawn_white_1
let activatedPiece = "";

// Activated piece square aka first click square coordination
let activatedPieceSquare = "";

// row and column number of activated piece square
let activatedPieceRow = 0;
let activatedPieceCol = 0;

// index of the activated piece in the activePieces array
let activePieceIndex = 0;

// Target square aka second click square coordination
let targetSquare = "";

// Target square row and column
let targetRow = 0;
let targetCol = 0;

// Target piece sitting on the target square
let targetPiece = "";

// Index of captured piece in active pieces array, to be removed when captured
let capturedPieceIndex = 0;

// Second state variables
let isSameSquare = false;
let isOccupied = false;
let isSameColor = false;
let isValidMove = false;

// check variable
let inCheck = false;
let inCheckNext = false;

// querySelector
const logDisplay = document.getElementById("log");

// ------------ upon clicking the start button
function startFunction() {
  document.querySelector("button").remove();
  document.querySelector("#board").addEventListener("click", gamePlay);
  document.querySelector("#log").innerText = "White to start";
}

// ------------- main function

function gamePlay(e) {
  if (e.target.className === "square") {
    if (state === 1 || state === 3) {
      //first click

      activatedPieceSquare = e.target.id;
      activatedPieceRow = Number(activatedPieceSquare[1]);
      activatedPieceCol = Number(activatedPieceSquare[3]);

      activatedPiece = activePieces.find(
        ({ position }) =>
          position[0] === activatedPieceRow && position[1] === activatedPieceCol
      );
      activePieceIndex = activePieces.indexOf(activatedPiece);

      console.log(activatedPiece);

      // if empty square
      if (activatedPiece === undefined) {
        logDisplay.innerText = "empty square selected";
      }

      // if not empty square => check for color ~~~ proceed
      else {
        if (
          (state === 1 && activatedPiece.color === "white") ||
          (state === 3 && activatedPiece.color === "black")
        ) {
          logDisplay.innerText = `${activatedPiece.type} at ${activatedPieceRow},${activatedPieceCol} is selected`;
          stateIncrement();
        } else {
          logDisplay.innerText = "wrong color is selected";
        }
      }
    } else if (state === 2 || state === 4) {
      //second click

      targetSquare = e.target.id;
      targetRow = Number(targetSquare[1]);
      targetCol = Number(targetSquare[3]);

      targetPiece = activePieces.find(
        ({ position }) => position[0] === targetRow && position[1] === targetCol
      );

      console.log(targetPiece);

      if (targetPiece !== undefined) {
        capturedPieceIndex = activePieces.indexOf(targetPiece);
      }

      isSameSquare = activatedPieceSquare === targetSquare;
      isOccupied = targetPiece !== undefined;
      isSameColor = isOccupied && targetPiece.color === activatedPiece.color;

      console.log(activePieces[0]);

      // not run if targeting pieces of the same color
      if (!isSameColor) {
        if (state === 2) {
          inCheck = checkFor("white", activePieces);
          inCheckNext = nextMoveCheck("white", isOccupied);
        } else {
          inCheck = checkFor("black", activePieces);
          inCheckNext = nextMoveCheck("black", isOccupied);
        }
      } else {
        inCheck = false;
        inCheckNext = false;
      }

      if (activatedPiece.type === "pawn" && isOccupied & !isSameColor) {
        isValidMove = activatedPiece.checkCaptureMove(targetRow, targetCol);
      } else {
        isValidMove = activatedPiece.checkValidMove(targetRow, targetCol);
      }

      console.log(`incheck value before moving is ${inCheck}`);
      console.log(`inchecknext value after moving is ${inCheckNext}`);

      // same square
      if (isSameSquare) {
        logDisplay.innerText = "cancelled";
        state--;
      }
      // different square
      else {
        // different square => if valid move or color is different
        if (!isSameColor && isValidMove) {
          if (!inCheck && inCheckNext) {
            logDisplay.innerText = "invalid move - king is moved into check";
          } else if (inCheck && inCheckNext) {
            logDisplay.innerText = "invalid move - king is still in check";
          } else {
            logDisplay.innerText = `moved`;
            activePieces[activePieceIndex].position = [targetRow, targetCol];
            if (isOccupied) {
              console.log(activePieces.splice(capturedPieceIndex, 1));

              logDisplay.innerText = `captured`;
            }

            if (activatedPiece.type === "pawn") {
              activatedPiece.isNew = false;
            } else if (activatedPiece.type === "rook") {
              activatedPiece.isNew = false;
            } else if (activatedPiece.type === "king") {
              activatedPiece.isNew = false;
            }

            stateIncrement();
            updateHTML(
              activatedPieceRow,
              activatedPieceCol,
              targetRow,
              targetCol
            );
          }
        } else {
          logDisplay.innerText = "invalid move";
          state--;
        }
      }
    }
    console.log(`current state is ${state}`);
  }
}

document.querySelector("button").addEventListener("click", startFunction);
