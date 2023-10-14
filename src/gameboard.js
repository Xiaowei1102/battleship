import { Ship } from "./ship";

class Gameboard {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.board = Array(row).fill().map(() => Array(col).fill(" "));
        //openArea means places you can hit
        this.openArea = this.row * this.col;
        //ships come with board
        this.myShips = [];
        this.allSunk = false;
    }
    placeShip(length, headCoord, shipOrientation) {
        //this ship can not over lap with other ships
        const ship = new Ship(length, headCoord, shipOrientation);
        for (let coord of ship.shipBody) {
            if(this.board[coord[0]][coord[1]] === "S") {
                return;
            }
        }
        //update the board
        for (let coord of ship.shipBody) {
            this.board[coord[0]][coord[1]] = "S";
        }
        this.myShips.push(ship);
        
    }
    receiveAttack(coordinate) {
        //if this is a missed shot, then nothing happens
        if (this.board[coordinate[0]][coordinate[1]] === "M") {
            return;
        }
        for (let i in this.myShips) {
            if (this.myShips[i].hit(coordinate)) {
                //check ship sunk?
                if (this.myShips[i].isSunk()) {
                    //delete this ship
                    this.myShips.splice(i, 1);
                    if (this.myShips.length === 0) {
                        this.allSunk = true;
                    }
                }
            } else {
                //record the missed hit
                this.board[coordinate[0]][coordinate[1]] = "M";
                this.openArea--;
            }
        }
    }

}

export {Gameboard};