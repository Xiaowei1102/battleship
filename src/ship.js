class Ship {
    //use array to represent ship
    constructor (length, headCoord, shipOrientation) {
        this.length = length;
        //OMG, array.fill(), what a nasty method; If the first parameter is an object, each slot in the array will reference that object.
        //this.shipBody = Array(length).fill(headCoord);
        this.shipBody = [];
        for (let i = 0; i < length; i++) {
            //the reason we need a slice is that we need to use the copy of the array, not the pointer
            //similar to java: new ArrayList<>(path)
            this.shipBody.push(headCoord.slice());
        }
        //unless its labled as v, otherwise, by default it's h
        if (shipOrientation === 'v') {
            for (let i = 0; i < length; i++) {
                //UGH...vertical, meaning: [row++][col]; not the other way round
                this.shipBody[i][0] += i;
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.shipBody[i][1] += i;
            }
        }
        this.damage = 0;
    }
    hit(target) {
        for (let coordinate of this.shipBody) {
            if (coordinate[0] === target[0] && coordinate[1] === target[1]) {
                this.damage++;
                return true;
            }
        }
        return false;
    }
    isSunk() {
        return this.damage === this.length; 
    }
}

export {Ship};