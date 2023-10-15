import './style.css';
import { Ship } from './ship';
import { Gameboard } from './gameboard';
import { Player } from './player';
import { asyncTimeout } from './timeout';

//paint gameboard for each player
function paintBoard(player, whoseBoard) {
    const board = document.querySelector(`.${whoseBoard}.board`);
    for (let i = 0; i < player.board.row; i++) {
        const rowElements = document.createElement('div');
        rowElements.classList.add('row');
        for (let j = 0; j < player.board.col; j++) {
            const grid = document.createElement('div');
            //a valid css selctor can not start with digit; use underscore to start
            https://medium.com/front-end-weekly/css-selector-for-element-which-have-numbers-as-class-name-b6a089989199
            grid.classList.add(`_${i}${j}`);
            grid.classList.add('col');
            grid.classList.add(`${whoseBoard}`);
            //player has board(gameboard instance); and board inclue board(array)
            if (whoseBoard === 'you') {
                grid.innerHTML = player.board.board[i][j];
            }
            if (whoseBoard === 'computer') {
                grid.innerHTML = ' ';
            }
            rowElements.appendChild(grid);
        }
        board.appendChild(rowElements);
    }
}

const you = new Player(10, 10);
//you.generateFiveShips();
const computer = new Player(10, 10);
computer.generateFiveShips();
//need to paint the grid first before adding ships
paintBoard(you, 'you');
paintBoard(computer, 'computer');

//add your own ships from the grid:
const myShips = [];
let clickCounts = 0;
let currentShip = new Ship(0, []);
const button = document.querySelector("button");
button.addEventListener('click', (e) => {
    if (clickCounts === 5) {
        myShips.push(currentShip);
        //make a shallow copy of currentShip
        you.board.myShips = myShips;
        e.target.innerHTML = "Start your game!"
        e.target.disabled = true;
        return;
    }
    if (clickCounts > 0 && clickCounts < 5) {
        myShips.push(currentShip);
        currentShip = new Ship(0, []);
    }
    e.target.innerHTML = `Ship ${clickCounts + 1}`;
    clickCounts++;
})

const yourGrids = document.querySelectorAll(".col.you");
console.log(yourGrids);
yourGrids.forEach((yourGrid) => {
    yourGrid.addEventListener('click', (e)=> {
        const row = parseInt(e.target.className.slice(1, 2));
        const col = parseInt(e.target.className.slice(2, 3));
        currentShip.shipBody.push([row, col]);
        currentShip.length++;
        you.board.board[row][col] = clickCounts;
        e.target.innerHTML = clickCounts;
    })
})






function checkAfterAttack(element, player, coordinates) {
    //if it's a hit, mark as X and add 'hit' class to element 
    if (typeof player.board.board[coordinates[0]][coordinates[1]] === "number" && player.board.board[coordinates[0]][coordinates[1]] < 0) {
        element.innerHTML = 'X';
        element.classList.add('hit');
    }
    //if it's a miss, marek as . and add 'mis' class to element
    if (player.board.board[coordinates[0]][coordinates[1]] === 'M') {
        element.innerHTML = 'O';
        element.classList.add('miss');
    }

}


//this is the main game loop
const enemyGrids = document.querySelectorAll(".col.computer");
enemyGrids.forEach( (enemyGrid) => {
    enemyGrid.addEventListener ('click', async (e) => {
        //if the game is over, you can not continue
        if (document.querySelector('.result').innerHTML !== "") {
            return;
        }
        //wait for 1s
        await asyncTimeout(1000);
        //change hint
        const hint = document.querySelector('.hint');
        hint.innerHTML = 'You hit the computer board!';
        const row = parseInt(e.target.className.slice(1, 2));
        const col = parseInt(e.target.className.slice(2, 3));
        //if you clicked a spot that has been clicked before, you need to click again
        if(computer.board.board[row][col] === 'M' || (typeof computer.board.board[row][col] === "number" && computer.board.board[row][col] < 0)) {
            return;
        }
        //now, we need to see if this is a hit or miss and update the board
        computer.board.receiveAttack([row, col]);
        checkAfterAttack(e.target, computer, [row, col]);
        if (computer.board.allSunk) {
            document.querySelector('.result').innerHTML = 'You win!';
        }
        //wait for 1s
        await asyncTimeout(1000);
        //change hint
        hint.innerHTML = "It is computer's turn to hit your board!";
        await asyncTimeout(1000);
        //assume the game is still on; now is computer's turn
        const computerHitTarget = computer.generateCoord(you.board);
        you.board.receiveAttack(computerHitTarget);
        const selected = document.querySelector(`._${computerHitTarget[0]}${computerHitTarget[1]}.you`);
        checkAfterAttack(selected, you, computerHitTarget);
        if (you.board.allSunk) {
            document.querySelector('.result').innerHTML = 'You lose!';
        }
        await asyncTimeout(1000);
        //change hint
        hint.innerHTML = "The computer finished. It is your turn!";
    })
})