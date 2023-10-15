import './style.css';
import { Ship } from './ship';
import { Gameboard } from './gameboard';
import { Player } from './player';

const you = new Player(10, 10);
you.generateFiveShips();
const computer = new Player(10, 10);
computer.generateFiveShips();

//paint gameboard for each player
function paintBoard(player, whoseBoard) {
    if (whoseBoard === 'you') {
    }
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

paintBoard(you, 'you');
paintBoard(computer, 'computer');

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



const enemyGrids = document.querySelectorAll(".col.computer");
enemyGrids.forEach( (enemyGrid) => {
    enemyGrid.addEventListener ('click', (e) => {
        
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
        //assume the game is still on; now is computer's turn
        const computerHitTarget = computer.generateCoord(you.board);
        you.board.receiveAttack(computerHitTarget);
        const selected = document.querySelector(`._${computerHitTarget[0]}${computerHitTarget[1]}.you`);
        checkAfterAttack(selected, you, computerHitTarget);
        if (you.board.allSunk) {
            document.querySelector('.result').innerHTML = 'You lose!';
        }
    })
})