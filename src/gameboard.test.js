import { Ship } from "./ship";
import { Gameboard } from "./gameboard";



test ('create a game board', () => {
    const board = new Gameboard(4, 4);
    expect(board.board).toEqual([
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ']
    ])
})


test ('place ship', () =>{
    const board = new Gameboard(4, 4);
    board.placeShip(1, [0,0]);
    board.placeShip(2, [0,1]);
    board.placeShip(2, [1,1]);
    expect(board.board).toEqual(
        [
            ['S', 'S', 'S', ' '],
            [' ', 'S', 'S', ' '],
            [' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ']
        ]
    )
})

test ('place ships with overlap', () =>{
    const board = new Gameboard(4, 4);
    board.placeShip(1, [0,0]);
    board.placeShip(2, [0,0]);
    board.placeShip(2, [1,1]);
    expect(board.board).toEqual(
        [
            ['S', ' ', ' ', ' '],
            [' ', 'S', 'S', ' '],
            [' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ']
        ]
    )
})