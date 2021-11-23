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

class Rook {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
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
  constructor(type, color, position, inCheck = false) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }

  checkValidMove(row2, col2) {
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
    } else return false;
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

// ------------ upon clicking the start button
function startFunction() {
  document.querySelector("button").remove();
  document.querySelector("#board").addEventListener("click", clickFunction);
  document.querySelector("#log").innerText = "White to start";
}

// ------------- main function
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
        logDisplay.innerText = "This is an empty square. Please reselect";
        stateDecrement();
      }

      // if a piece is selected => check for color of piece selected
      else {
        if (
          (state === 1 && activatedPiece.color === "white") ||
          (state === 3 && activatedPiece.color === "black")
        ) {
          const activatedHTML = document.getElementById(
            `r${activatedPieceRow}c${activatedPieceCol}`
          );
          activatedHTML.style.backgroundImage = "none";
          activatedHTML.style.backgroundColor = colorYellow;

          activePieceIndex = activePieces.indexOf(activatedPiece);

          logDisplay.innerText = `piece selected: ${activatedPiece.type} at ${activatedPieceRow},${activatedPieceCol}`;
        } else {
          log.innerText = "Wrong color";
          stateDecrement();
        }
      }
    }

    // at second click
    else if (state === 2 || state === 4) {
      targetSquare = e.target.id;
      targetRow = Number(targetSquare[1]);
      targetCol = Number(targetSquare[3]);

      isSameSquare =
        activatedPieceRow === targetRow && activatedPieceCol === targetCol;
      isOccupied =
        activePieces.find(
          ({ position }) =>
            position[0] === targetRow && position[1] === targetCol
        ) !== undefined;

      //insert function to check if it is the same square, which means cancel
      if (isSameSquare === true) {
        logDisplay.innerText = "Cancelled";

        unhighlightSquare(activatedPieceRow, activatedPieceCol);

        stateDecrement();
        stateDecrement();
      } else {
        console.log(`target square ${targetRow},${targetCol} selected`);

        // if target square is empty
        if (isOccupied === false) {
          if (activatedPiece.checkValidMove(targetRow, targetCol) === true) {
            checkReleased = checkForCheckReleased(
              inCheck,
              targetRow,
              targetCol,
              false
            );

            // if in check and not released by next move, it is an invalid move and thus not moved
            if (inCheck !== "" && checkReleased === false) {
              logDisplay.innerText = "Invalid move - king is in check";
              unhighlightSquare(activatedPieceRow, activatedPieceCol);
              stateDecrement();
              stateDecrement();
            } else if (
              (checkForCheckReleased("white", targetRow, targetCol, false) ===
                false &&
                state === 2) ||
              (checkForCheckReleased("black", targetRow, targetCol, false) ===
                false &&
                state === 4)
            ) {
              // if the move exposes own king to check, thus invalid move

              logDisplay.innerText = "invalid move - king is put into check";
              unhighlightSquare(activatedPieceRow, activatedPieceCol);
              stateDecrement();
              stateDecrement();
            } else {
              // if not in check or is released from in check

              updateHTML(
                activatedPieceRow,
                activatedPieceCol,
                targetRow,
                targetCol
              );

              logDisplay.innerText = `${activatedPiece.type} moved from ${activatedPieceRow},${activatedPieceCol} to ${targetRow},${targetCol}`;
              activePieces[activePieceIndex].position = [targetRow, targetCol];
              unhighlightSquare(activatedPieceRow, activatedPieceCol);

              if (activatedPiece.type === "pawn") {
                activatedPiece.isNew = false;
              }
            }
          } else {
            stateDecrement();
            stateDecrement();
            logDisplay.innerText = "invalid move";
          }
        }

        // if target square is occupied
        else {
          targetPiece = activePieces.find(
            ({ position }) =>
              position[0] === targetRow && position[1] === targetCol
          );

          capturedPieceIndex = activePieces.indexOf(targetPiece);

          // if target piece is the same color
          if (targetPiece.color === activatedPiece.color) {
            logDisplay.innerText = `Unable to capture your own ${targetPiece.type}`;
            unhighlightSquare(activatedPieceRow, activatedPieceCol);
            stateDecrement();
            stateDecrement();
          }

          // if target piece is the opponent
          else {
            if (
              (activatedPiece.type !== "pawn" &&
                activatedPiece.checkValidMove(targetRow, targetCol) === true) ||
              (activatedPiece.type === "pawn" &&
                activatedPiece.checkCaptureMove(targetRow, targetCol) === true)
            ) {
              checkReleased = checkForCheckReleased(
                inCheck,
                targetRow,
                targetCol,
                true
              );

              if (inCheck !== "" && checkReleased === false) {
                logDisplay.innerText = "Invalid move - king is in check";
                unhighlightSquare(activatedPieceRow, activatedPieceCol);
                stateDecrement();
                stateDecrement();
              } else if (
                (checkForCheckReleased("white", targetRow, targetCol, true) ===
                  false &&
                  state === 2) ||
                (checkForCheckReleased("black", targetRow, targetCol, true) ===
                  false &&
                  state === 4)
              ) {
                // if the move exposes own king to check, thus invalid move
                logDisplay.innerText = "invalid move - king is put into check";
                unhighlightSquare(activatedPieceRow, activatedPieceCol);
                stateDecrement();
                stateDecrement();
              } else {
                // capturing process starts

                logDisplay.innerText = `${activatedPiece.type} captured ${targetPiece.type} and moved from ${activatedPieceRow},${activatedPieceCol} to ${targetRow},${targetCol}`;
                if (activatedPiece.type === "pawn") {
                  activatedPiece.isNew = false;
                }

                // removing captured pieces from activePieces array
                activePieces[activePieceIndex].position = [
                  targetRow,
                  targetCol,
                ];
                activePieces.splice(capturedPieceIndex, 1);

                updateHTML(
                  activatedPieceRow,
                  activatedPieceCol,
                  targetRow,
                  targetCol
                );
                unhighlightSquare(activatedPieceRow, activatedPieceCol);
              }
            } else {
              logDisplay.innerText = "invalid move";
              unhighlightSquare(activatedPieceRow, activatedPieceCol);
              stateDecrement();
              stateDecrement();
            }
          }
        }
      }
      inCheck = checkForCheck();
      checkReleased = false;
    }
  }
}

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

