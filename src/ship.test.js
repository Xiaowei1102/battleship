import { Ship } from "./ship";

const mediumShip = new Ship(3, [1,1])
test('make a ship object', () =>{
    expect(mediumShip).toEqual({
        length: 3,
        shipBody: [[1,1], [1,2], [1,3]],
        damage: 0,
    });
})

test('ship takes a hit', () => {
    expect(mediumShip.isSunk()).toBe(false);
})