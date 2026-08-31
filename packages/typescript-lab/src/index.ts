import { TicTacToe } from "./toDo.ts";

const game: TicTacToe = new TicTacToe();
const moves: [number, number][] = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
  [0, 2],
];
let moveIndex: number = 0;

console.log(game.getBoardMsg());

const intervalID: NodeJS.Timeout = setInterval(() => {
  const move: [number, number] = moves[moveIndex];
  game.makeMove(move[0], move[1]);
  console.log(game.getBoardMsg());

  const winner: string | null = game.checkForWinner();
  if (winner !== null) {
    console.log(`Player ${winner} won!`);
    clearInterval(intervalID);
  } else if (game.isFull()) {
    console.log("The game ended in a draw.");
    clearInterval(intervalID);
  } else {
    moveIndex++;
  }
}, 1000);