function checkFor(color, arr) {
  // locating the kings
  let blackKing = arr.find(
    (piece) => piece.color === "black" && piece.type === "king"
  );

  let whiteKing = arr.find(
    (piece) => piece.color === "white" && piece.type === "king"
  );

  // check
  if (color === "white") {
    for (const piece of arr.filter((piece) => piece.color === "black")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(whiteKing.position[0], whiteKing.position[1]) ===
            true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(
            whiteKing.position[0],
            whiteKing.position[1]
          ) === true)
      ) {
        return true;
      }
    }
  }

  if (color === "black") {
    for (const piece of arr.filter((piece) => piece.color === "white")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(blackKing.position[0], blackKing.position[1]) ===
            true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(
            blackKing.position[0],
            blackKing.position[1]
          ) === true)
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkForCheck() {
  // retrieve kings' position

  if (checkFor("white", activePieces) === true) {
    console.log("white king is in check");
    return "white";
  }

  if (checkFor("black", activePieces) === true) {
    console.log("black king is in check");
    return "black";
  }

  return "";
} // => returning the king in check. "" means none in check

function checkForCheckReleased(color, row2, col2, isCapture) {
  let blackKing = activePieces.find(
    (piece) => piece.color === "black" && piece.type === "king"
  );

  let whiteKing = activePieces.find(
    (piece) => piece.color === "white" && piece.type === "king"
  );

  const clonedArray = activePieces.map((x) => x);
  clonedArray[activePieceIndex].position = [row2, col2];
  if (isCapture === true) {
    clonedArray.splice(capturedPieceIndex, 1);
  }

  if (color === "white") {
    if (checkFor("white", clonedArray) === true) {
      return false;
    }
  } else return true;

  if (color === "black") {
    if (checkFor("black", clonedArray) === true) {
      return false;
    }
  } else return true;
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

// Second state variables
let isSameSquare = false;
let isOccupied = false;

// check for check variable
let inCheck = "";
let checkReleased = true;

// querySelector
const logDisplay = document.getElementById("log");

document.querySelector("button").addEventListener("click", startFunction);
