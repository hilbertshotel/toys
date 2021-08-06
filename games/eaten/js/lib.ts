// GET ELEMENT BY ID
const get = (id: string):HTMLElement => {
    return document.getElementById(id)!
}

// CREATE ELEMENT
const make = (type: string): HTMLElement => {
    return document.createElement(type)
}

// SLEEP
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// RESTART
const restartIn = async (ms: number) => {
    await sleep(ms)
    location.reload()
}

// SHUFFLE
const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

// INTEFACES
interface Numbers {
    [key: string]: string
}

interface Tile {
    type: string,
    id: string,
}