import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

class Player {
    //each player should have their own ships and board
    constructor(row, col) {
        this.board = new Gameboard(row, col);
        this.board.placeShip(1, [0, 0])
        this.board.placeShip(3, [3, 4], 'v');
        this.board.placeShip(2, [5, 5]);
        this.board.placeShip(5, [8, 3]);
        this.board.placeShip(4, [3, 9], 'v');
    }
    attack(enemyBoard, coordinate) {
        enemyBoard.receiveAttack(coordinate);
    }
    //generate a random coord on enemyboard
    generateCoord(enemyBoard) {
        let row = Math.floor(Math.random() * enemyBoard.row);
        let col = Math.floor(Math.random() * enemyBoard.col);
        while (enemyBoard.board[row][col] === "M") {
            row = Math.floor(Math.random() * enemyBoard.row);
            col = Math.floor(Math.random() * enemyBoard.col);
        }
        return [row, col];
    }
}

export {Player};