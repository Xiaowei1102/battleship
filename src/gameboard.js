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
        //this ship can not extend outside boundary
        const ship = new Ship(length, headCoord, shipOrientation);
        for (let coord of ship.shipBody) {
            if(coord[0] >= this.row || coord[1] >= this.col || this.board[coord[0]][coord[1]] !== " ") {
                return;
            }
        }
        //update the board
        this.myShips.push(ship);
        for (let coord of ship.shipBody) {
            this.board[coord[0]][coord[1]] = this.myShips.indexOf(ship) + 1;
        }
        
    }
    receiveAttack(coordinate) {
        //filer out the places that have been hit before 
        if (this.board[coordinate[0]][coordinate[1]] === " " || (typeof this.board[coordinate[0]][coordinate[1]] === "number" && this.board[coordinate[0]][coordinate[1]] > 0)) {
            for (let i in this.myShips) {
                if (this.myShips[i].hit(coordinate)) {
                    //need to mark this is a spot that has been hit before; maybe just say, negative number
                    this.board[coordinate[0]][coordinate[1]] = -this.board[coordinate[0]][coordinate[1]];
                    //check ship sunk?
                    if (this.myShips[i].isSunk()) {
                        //delete this ship
                        this.myShips.splice(i, 1);
                        if (this.myShips.length === 0) {
                            this.allSunk = true;
                        }
                    }
                    //if it's a hit, not need to run codes after this line
                    return;
                }
            }
            //record the missed hit
            this.board[coordinate[0]][coordinate[1]] = "M";
            this.openArea--;
        }
    }

}

export {Gameboard};