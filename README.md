# Bughouse chess
A simple and fun website created with Javascript for bughouse chess. 

![](https://media.giphy.com/media/hzAR4V86zuCKQKe6kP/giphy.gif)

## Introduction to bughouse chess
Bughouse is a chess variant that is played by four players divided into two teams of two players each. Allied players work together to checkmate someone from the other side or make them run out of time. While most of the standard chess rules are still applied to Bughouse, the main difference is that the captured pieces can be "recycled" on the other board. 

### Rules
Two players (Team A) play on two boards against another two players (Team B). In both teams one player plays with White, the other with Black. Captured pieces are given to one's teammate. The captured pieces and pawns you do receive from your teammate can be placed on the board in your game. Normal chess rules apply, except:

1. The captured pieces on one board are passed to your teammate.
2. Instead of making a move you can put/’drop’ any captured piece onto any vacant square, though pawns may not be dropped onto the first or the eighth rank.
3. Dropped pawns can be promoted. The pawn goes to your teammate after a promotion is completed.
4. A rook that is put to the original square of the rook is considered not to have moved and you can castle with such a rook.
5. The pieces you receive from your teammate should not be hidden from your opponent.
6. Pieces can NOT be dropped to give checkmate.
7. Checkmate or flagging on either board ends the match.
8. Clocks should be placed at each end so that all four players can see the time on both clocks.
9. Both players are encouraged to talk to each other and share plans and strategies to outplay their opponents.

## Technologies
This project has the containers that make up the general layout (board, timer area and captured pieces area) coded in HTML. The elements are arranged via Flexbox in CSS. The remaining are all coded in Javascript.

#### Main Javascript Application
- DOM manipulation to handle clicks for piece selection and piece placement
- Dynamically moving, adding and removing pieces based on players' choices
- Displaying status and error messages to players
- Animating timer to reduce in width based on remaining time
- Creation of game logics (and this... brings us to "approach"!)

## Approach 

#### Pieces creation and moves
A class is created for each piece type (e.g. pawn, rook, queen etc). All classes have one method for their valid move and three basic attributes - type, color and position. Besides, pawn, rook and king have additional attribute to track if they have been moved during the game, which determined if they are eligible for two square advancement and castling respectively. A class instance has been created for each piece on the board. Two arrays are created to monitor all the active piece on each board. Instead of images, the pieces are represented by Unicode chess symbols. 

#### Position
Coordinates of the square are stored in the square's id. The code retrieves the row and column of the target square from the id. 

#### Check
After passing the valid move test, the king is subject to check test. The move should need to fulfill 2 conditions, it should not put its own king into a check and if the king is in a check, it should bring the king out of the current check. The check function iterates through all the opponent's pieces in the active piece array to find valid move to the king's postion. 

#### States and game flow
4 different states are used in the game to keep track of players' turns and actions.They are:
1. White's turn to choose a piece - can be a piece on a board or captured piece
2. White's turn to move/drop the piece
3. Black's turn to choose a piece - can be a piece on a board or captured piece
4. Black's turn to move/drop the piece

Validation tests to test for inappropriate clicks based on currentt states are put in place. For example, players are unable to select white pieces at state 3. Or players cannot capture their own pieces. Or a piece is de-selected if it is clicked twice. 

The two boards run in parallel and have different state counter, thus the turns are not interfered by one another. The timer for both White players start when the "start" button is clicked. The timer for the opponent immediately starts running when a move has be made i.e. state changed from 1 to 3 and vice versa. 

The game continues like normal chess, except captured piece will be added to  teammate's captured piece stash. 

## Unsolved problems
As much as the project wanted to provide a complete Bughouse playing experience, there are some chess rules that the project has yet to implement due to time constraint.

- Promotion of pawn at first or eighth rank
- En passant capture
- Detection of checkmate
- Restriction to prevent a piece is dropped and results in checkmate

But still, keep a lookout to this webstie for future updates! 
