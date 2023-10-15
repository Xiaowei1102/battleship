import './style.css';
import { Ship } from './ship';
import { Gameboard } from './gameboard';
import { Player } from './player';

const you = new Player(10, 10);
const computer = new Player(10, 10);

//paint gameboard for each player
function paintBoard(player, whoseBoard) {
    if (whoseBoard === 'you') {
        const board = document.querySelector(".you.board");
        for (let i = 0; i < player.board.row; i++) {
            const rowElements = document.createElement('div');
            rowElements.classList.add('row');
            for (let j = 0; j < player.board.col; j++) {
                const grid = document.createElement('div');
                grid.classList.add('col')
                //player has board(gameboard instance); and board inclue board(array)
                grid.innerHTML = player.board.board[i][j];
                rowElements.appendChild(grid);
            }
            board.appendChild(rowElements);
        }
    }
}

paintBoard(you, 'you');