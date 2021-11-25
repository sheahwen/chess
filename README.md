# Bughouse chess
A simple and fun website created with Javascript for bughouse chess. 

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
After many many sleepless afternoons, the final approach taken to build this project is as follows: 

#### Pieces creation


#### Check valid moves

#### Open check 

#### States and game flow

#### Scaling up


