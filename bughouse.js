//-------- Setting up chess board
// Redundant??
const boardArr = [];
for (let i = 0; i < 8; i++) {
  boardArr[i] = [];
  for (let j = 0; j < 8; j++) {
    boardArr[i][j] = [7 - i, j];
  }
}

// ==> boardArr is a 2d array starting with [7,0]

//---------- Classes

class Pawn {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    //check if the destination square is occupied, thus invalid
    // to add

    if (col1 !== col2) {
      return false;
    }
    if (this.color === "white") {
      if (row1 + 1 === row2 || row1 + 2 === row2) {
        return true;
      } else {
        return false;
      }
    } else {
      if (row2 + 1 === row1 || row2 + 2 === row1) {
        return true;
      } else {
        return false;
      }
    }
  }
}

class Rook {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    //check if there is any pieces in between original square and target square
    function checkInBetween(axis) {
      if (axis === "row") {
        for (let i = Math.min(row1, row2) + 1; i < Math.max(row1, row2); i++) {
          if (
            activePieces.find(
              ({ position }) => position[0] === i && position[1] === col1
            ) !== undefined
          ) {
            return false;
          }
        }
      } else {
        for (let i = Math.min(col1, col2) + 1; i < Math.max(col1, col2); i++) {
          if (
            activePieces.find(
              ({ position }) => position[0] === row1 && position[1] === i
            ) !== undefined
          ) {
            return false;
          }
        }
      }
      return true;
    }

    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else if (row1 == row2) {
      if (checkInBetween("column") === false) return false;
      else return true;
    } else {
      if (checkInBetween("row") === false) return false;
      // to review
      else return true;
    }
  }
}

class Knight {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) + Math.abs(col2 - col1) === 3 &&
      Math.abs(row2 - row1) !== 3 &&
      Math.abs(col2 - col1) === 3
    ) {
      return true;
    } else return false;
  }
}

class Bishop {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    //check if there is any pieces in between original square and target square
    function checkInBetween() {
      let step = Math.abs(row1 - row2) - 1;
      if (step == 0) {
        return true;
      }
      while (step > 0) {
        if (row1 > row2 && col1 > col2) {
          if (
            activePieces.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col2 - step
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
            console.log("Hi");
            return false;
          }
        }
        step--;
      }
      return true;
    }

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween() === true
    ) {
      return true;
    } else return false;
    // to add
  }
}

class Queen {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (Math.abs(row2 - row1) === Math.abs(col2 - col1)) {
      return true;
    }
    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else return true;
    // to add
  }
}

class King {
  constructor(type, color, position, isAlive = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isAlive = isAlive;
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      Math.abs(row2 - row1) === 1
    ) {
      return true;
    }
    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else if (Math.abs(row2 - row1) === 1 || Math.abs(col2 - col1) === 1) {
      return true;
    } else return false;
    // to add
  }
}

//-------------creating pieces

// create pawns
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

function clickFunction(e) {
  if (e.target.className === "square") {
    stateIncrement();
    // at first click
    if (state === 1 || state === 3) {
      // determine row and column of the activated square
      activatedPieceSquare = e.target.id;
      activatedPieceRow = Number(activatedPieceSquare[1]);
      activatedPieceCol = Number(activatedPieceSquare[3]);

      activatedPiece = activePieces.find(
        ({ position }) =>
          position[0] === activatedPieceRow && position[1] === activatedPieceCol
      );

      // if empty square is selected
      if (activatedPiece === undefined) {
        console.log("no piece is selected");
        stateDecrement();
      }

      // if a piece is selected => check for color of piece selected
      else {
        if (
          (state === 1 && activatedPiece.color === "white") ||
          (state === 3 && activatedPiece.color === "black")
        ) {
          activePieceIndex = activePieces.indexOf(activatedPiece);

          console.log(
            `piece selected: ${activatedPiece.type} at ${activatedPieceRow},${activatedPieceCol}`
          );
        } else {
          console.log("wrong color selected");
          stateDecrement();
        }
      }
    }

    // at second click
    else if (state === 2 || state === 4) {
      targetSquare = e.target.id;
      targetRow = Number(targetSquare[1]);
      targetCol = Number(targetSquare[3]);

      //insert function to check if it is the same square, which means cancel
      if (activatedPieceRow === targetRow && activatedPieceCol === targetCol) {
        console.log("same square selected");
        stateDecrement();
        stateDecrement();
      } else {
        console.log("different square selected");
        if (activatedPiece.checkValidMove(targetRow, targetCol) === true) {
          console.log("yes, it is a valid move");

          targetPiece = activePieces.find(
            ({ position }) =>
              position[0] === targetRow && position[1] === targetCol
          );

          // if the target square is occupied
          if (targetPiece !== undefined) {
            // if the target square is occupied, check if it is attacking own piece
            if (targetPiece.color === activatedPiece.color) {
              console.log("cannot capture piece of the same color");
              stateDecrement();
              stateDecrement();
            }

            // capturing process
            else {
              console.log(activePieces[capturedPieceIndex]);
              console.log("is captured");

              // removing captured pieces from activePieces array
              activePieces.splice(capturedPieceIndex, 1);
              updateHTML(
                activatedPieceRow,
                activatedPieceCol,
                targetRow,
                targetCol,
                activatedPiece.type
              );
              activePieces[activePieceIndex].position = [targetRow, targetCol];
            }
          }
          // if the target square is empty
          else {
            activePieces[activePieceIndex].position = [targetRow, targetCol];
            updateHTML(
              activatedPieceRow,
              activatedPieceCol,
              targetRow,
              targetCol,
              activatedPiece.type
            );
          }
        } else {
          console.log("Invalid move");
          stateDecrement();
          stateDecrement();
        }
      }
    }
  }
}

function updateHTML(row1, col1, row2, col2, type) {
  let initialToDisplay = "";
  switch (type) {
    case "pawn":
      initialToDisplay = "P";
      break;
    case "rook":
      initialToDisplay = "R";
      break;
    case "knight":
      initialToDisplay = "N";
      break;
    case "bishop":
      initialToDisplay = "B";
      break;
    case "queen":
      initialToDisplay = "Q";
      break;
    case "king":
      initialToDisplay = "K";
      break;
  }
  document.querySelector(`#r${row1}c${col1}`).innerHTML = "";
  document.querySelector(`#r${row2}c${col2}`).innerHTML = initialToDisplay;
}

function stateIncrement() {
  state++;
  if (state === 5) {
    state = 1;
  }
}

function stateDecrement() {
  state--;
  if (state === 0) {
    state = 4;
  }
}

// states = ["none", "activated_piece", "destination_square"]
let state = 0;

// Type of activated piece, e.g. P, R, N
let activatedPieceType = "";

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

document.querySelector("#board").addEventListener("click", clickFunction);
